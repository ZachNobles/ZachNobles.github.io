import React, { useState, useRef, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import logo from "../../images/RPI_Logo_Binary_White.png";
import "./binary.css";
import { Download, Copy } from "lucide-react";
import CheckIcon from '@mui/icons-material/Check';


const Binary = () => {
    const [inputText, setInputText] = useState("");
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [invertWhite, setInvertWhite] = useState(false);

    // Create a copy of canvas with white pixels inverted to black
    const createInvertedCanvas = () => {
        const originalCanvas = canvasRef.current;
        if (!originalCanvas) return null;
        
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        
        tempCanvas.width = originalCanvas.width;
        tempCanvas.height = originalCanvas.height;
        
        // Copy original canvas to temp canvas
        tempCtx.drawImage(originalCanvas, 0, 0);
        
        // Get image data and invert white pixels
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            // Check if pixel is white (or very close to white) and not transparent
            if (r > 200 && g > 200 && b > 200 && a > 10) {
                data[i] = 0;     // R
                data[i + 1] = 0; // G
                data[i + 2] = 0; // B
                // Keep alpha as is
            }
        }
        
        tempCtx.putImageData(imageData, 0, 0);
        return tempCanvas;
    };

    // Simple CRC32 calculation for PNG chunks
    const calculateCRC32 = (data) => {
        const crcTable = [];
        for (let i = 0; i < 256; i++) {
            let crc = i;
            for (let j = 0; j < 8; j++) {
                crc = (crc & 1) ? (0xEDB88320 ^ (crc >>> 1)) : (crc >>> 1);
            }
            crcTable[i] = crc;
        }
        
        let crc = 0xFFFFFFFF;
        for (let i = 0; i < data.length; i++) {
            crc = crcTable[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
        }
        return (crc ^ 0xFFFFFFFF) >>> 0;
    };

    // Create PNG with XMP metadata that Windows is more likely to recognize
    const createPNGWithMetadata = (canvas, binaryValue) => {
        return new Promise((resolve) => {
            canvas.toBlob(async (blob) => {
                try {
                    const arrayBuffer = await blob.arrayBuffer();
                    const uint8Array = new Uint8Array(arrayBuffer);
                    
                    // Find insertion point
                    let insertIndex = 8; // After PNG signature
                    
                    while (insertIndex < uint8Array.length - 8) {
                        const chunkLength = (uint8Array[insertIndex] << 24) | 
                                        (uint8Array[insertIndex + 1] << 16) | 
                                        (uint8Array[insertIndex + 2] << 8) | 
                                        uint8Array[insertIndex + 3];
                        
                        const chunkType = String.fromCharCode(...uint8Array.slice(insertIndex + 4, insertIndex + 8));
                        
                        if (chunkType === 'IDAT' || chunkType === 'IEND') {
                            break;
                        }
                        
                        insertIndex += 12 + chunkLength;
                    }
                    
                    // Create XMP metadata as iTXt chunk (supports UTF-8 and compression)
                    const xmpData = `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
    <x:xmpmeta xmlns:x="adobe:ns:meta/">
        <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
            <rdf:Description rdf:about=""
                xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:xmp="http://ns.adobe.com/xap/1.0/">
                <dc:description>
                    <rdf:Alt>
                        <rdf:li xml:lang="x-default">Binary value: ${binaryValue}</rdf:li>
                    </rdf:Alt>
                </dc:description>
                <xmp:Label>Binary: ${binaryValue}</xmp:Label>
            </rdf:Description>
        </rdf:RDF>
    </x:xmpmeta>
    <?xpacket end="w"?>`;
                    
                    // Create iTXt chunk for XMP
                    const keyword = 'XML:com.adobe.xmp';
                    const keywordBytes = new TextEncoder().encode(keyword);
                    const xmpBytes = new TextEncoder().encode(xmpData);
                    
                    // iTXt chunk: keyword + null + compression flag + compression method + language + null + translated keyword + null + text
                    const chunkData = new Uint8Array(keywordBytes.length + 1 + 1 + 1 + 0 + 1 + 0 + 1 + xmpBytes.length);
                    let offset = 0;
                    
                    chunkData.set(keywordBytes, offset);
                    offset += keywordBytes.length;
                    chunkData[offset++] = 0; // null separator
                    chunkData[offset++] = 0; // compression flag (0 = uncompressed)
                    chunkData[offset++] = 0; // compression method
                    chunkData[offset++] = 0; // language tag null terminator (empty language)
                    chunkData[offset++] = 0; // translated keyword null terminator (empty)
                    chunkData.set(xmpBytes, offset);
                    
                    // Create the complete iTXt chunk
                    const chunkLength = chunkData.length;
                    const chunkType = new Uint8Array([105, 84, 88, 116]); // 'iTXt'
                    
                    // Calculate CRC32
                    const crcInput = new Uint8Array(4 + chunkData.length);
                    crcInput.set(chunkType, 0);
                    crcInput.set(chunkData, 4);
                    const crc = calculateCRC32(crcInput);
                    
                    // Assemble the complete iTXt chunk
                    const textChunk = new Uint8Array(12 + chunkLength);
                    
                    // Length (big-endian)
                    textChunk[0] = (chunkLength >>> 24) & 0xFF;
                    textChunk[1] = (chunkLength >>> 16) & 0xFF;
                    textChunk[2] = (chunkLength >>> 8) & 0xFF;
                    textChunk[3] = chunkLength & 0xFF;
                    
                    // Type
                    textChunk.set(chunkType, 4);
                    
                    // Data
                    textChunk.set(chunkData, 8);
                    
                    // CRC (big-endian)
                    textChunk[8 + chunkLength] = (crc >>> 24) & 0xFF;
                    textChunk[8 + chunkLength + 1] = (crc >>> 16) & 0xFF;
                    textChunk[8 + chunkLength + 2] = (crc >>> 8) & 0xFF;
                    textChunk[8 + chunkLength + 3] = crc & 0xFF;
                    
                    // Create new PNG with metadata
                    const newPNG = new Uint8Array(uint8Array.length + textChunk.length);
                    newPNG.set(uint8Array.slice(0, insertIndex), 0);
                    newPNG.set(textChunk, insertIndex);
                    newPNG.set(uint8Array.slice(insertIndex), insertIndex + textChunk.length);
                    
                    const newBlob = new Blob([newPNG], { type: 'image/png' });
                    resolve(newBlob);
                    
                } catch (error) {
                    console.error('Error adding XMP metadata:', error);
                    resolve(blob);
                }
            }, 'image/png');
        });
    };



    // Download canvas as image
    const downloadImage = async () => {
        const canvas = invertWhite ? createInvertedCanvas() : canvasRef.current;
        if (!canvas) return;
        
        try {
            // Create PNG with metadata containing the binary value
            const blob = await createPNGWithMetadata(canvas, inputText);
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement("a");
            link.download = "binary-encoded-logo.png";
            link.href = url;
            link.click();
            
            // Clean up the URL object
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error creating PNG:", error);
            // Fallback to regular download
            const link = document.createElement("a");
            link.download = "binary-encoded-logo.png";
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    // Copy canvas to clipboard
    const copyToClipboard = async () => {
        const canvas = invertWhite ? createInvertedCanvas() : canvasRef.current;
        if (!canvas) return;
        
        try {
            // For clipboard, we'll use the version with metadata too
            const blob = await createPNGWithMetadata(canvas, inputText);
            
            await navigator.clipboard.write([
                new ClipboardItem({ "image/png": blob })
            ]);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error("Failed to copy to clipboard:", err);
        }
    };

    // Load and draw the original image
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.log("Canvas ref is null, skipping image load");
            return;
        }
        
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.log("Could not get canvas context");
            return;
        }
        
        const img = new Image();
        
        img.crossOrigin = "anonymous"; // Handle CORS issues
        
        img.onload = () => {
            // Set canvas size to match image natural dimensions or desired size
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            canvas.width = 1000;
            canvas.height = Math.round(1000 / aspectRatio);
            
            // Clear canvas and draw image
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            setImageLoaded(true);
            imageRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
        };
        
        img.onerror = (error) => {
            console.error("Failed to load image:", error);
            // Fallback: create a colored rectangle if image fails to load
            canvas.width = 1000;
            canvas.height = 600;
            ctx.fillStyle = "#1e3a8b";
            ctx.fillRect(0, 0, 1000, 600);
            ctx.fillStyle = "white";
            ctx.font = "48px Arial";
            ctx.textAlign = "center";
            ctx.fillText("LOGO PLACEHOLDER", 500, 300);
            setImageLoaded(true);
            imageRef.current = ctx.getImageData(0, 0, 1000, 600);
        };
        
        // Set the image source last to trigger loading
        img.src = logo;
    }, []);

    // Process the input and update the canvas
    useEffect(() => {
        if (!imageLoaded || !canvasRef.current || !imageRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const canvasHeight = canvas.height;
        const canvasWidth = canvas.width;
        
        // Restore original image
        ctx.putImageData(imageRef.current, 0, 0);
        
        if (inputText.length === 0) return;

        // Make bottom 73 rows transparent
        const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        const data = imageData.data;
        
        const transparentStartY = canvasHeight - 73;
        for (let y = transparentStartY; y < canvasHeight; y++) {
            for (let x = 0; x < canvasWidth; x++) {
                const index = (y * canvasWidth + x) * 4;
                data[index + 3] = 0; // Set alpha to 0 (transparent)
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // Draw binary rectangles
        const rectWidth = canvasWidth / inputText.length;
        ctx.fillStyle = "white";
        
        for (let i = 0; i < inputText.length; i++) {
            const char = inputText[i];
            const x = i * rectWidth;
            
            if (char === "0") {
                // Single rectangle with height 25, gap of 24 from bottom
                ctx.fillRect(x, canvasHeight - 24 - 25, rectWidth, 25);
            } else if (char === "1") {
                // Two rectangles with height 24 each, 25 pixel gap between them
                ctx.fillRect(x, canvasHeight - 24, rectWidth, 24); // Bottom rectangle
                ctx.fillRect(x, canvasHeight - 24 - 25 - 24, rectWidth, 24); // Top rectangle
            }
        }
    }, [inputText, imageLoaded]);

    return (
        <div className="geometric" style={{ 
            minHeight: "100vh", 
            position: "relative",
        }}>
            <Tooltip title="home" placement="right" style={{position: "absolute", left: "0", top: "0", zIndex: 1000}}>
                <IconButton href="/" aria-label="home" size="large" className="home-button">
                    <HomeIcon />
                </IconButton>
            </Tooltip>

            <div className="glyph" style={{
                fontSize: "3rem", 
                textAlign: "center",
                paddingTop: "2rem",
            }}>
                rpi logo encoder
            </div>

            <div className="page" style={{
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center", 
                minHeight: "80vh",
                padding: "2rem"
            }}>
                <input
                    type="text"
                    placeholder="Enter binary code"
                    value={inputText}
                    onChange={(e) => {
                        // Filter to only allow 0s and 1s
                        const filtered = e.target.value.replace(/[^01]/g, "");
                        setInputText(filtered);
                    }}
                    maxLength={50}
                    style={{ 
                        marginBottom: "2rem", 
                        width: "400px",
                        padding: "12px 16px",
                        fontSize: "1.2rem",
                        fontFamily: "monospace",
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                        outline: "none",
                        transition: "border-color 0.2s ease"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#6a19d5"}
                    onBlur={(e) => e.target.style.borderColor = "#c0c0c0"}
                />

                <div style={{
                    // border: "2px solid #0081ce",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                }}>
                    <canvas
                        ref={canvasRef}
                        width={1000}
                        height={600}
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            borderRadius: "0.25rem",
                        }}
                    />
                </div>

                {inputText && (
                    <div style={{
                        marginTop: "1rem",
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center"
                    }}>
                        <button
                            onClick={downloadImage}
                            className="generic-button pointer geometric"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "12px 20px",
                                fontSize: "1rem",
                            }}
                        >
                            <Download size={20} />
                            Download
                        </button>

                        <button
                            onClick={copyToClipboard}
                            className="generic-button geometric pointer"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "12px 20px",
                                fontSize: "1rem",
                            }}
                        >
                            <Copy size={20} />
                            {copySuccess ? "Copied :)" : "Copy"}
                        </button>

                        <label
                        className="geometric pointer generic-radio-container"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "1rem",
                            userSelect: "none",
                        }}>
                            <input
                                className="generic-radio pointer"
                                type="checkbox"
                                checked={invertWhite}
                                onChange={(e) => setInvertWhite(e.target.checked)}
                                style={{
                                    width: "0",
                                    height: "2rem",
                                }}
                                />
                            <span className="generic-radio-overlay" style={{height: "2rem", width: "2rem"}}>
                                <CheckIcon className="generic-radio-check" />
                            </span>
                            <Tooltip title="applies on download or copy">
                                Invert white to black
                            </Tooltip>
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Binary;