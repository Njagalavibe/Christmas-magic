// Christmas Typing Effect - Debug Version
console.log("🎄 Script loaded, waiting for DOM...");

// Wait for DOM to be fully ready
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM fully loaded");
    startTypingEffect();
});

function startTypingEffect() {
    console.log("🕵️ Looking for lines...");
    
    // Try multiple selectors to find the lines
    const selectors = [
        '[id^="line"]',           // IDs starting with "line"
        '#line1, #line2, #line3, #line4',  // Specific IDs
        '.typewriter-text span',  // Any span in typewriter
        'span'                    // Any span at all
    ];
    
    let lines = null;
    for (let selector of selectors) {
        lines = document.querySelectorAll(selector);
        console.log(`  Selector "${selector}": Found ${lines.length} elements`);
        if (lines.length >= 4) break;
    }
    
    if (!lines || lines.length === 0) {
        console.error("❌ CRITICAL: No text lines found!");
        console.log("📋 Current HTML structure around .typewriter-text:");
        const typewriterText = document.querySelector('.typewriter-text');
        if (typewriterText) {
            console.log(typewriterText.innerHTML);
        } else {
            console.log("⚠️ .typewriter-text element not found!");
        }
        return;
    }
    
    console.log(`✅ Found ${lines.length} lines to type`);
    
    // Store original text and clear for typing
    lines.forEach((line, index) => {
        const text = line.textContent;
        line.setAttribute('data-original', text);
        line.textContent = '';
        console.log(`  Line ${index + 1}: "${text}"`);
    });
    
    // Start typing after 1 second
    setTimeout(() => {
        console.log("⌨️ Starting typing effect...");
        typeLineByLine(lines);
    }, 1000);
}

function typeLineByLine(lines) {
    let lineIndex = 0;
    let charIndex = 0;
    
    function typeNextCharacter() {
        if (lineIndex >= lines.length) {
            console.log("✅ All typing complete!");
            
            // Trigger slide to 3D text after 1 second
            setTimeout(() => {
                const introScreen = document.querySelector('.intro-screen');
                if (introScreen) {
                    introScreen.classList.add('slide-out');
                    console.log("🎬 Screen sliding to 3D text...");
                }
            }, 1000);
            return;
        }
        
        const currentLine = lines[lineIndex];
        const originalText = currentLine.getAttribute('data-original');
        
        if (charIndex < originalText.length) {
            currentLine.textContent = originalText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeNextCharacter, 80);
        } else {
            lineIndex++;
            charIndex = 0;
            setTimeout(typeNextCharacter, 400);
        }
    }
    
    typeNextCharacter();
}