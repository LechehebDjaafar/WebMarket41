        // Form submission handler
        const messageForm = document.getElementById('message-form');
        const messageModal = document.getElementById('message-modal');
        const closeModal = document.querySelector('.close-modal');
        const modalCloseBtn = document.getElementById('message-modal-close');

        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would send the form data to the server here
            
            // Show success modal
            messageModal.classList.remove('hidden');
            
            // Reset form
            messageForm.reset();
        });

        // Close modal when clicking the X button
        closeModal.addEventListener('click', function() {
            messageModal.classList.add('hidden');
        });

        // Close modal when clicking the OK button
        modalCloseBtn.addEventListener('click', function() {
            messageModal.classList.add('hidden');
        });

        // Close modal when clicking outside the modal content
        messageModal.addEventListener('click', function(e) {
            if (e.target === messageModal) {
                messageModal.classList.add('hidden');
            }
        });