const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789@#$%&";
export default function scroll(event) {
    let iterations = 0;
    var text = event.target.dataset.text;
    if (!text) return;
    const interval = setInterval(() => {
        event.target.innerText = text.split("")
        .map((letter, index) => {
            if (index < iterations) {
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
    }, 80)
}