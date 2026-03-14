// Grab DOM Elements
const envelopeWrapper = document.getElementById('envelope-wrapper');
const envelope = document.querySelector('.envelope');
const letterWrapper = document.getElementById('letter-wrapper');
const typingText = document.getElementById('typing-text');
const memoriesSection = document.getElementById('memories');
const proposalSection = document.getElementById('proposal');
const heartsBackground = document.getElementById('hearts-background');

// Config: Love Letter Content
//const letterContent = "I can't believe it has already been 8 beautiful months with you.\nEvery day with you has become one of my favorite memories.\nYou make ordinary moments feel magical.\nSo I made this little page to remind you how much you mean to me.";
const letterContent = "Oui ponna ik ki udk what date it is today ofc , but yeah ill tell you smtg  uk i was 8 months in my mom stomach ,we were 8 yrs old when we met and ofc you were born on 8.See idk  how lucky 8 is for you but yeah lil lucky for mee its veryy noicee. So yeah this is smtg for you from my side. ";


/* ---------------------------------
   SECTION 1: Envelope Logic 
--------------------------------- */
envelopeWrapper.addEventListener('click', () => {
    // Prevent double clicking
    if (envelope.classList.contains('open')) return;
    
    // Add open class to trigger CSS keyframes/transitions
    envelope.classList.add('open');
    
    // Wait for the flap folding animation (0.8s), then show letter
    setTimeout(() => {
        envelopeWrapper.classList.add('hidden');
        letterWrapper.classList.remove('hidden');
        
        // Start typing effect shortly after paper unfolds
        setTimeout(typeLetter, 1200);
    }, 1000);
});

/* ---------------------------------
   SECTION 2: Typing Effect
--------------------------------- */
let charIndex = 0;
function typeLetter() {
    if (charIndex < letterContent.length) {
        // Handle newline characters properly replacing with <br>
        const char = letterContent.charAt(charIndex);
        if (char === '\n') {
            typingText.innerHTML += '<br>';
        } else {
            typingText.innerHTML += char;
        }
        charIndex++;
        
        // Randomize typing speed slightly for a more organic feel (30ms - 70ms)
        const typingSpeed = Math.floor(Math.random() * 40) + 30;
        setTimeout(typeLetter, typingSpeed);
    } else {
        // Typing finished! Wait a moment, then reveal moments section
        setTimeout(() => {
            memoriesSection.classList.remove('hidden');
        }, 800);
    }
}

/* ---------------------------------
   SECTION 3: Polaroid Card Slider
--------------------------------- */
const cards = document.querySelectorAll('.polaroid');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const cardIndicator = document.getElementById('card-indicator');

let currentCardIndex = 0;
const totalCards = cards.length;

// Updates visibility and styles of cards
function updateCards() {
    cards.forEach((card, index) => {
        // Reset classes
        card.classList.remove('active', 'exit');
        
        if (index === currentCardIndex) {
            // Display active card
            card.classList.add('active');
            // Clear any inline styles so the CSS class rules apply
            card.style.opacity = '';
            card.style.transform = '';
        } else if (index < currentCardIndex) {
            // Already viewed cards stay hidden to the left
            card.style.opacity = '0';
            card.style.transform = 'translateX(-40px) rotate(-6deg)';
        } else {
            // Upcoming cards stay hidden to the right
            card.style.opacity = '0';
            card.style.transform = 'translateX(40px) rotate(2deg)';
        }
    });
    
    // Update the counter text
    cardIndicator.innerText = `Moment ${currentCardIndex + 1} of ${totalCards}`;
    
    // Manage Previous button visibility
    prevBtn.style.visibility = currentCardIndex === 0 ? 'hidden' : 'visible';
    
    // Manage Next button states
    if (currentCardIndex === totalCards - 1) {
        nextBtn.innerText = 'Finish';
    } else {
        nextBtn.innerText = 'Next';
        nextBtn.style.visibility = 'visible';
    }
}

// Next Button Handler
nextBtn.addEventListener('click', () => {
    if (currentCardIndex < totalCards - 1) {
        // Slide out current card
        cards[currentCardIndex].classList.add('exit');
        cards[currentCardIndex].classList.remove('active');
        
        setTimeout(() => {
            currentCardIndex++;
            updateCards();
        }, 300); // 300ms matches halfway through CSS transition
        
    } else if (currentCardIndex === totalCards - 1) {
        // We reached the final card, reveal final proposal section
        nextBtn.style.display = 'none'; // Hide next button entirely
        proposalSection.classList.remove('hidden');
        
        // Softly scroll down to it
        setTimeout(() => {
            proposalSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
    }
});

// Previous Button Handler
prevBtn.addEventListener('click', () => {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateCards();
    }
});

// Initialize first view
updateCards();

/* ---------------------------------
   SECTION 4: Final Romantic Question
--------------------------------- */
const yesBtns = document.querySelectorAll('.proposal-buttons .btn');
const proposalResponse = document.getElementById('proposal-response');

// When user clicks YES or OF COURSE
yesBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Show the loving response
        proposalResponse.classList.remove('hidden');
        // Trigger explosion of extra hearts
        createHeartExplosion();
    });
});

/* ---------------------------------
   EXTRA: Floating Background Hearts
--------------------------------- */
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    // Using a Unicode heart symbol
    heart.innerHTML = '❤';
    
    // Random geometric properties
    const leftPos = Math.random() * 100; // 0vw to 100vw
    const size = Math.random() * 1.5 + 0.5; // 0.5rem to 2rem
    const duration = Math.random() * 5 + 7; // 7s to 12s float animation
    
    heart.style.left = `${leftPos}vw`;
    heart.style.fontSize = `${size}rem`;
    heart.style.animationDuration = `${duration}s`;
    
    heartsBackground.appendChild(heart);
    
    // Clean up to prevent DOM bloat
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Generate an ambient heart periodically
setInterval(createHeart, 1000);

// Burst of hearts when Yes is clicked
function createHeartExplosion() {
    for(let i=0; i<40; i++) {
        setTimeout(createHeart, i * 80);
    }
}
