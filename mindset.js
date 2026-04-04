(function() {
    const style = document.createElement('style');
    style.textContent = `
        .philosophy .bio {
            transition: opacity 0.5s ease, transform 0.5s ease;
            opacity: 1;
            transform: translateY(0);
        }
        .quote-hidden {
            opacity: 0 !important;
            transform: translateY(15px);
        }
    `;
    document.head.appendChild(style);

    const quotes = [
        "Design is how it looks. Code is how it works. The real magic is knowing both.",
        "Design whispers in color, code shouts in logic. True art speaks both tongues.",
        "Make it look good. Make it work. The pros know how to do both.",
        "Catch eyes with design, lock in with code. Real flex? Doing both.",
        "Design is the cover. Code is the story inside. Legends read both.",
        "See the design, feel the code, crush it by owning both.",
        "Beauty draws you in. Code holds you there. Magic lives in both.",
        "Art is the shell, code is the engine. Master both.",
        "What you see is design. What you touch is code. The real cheat code? Both.",
        "Design sets the scene. Code runs the plan. Victory comes from knowing both.",
        "Design is not just what you see. Code is not just what you touch. Genius lives where they meet."
    ];

    let currentIndex = 0;

    function rotateQuote() {
        const quoteElement = document.querySelector('.philosophy .bio');
        if (!quoteElement) return;

        quoteElement.classList.add('quote-hidden');

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % quotes.length;
            quoteElement.textContent = `"${quotes[currentIndex]}"`;
            
            quoteElement.classList.remove('quote-hidden');
        }, 500); 
    }

    window.addEventListener('DOMContentLoaded', () => {
        setInterval(rotateQuote, 3000);
    });
})();
