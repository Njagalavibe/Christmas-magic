document.addEventListener('DOMContentLoaded', function() {
    // Mark as loaded
    document.body.classList.add('loaded');
    
    // Word list
    const words = [
        'joy', 'peace', 'love', 'cheer', 'light',
        'hope', 'warmth', 'giving', 'family', 'laughter',
        'memories', 'Beer', 'sparkle', 'magic', 'sente',
        'kindness', 'gratitude', 'family', 'wonder', 'celebration',
        'happiness', 'serenity', '4:20', 'bliss', 'cozy'
    ];
    
    // DOM elements
    const wordsContainer = document.getElementById('words-container');
    const hint = document.getElementById('hint');
    const finalMessage = document.getElementById('final-message');
    const shareHint = document.getElementById('share-hint');
    
    // Variables
    let isFastMode = false;
    let fastModeEndTime = 0;
    let wordCount = 0;
    let startTime = Date.now();
    let revealTimeout = null;
    let isRevealed = false;
    
    // Initial word drop
    function createWord() {
        const word = document.createElement('div');
        word.className = 'word';
        
        // Get random word
        const wordText = words[Math.floor(Math.random() * words.length)];
        word.textContent = wordText;
        
        // Random properties
        const fontSize = Math.random() * 10 + 20; // 20-30px
        const left = Math.random() * 90 + 5; // 5-95%
        const rotation = Math.random() * 30 - 15; // -15 to 15 degrees
        const duration = isFastMode ? 
            (Math.random() * 2 + 1) : // 1-3 seconds in fast mode
            (Math.random() * 6 + 4);  // 4-10 seconds in normal mode
        
        // Apply styles
        word.style.fontSize = `${fontSize}px`;
        word.style.left = `${left}%`;
        word.style.transform = `rotate(${rotation}deg)`;
        word.style.animationName = isFastMode ? 'fallFast' : 'fall';
        word.style.animationDuration = `${duration}s`;
        
        // Add to container
        wordsContainer.appendChild(word);
        wordCount++;
        
        // Remove word after animation completes
        setTimeout(() => {
            if (word.parentNode) {
                word.parentNode.removeChild(word);
            }
        }, duration * 1000);
        
        // Return the duration for scheduling next word
        return duration;
    }
    
    // Start word generation
    function startWordGeneration() {
        function generate() {
            if (!isRevealed) {
                const duration = createWord();
                
                // Schedule next word
                const delay = isFastMode ? 
                    Math.random() * 300 + 200 : // 200-500ms in fast mode
                    Math.random() * 800 + 400;  // 400-1200ms in normal mode
                
                setTimeout(generate, delay);
            }
        }
        
        // Start the chain
        generate();
    }
    
    // Toggle fast mode
    function activateFastMode() {
        isFastMode = true;
        fastModeEndTime = Date.now() + 3000; // 3 seconds
        
        // Visual feedback - subtle background change
        document.body.style.background = 'linear-gradient(to bottom, #0e3036, #184449)';
        
        // Reset after 3 seconds
        setTimeout(() => {
            isFastMode = false;
            document.body.style.background = 'linear-gradient(to bottom, #0c2930, #163a3f)';
        }, 3000);
    }
    
    // Reveal final message
    function revealMessage() {
        if (isRevealed) return;
        
        isRevealed = true;
        
        // Fade out hint
        hint.classList.add('hidden');
        
        // Clear all existing words
        wordsContainer.innerHTML = '';
        
        // Fade in final message
        setTimeout(() => {
            finalMessage.style.opacity = '1';
        }, 500);
        
        // Add share functionality
        shareHint.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: '🎄 Christmas Magic',
                    text: 'Check out this interactive Christmas card I received!',
                    url: window.location.href
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                        shareHint.textContent = 'Link copied! ✨';
                        setTimeout(() => {
                            shareHint.textContent = 'Share this warmth with someone special';
                        }, 2000);
                    });
            }
        });
    }
    
    // Set up reveal timer (30 seconds total)
    function setupRevealTimer() {
        revealTimeout = setTimeout(() => {
            revealMessage();
        }, 30000); // 30 seconds
    }
    
    // Handle taps/clicks
    function handleInteraction() {
        if (!isRevealed) {
            activateFastMode();
            
            // Reset the reveal timer on interaction (extends the experience)
            if (revealTimeout) {
                clearTimeout(revealTimeout);
            }
            // Set new timeout (30 seconds from now)
            revealTimeout = setTimeout(() => {
                revealMessage();
            }, 30000);
        }
    }
    
    // Add event listeners for both touch and click
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('click', handleInteraction);
    
    // Start everything
    startWordGeneration();
    setupRevealTimer();
    
    // Hide loading indicator after 1 second
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
    
    // Hide hint after 10 seconds
    setTimeout(() => {
        hint.classList.add('hidden');
    }, 10000);
});