const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789@#$%&";
export function scroll(event) {
    let iterations = 0;
    var text = event.target.dataset.text;
    if (!text) return;
    const interval = setInterval(() => {
        event.target.innerText = text.split("")
        .map((letter, index) => {
            if (index < iterations * 0.6) {
                return event.target.dataset.text[index];
            } else if (letter === " ") {
                return " "
            }
            return alphabet[Math.floor(Math.random() * 41)];
        }).join("")

        if (iterations >= 100) {
            clearInterval(interval);
            event.target.innerText = text
        }
        iterations++;
    }, 60)
}

const binary_alphabet = "01"
export function scroll_binary(event) {
    let iterations = 0;
    var text = event.target.dataset.text;
    if (!text) return;
    const interval = setInterval(() => {
        event.target.innerText = text.split("")
        .map((letter, index) => {
            if (index < iterations * 0.6) {
                return event.target.dataset.text[index];
            } else if (letter === " ") {
                return " "
            }
            return binary_alphabet[Math.floor(Math.random() * 2)];
        }).join("")

        if (iterations >= 100) {
            clearInterval(interval);
            event.target.innerText = text
        }
        iterations++;
    }, 60)
}