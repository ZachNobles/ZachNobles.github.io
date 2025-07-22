import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Tooltip, TextField, Button, Typography, Box, Chip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const Scrabble = () => {
    const [numPlayers, setNumPlayers] = useState(2);
    const [players, setPlayers] = useState([
        { name: 'Player 1', scores: [], editing: false },
        { name: 'Player 2', scores: [], editing: false }
    ]);
    const [newScores, setNewScores] = useState({});
    const [editingScore, setEditingScore] = useState({ playerIndex: -1, roundIndex: -1 });
    const [editScoreValue, setEditScoreValue] = useState('');
    const scoresContainerRefs = useRef([]);
    const headerScrollRef = useRef(null);

    // Scroll to the latest scores when new scores are added
    useEffect(() => {
        scoresContainerRefs.current.forEach(ref => {
            if (ref) {
                ref.scrollLeft = ref.scrollWidth;
            }
        });
        if (headerScrollRef.current) {
            headerScrollRef.current.scrollLeft = headerScrollRef.current.scrollWidth;
        }
    }, [players]);

    const updatePlayerCount = (increment) => {
        const newCount = Math.max(1, Math.min(4, numPlayers + increment));
        setNumPlayers(newCount);
        
        const newPlayers = [...players];
        
        if (newCount > players.length) {
            // Add new players
            for (let i = players.length; i < newCount; i++) {
                newPlayers.push({ 
                    name: `Player ${i + 1}`, 
                    scores: [], 
                    editing: false 
                });
            }
        } else if (newCount < players.length) {
            // Remove excess players
            newPlayers.splice(newCount);
        }
        
        setPlayers(newPlayers);
        // Update refs array
        scoresContainerRefs.current = scoresContainerRefs.current.slice(0, newCount);
    };

    const updatePlayerName = (playerIndex, newName) => {
        const newPlayers = [...players];
        newPlayers[playerIndex].name = newName.slice(0,30);
        setPlayers(newPlayers);
    };

    const toggleEditPlayerName = (playerIndex) => {
        const newPlayers = [...players];
        newPlayers[playerIndex].editing = !newPlayers[playerIndex].editing;
        setPlayers(newPlayers);
    };

    const addRoundScores = () => {
        const newPlayers = [...players];
        newPlayers.forEach((player, index) => {
            const score = parseInt(newScores[index] || '0');
            player.scores.push(isNaN(score) ? 0 : score);
        });
        setPlayers(newPlayers);
        setNewScores({});
    };

    const handleScoreChange = (playerIndex, value) => {
        setNewScores(prev => ({
            ...prev,
            [playerIndex]: value
        }));
    };

    const startEditingScore = (playerIndex, roundIndex) => {
        setEditingScore({ playerIndex, roundIndex });
        setEditScoreValue(players[playerIndex].scores[roundIndex].toString());
    };

    const saveEditedScore = () => {
        const { playerIndex, roundIndex } = editingScore;
        const newScore = parseInt(editScoreValue);
        
        if (!isNaN(newScore)) {
            const newPlayers = [...players];
            newPlayers[playerIndex].scores[roundIndex] = newScore;
            setPlayers(newPlayers);
        }
        
        setEditingScore({ playerIndex: -1, roundIndex: -1 });
        setEditScoreValue('');
    };

    const cancelEditingScore = () => {
        setEditingScore({ playerIndex: -1, roundIndex: -1 });
        setEditScoreValue('');
    };

    const getTotalScore = (scores) => {
        return scores.reduce((sum, score) => sum + score, 0);
    };

    const maxRounds = Math.max(...players.map(p => p.scores.length), 0);

    return (
        <div className="geometric page" id="scrabble-main">
            <Tooltip title="home" placement="right" style={{position: "absolute", left: "0", top: "0"}}>
                <IconButton href="/" aria-label="home" size="large" className="home-button">
                    <HomeIcon />
                </IconButton>
            </Tooltip>
            
            <Box sx={{ padding: 3, maxWidth: 1200, margin: '0 auto' }}>
                <div className="glyph secondary" style={{fontSize: "3rem", textAlign: "center"}}>
                    scrabble score keeper
                </div>

                {/* Player Count Control */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4, marginTop: 4 }}>
                    <IconButton 
                        onClick={() => updatePlayerCount(-1)} 
                        disabled={numPlayers <= 1}
                        sx={{ marginRight: 2 }}
                    >
                        <RemoveIcon className="generic-icon-button" />
                    </IconButton>
                    
                    <div className="geometric" style={{fontSize: "1.25rem"}}>
                        {numPlayers} Player{numPlayers > 1 ? 's' : ''}
                    </div>
                    
                    <IconButton 
                        onClick={() => updatePlayerCount(1)} 
                        disabled={numPlayers >= 4}
                        sx={{ marginLeft: 2 }}
                    >
                        <AddIcon className="generic-icon-button" />
                    </IconButton>
                </Box>

                {/* Score Table */}
                <Box elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
                    {/* Round Headers - Scrollable */}
                    {maxRounds > 0 && (
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            padding: 1.5,
                            borderBottom: '2px solid #888',
                            marginBottom: 1
                        }}>
                            <Box sx={{ minWidth: 120, marginRight: 2 }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Player</Typography>
                            </Box>
                            <Box 
                                ref={headerScrollRef}
                                sx={{ 
                                    display: 'flex', 
                                    flex: 1, 
                                    overflowX: 'auto',
                                    scrollbarWidth: 'none',
                                    '&::-webkit-scrollbar': {
                                        display: 'none',
                                    }
                                }}
                            >
                                {Array.from({ length: maxRounds }, (_, index) => (
                                    <Box key={index} sx={{ 
                                        minWidth: 50, 
                                        textAlign: 'center', 
                                        marginRight: 1,
                                        flexShrink: 0
                                    }}>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                            R{index + 1}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                            <Box sx={{ minWidth: 80, textAlign: 'center', marginLeft: 2 }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Total</Typography>
                            </Box>
                        </Box>
                    )}

                    {players.map((player, playerIndex) => {
                        return (
                            <Box key={playerIndex} sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                padding: 1.5,
                                borderBottom: playerIndex < players.length - 1 ? '1px solid #c0c0c0' : 'none',
                                minHeight: 60
                            }}>
                                {/* Player Name */}
                                <Box sx={{ minWidth: 120, marginRight: 2 }}>
                                    {player.editing ? (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <TextField
                                                value={player.name}
                                                onChange={(e) => updatePlayerName(playerIndex, e.target.value)}
                                                variant="outlined"
                                                size="small"
                                                sx={{ width: 100, input: {fontSize: "1.25rem"} }}
                                                className="textfield geometric"
                                            />
                                            <IconButton 
                                                onClick={() => toggleEditPlayerName(playerIndex)}
                                                size="small"
                                                sx={{ marginLeft: 1 }}
                                            >
                                                <CheckIcon className="generic-icon-button" />
                                            </IconButton>
                                        </Box>
                                    ) : (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <div className="geometric" style={{fontSize: "1.25rem", overflow: "hidden", maxWidth: "5rem"}}>
                                                {player.name}
                                            </div>
                                            <IconButton 
                                                onClick={() => toggleEditPlayerName(playerIndex)}
                                                size="small"
                                                sx={{ marginLeft: 1 }}
                                            >
                                                <EditIcon fontSize="small" className="generic-icon-button" />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>

                                {/* Round Scores - Horizontally Scrollable */}
                                <Box 
                                    ref={el => scoresContainerRefs.current[playerIndex] = el}
                                    sx={{ 
                                        display: 'flex', 
                                        flex: 1, 
                                        overflowX: 'auto',
                                        scrollbarWidth: 'none',
                                        paddingBottom: '2px',
                                        '&::-webkit-scrollbar': {
                                            display: 'none',
                                        }
                                    }}
                                >
                                    {player.scores.map((score, roundIndex) => {
                                        const isEditing = editingScore.playerIndex === playerIndex && editingScore.roundIndex === roundIndex;
                                        
                                        return (
                                            <Box key={roundIndex} sx={{ 
                                                minWidth: 50, 
                                                textAlign: 'center', 
                                                marginRight: 1,
                                                flexShrink: 0
                                            }}>
                                                {isEditing ? (
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <TextField
                                                            value={editScoreValue}
                                                            onChange={(e) => setEditScoreValue(e.target.value)}
                                                            variant="outlined"
                                                            size="small"
                                                            type="number"
                                                            sx={{ width: 60, marginBottom: 0.5 }}
                                                            autoFocus
                                                            onKeyPress={(e) => {
                                                                if (e.key === 'Enter') saveEditedScore();
                                                                if (e.key === 'Escape') cancelEditingScore();
                                                            }}
                                                            className="textfield"
                                                        />
                                                        <Box>
                                                            <IconButton 
                                                                onClick={saveEditedScore}
                                                                size="small"
                                                                sx={{ padding: 0.25 }}
                                                            >
                                                                <CheckIcon fontSize="small" className="generic-icon-button" />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                ) : (
                                                    <Chip
                                                        label={score}
                                                        onClick={() => startEditingScore(playerIndex, roundIndex)}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            cursor: 'pointer',
                                                            fontSize: '1rem',
                                                            borderRadius: '0.5rem'
                                                        }}
                                                        className="chip"
                                                    />
                                                )}
                                            </Box>
                                        );
                                    })}
                                </Box>

                                {/* Total Score */}
                                <Box sx={{ 
                                    minWidth: 50, 
                                    textAlign: 'center', 
                                    marginLeft: 2,
                                    padding: 1,
                                    bgcolor: '#e8f5e8',
                                    borderRadius: 1
                                }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c5530' }}>
                                        {getTotalScore(player.scores)}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>

                {/* Add New Round */}
                <div elevation={2} sx={{ padding: 3 }}>
                    <div style={{fontSize: "1.5rem", marginBottom: "1rem"}} className="geometric">
                        Add Round {maxRounds + 1} Scores
                    </div>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: 2 }}>
                        {players.map((player, playerIndex) => (
                            <Box key={playerIndex} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ marginRight: 1, minWidth: 80 }}>
                                    {player.name}:
                                </Typography>
                                <TextField
                                    type="number"
                                    value={newScores[playerIndex] || ''}
                                    onChange={(e) => handleScoreChange(playerIndex, e.target.value)}
                                    variant="outlined"
                                    size="small"
                                    sx={{ width: 80 }}
                                    inputProps={{ min: 0 }}
                                    className="textfield geometric"
                                />
                            </Box>
                        ))}
                    </Box>
                    
                    <Button 
                        variant="contained" 
                        onClick={addRoundScores}
                        sx={{ 
                            bgcolor: '#2c5530', 
                            '&:hover': { bgcolor: '#1e3a22' },
                            marginTop: 1 
                        }}
                    >
                        Add Round
                    </Button>
                </div>
            </Box>
        </div>
    );
};

export default Scrabble;