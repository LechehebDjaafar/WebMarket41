document.addEventListener('DOMContentLoaded', function() {
    // تنقل بين الخطوات في صفحة الشحن
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    if (nextButtons.length > 0) {
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentStep = this.closest('.step-content');
                const nextStepId = this.dataset.next;
                
                currentStep.classList.add('hidden');
                document.getElementById(`step-${nextStepId}`).classList.remove('hidden');
                
                // تحديث مؤشر الخطوات
                document.querySelector(`.step[data-step="${nextStepId}"]`).classList.add('active');
            });
        });
    }
    
    if (prevButtons.length > 0) {
        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentStep = this.closest('.step-content');
                const prevStepId = this.dataset.prev;
                
                currentStep.classList.add('hidden');
                document.getElementById(`step-${prevStepId}`).classList.remove('hidden');
                
                // تحديث مؤشر الخطوات
                document.querySelector(`.step[data-step="${currentStep.id.split('-')[1]}"]`).classList.remove('active');
            });
        });
    }
    
    // تبديل طرق الدفع
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    if (paymentOptions.length > 0) {
        paymentOptions.forEach(option => {
            option.addEventListener('change', function() {
                document.querySelectorAll('.payment-details').forEach(detail => {
                    detail.classList.add('hidden');
                });
                
                document.getElementById(`${this.id}-details`).classList.remove('hidden');
                
                // تحديث ملخص الطلب
                if (document.getElementById('summary-payment')) {
                    document.getElementById('summary-payment').textContent = 
                        document.querySelector(`label[for="${this.id}"] span`).textContent;
                }
            });
        });
    }
    
    // تحديث ملخص الطلب
    if (document.getElementById('confirm-recharge')) {
        document.getElementById('confirm-recharge').addEventListener('click', function() {
            // هنا يمكنك إضافة كود لإرسال البيانات إلى الخادم
            document.getElementById('success-modal').classList.remove('hidden');
        });
    }
    
    // إغلاق المودال
    const closeModalButtons = document.querySelectorAll('.close-modal, #modal-close-btn, #message-modal-close');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.add('hidden');
            });
        });
    });
    
    // تصفية الألعاب حسب الفئة
    const categoryButtons = document.querySelectorAll('.category-btn');
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.dataset.category;
                
                // تحديث الزر النشط
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // تصفية الألعاب
                const gameCards = document.querySelectorAll('.game-card');
                gameCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // إرسال نموذج التواصل
    const contactForm = document.getElementById('message-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // هنا يمكنك إضافة كود لإرسال البيانات إلى الخادم
            document.getElementById('message-modal').classList.remove('hidden');
            this.reset();
        });
    }
    
    // معالجة معلمة اللعبة في URL
    const urlParams = new URLSearchParams(window.location.search);
    const gameParam = urlParams.get('game');
    
    if (gameParam && document.getElementById('selected-game')) {
        const gameTitles = {
            'pes': 'PES',
            'fifa': 'FIFA',
            'roblox': 'Roblox',
            'ludo': 'يلالودو',
            'ml': 'لورد موبيل',
            'yoyo': 'يويو شات',
            'toptop': 'توب توب',
            'bigo': 'Bigo live',
            'netflix': 'نتفليكس',
            'shahid': 'شاهد',
            'disney': 'ديزني بلس',
            'iptv': 'IPTV'
        };
        
        if (gameTitles[gameParam]) {
            document.getElementById('selected-game').textContent = gameTitles[gameParam];
            
            // تحديث ملخص الطلب
            if (document.getElementById('summary-game')) {
                document.getElementById('summary-game').textContent = gameTitles[gameParam];
            }
        }
    }
    
    // تحديث ملخص العرض المختار
    const offerRadios = document.querySelectorAll('input[name="offer"]');
    if (offerRadios.length > 0) {
        offerRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.checked && document.getElementById('summary-offer')) {
                    const label = document.querySelector(`label[for="${this.id}"]`);
                    const amount = label.querySelector('.amount').textContent;
                    const price = label.querySelector('.price').textContent;
                    
                    document.getElementById('summary-offer').textContent = `${amount} - ${price}`;
                }
            });
        });
    }
    
    // تحديث ملخص المعرف
    const gameIdInput = document.getElementById('game-id');
    if (gameIdInput && document.getElementById('summary-id')) {
        gameIdInput.addEventListener('input', function() {
            document.getElementById('summary-id').textContent = this.value;
        });
    }
});