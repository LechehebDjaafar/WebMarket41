        // Toggle mobile menu
        document.querySelector('.menu-toggle').addEventListener('click', function() {
            document.querySelector('nav').classList.toggle('active');
        });
        
        // Category filtering
        const categoryButtons = document.querySelectorAll('.category-btn');
        const gameCards = document.querySelectorAll('.game-card');
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const selectedCategory = button.getAttribute('data-category');
                
                // Show all cards if 'all' category is selected, otherwise filter
                gameCards.forEach(card => {
                    if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();
            
            gameCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // If search is empty, respect category filter
            if (searchTerm === '') {
                const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
                
                if (activeCategory !== 'all') {
                    gameCards.forEach(card => {
                        if (card.getAttribute('data-category') !== activeCategory) {
                            card.style.display = 'none';
                        }
                    });
                }
            }
        });