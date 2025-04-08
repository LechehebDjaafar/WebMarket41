        // Toggle mobile menu
        document.querySelector('.menu-toggle').addEventListener('click', function() {
            document.querySelector('nav').classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = document.querySelector('nav').contains(event.target);
            const isClickOnToggle = document.querySelector('.menu-toggle').contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && document.querySelector('nav').classList.contains('active')) {
                document.querySelector('nav').classList.remove('active');
            }
        });