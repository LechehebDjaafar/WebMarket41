        // FAQ Toggle Script
        document.addEventListener('DOMContentLoaded', function() {
            const faqQuestions = document.querySelectorAll('.faq-question');
            
            faqQuestions.forEach(question => {
                question.addEventListener('click', function() {
                    // Toggle active class on the question
                    this.classList.toggle('active');
                    
                    // Toggle show class on the answer
                    const answer = this.nextElementSibling;
                    if (answer.classList.contains('show')) {
                        answer.classList.remove('show');
                    } else {
                        answer.classList.add('show');
                    }
                });
            });
        });