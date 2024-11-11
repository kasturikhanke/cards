document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardStack');
    const numCards = 5;
    const dealingDuration = 170; // Duration of the dealing animation in milliseconds
    const overlapFactor = 0.7; // How much each card overlaps the previous one (0 to 1)

    let isDragging = false;
    let currentCard = null;
    let dragStartX, dragStartY, startLeft, startTop;

    function calculateCardDimensions() {
        const maxCardWidth = 140;
        const minCardWidth = 80;
        const aspectRatio = 1.4;

        let cardWidth = Math.max(minCardWidth, Math.min(maxCardWidth, window.innerWidth * 0.15));
        let cardHeight = cardWidth * aspectRatio;

        return { cardWidth, cardHeight };
    }

    function createAndPositionCards() {
        cardContainer.innerHTML = '';
        const { cardWidth, cardHeight } = calculateCardDimensions();

        const totalStackWidth = cardWidth + (cardWidth * overlapFactor * (numCards - 1));

        cardContainer.style.width = `${totalStackWidth}px`;
        cardContainer.style.height = `${cardHeight}px`;
        cardContainer.style.position = 'relative';
        cardContainer.style.margin = 'auto';

        console.log(`Window dimensions: ${window.innerWidth}x${window.innerHeight}`);
        console.log(`Card dimensions: ${cardWidth.toFixed(2)}x${cardHeight.toFixed(2)}`);
        console.log(`Total stack width: ${totalStackWidth.toFixed(2)}`);

        // Calculate the starting point for all cards
        const startX = totalStackWidth / 2 - cardWidth / 2;
        const startY = cardHeight + 20; // 20px below the container

        for (let i = 0; i < numCards; i++) {
            const card = document.createElement('div');

            card.className = `absolute bg-white rounded-lg shadow-md cursor-pointer transition-all duration-${dealingDuration} ease-out opacity-0`;
            card.style.width = `${cardWidth}px`;
            card.style.height = `${cardHeight}px`;
            card.style.zIndex = i;
            
            // Set initial position at the bottom center of the container
            card.style.left = `${startX}px`;
            card.style.top = `${startY}px`;

            const suitSymbols = ['♠', '♥', '♦', '♣'];
            const randomSuit = suitSymbols[Math.floor(Math.random() * suitSymbols.length)];
            card.innerHTML = `
                <div class="absolute top-2 left-2 text-xl">${randomSuit}</div>
                <div class="absolute bottom-2 right-2 text-xl transform rotate-180">${randomSuit}</div>
            `;

            cardContainer.appendChild(card);

            // Delay dealing each card
            setTimeout(() => {
                const finalLeft = i * (cardWidth * overlapFactor);
                card.style.left = `${finalLeft}px`;
                card.style.top = '0px';
                card.classList.remove('opacity-0');

                console.log(`Card ${i + 1} final position: (${finalLeft}, 0)`);
            }, i * dealingDuration);
        }
    }

    // Initial card creation and positioning
    createAndPositionCards();

    // Reposition cards on window resize
    window.addEventListener('resize', createAndPositionCards);

    function onMouseDown(e) {
        if (e.target.closest('.absolute')) {
            isDragging = true;
            currentCard = e.target.closest('.absolute');
            currentCard.style.transition = 'none';
            currentCard.classList.add('cursor-grabbing');
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            startLeft = currentCard.offsetLeft;
            startTop = currentCard.offsetTop;
            currentCard.style.zIndex = 1000;
        }
    }

    function onMouseMove(e) {
        if (!isDragging) return;
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        currentCard.style.left = `${startLeft + dx}px`;
        currentCard.style.top = `${startTop + dy}px`;
    }

    function onMouseUp() {
        if (!isDragging) return;
        isDragging = false;
        currentCard.classList.remove('cursor-grabbing');
        currentCard.style.zIndex = '';
        currentCard.style.transition = '';
    }

    cardContainer.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});