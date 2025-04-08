
document.addEventListener('DOMContentLoaded', function() {
    // تعريف متغير عالمي لقيمة TOKEN الخاص ببوت التلغرام
    const TELEGRAM_BOT_TOKEN = '7851317086:AAHpPMXMFVg8aPv4C65fruS8aYqQrEAthE0';
    // تعيين معرف الدردشة الخاص بك (سنستخدم قيمة افتراضية هنا، يمكنك تعديلها)
    const TELEGRAM_CHAT_ID = '-1002466368946'; // قم بتغيير هذا إلى معرف الدردشة الخاص بك
    
    // Step Navigation
    const steps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.step-content');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const urlParams = new URLSearchParams(window.location.search);
    const selectedGame = urlParams.get('game');
    
    // إذا كان هناك لعبة محددة في الرابط، قم بتحديث العناوين
    if (selectedGame) {
        // تحديث جميع العناصر التي تعرض اسم اللعبة
        const gameTitle = document.getElementById('selected-game');
        if (gameTitle) {
            gameTitle.textContent = selectedGame;
        }
        
        // تحديث عنوان الصفحة أيضًا إذا كان يحتوي على اسم اللعبة
        const pageTitle = document.querySelector('h1.game-title');
        if (pageTitle) {
            pageTitle.textContent = `شحن رصيد ${selectedGame}`;
        }
        
        // تحديث أي عناصر أخرى قد تحتوي على اسم اللعبة
        const allGameTitleElements = document.querySelectorAll('.game-name');
        allGameTitleElements.forEach(element => {
            element.textContent = selectedGame;
        });
    }
    
    // تأكد من إخفاء النافذة المنبثقة عند بدء التحميل
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
    
    // Next Step Navigation
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = this.getAttribute('data-next');
            
            // Hide all step contents
            stepContents.forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('animated');
            });
            
            // Show the next step content
            const nextStepContent = document.getElementById(`step-${nextStep}`);
            nextStepContent.classList.remove('hidden');
            nextStepContent.classList.add('animated');
            
            // Update steps indicator
            steps.forEach(step => {
                const stepNumber = step.getAttribute('data-step');
                if (stepNumber < nextStep) {
                    step.classList.remove('active');
                    step.classList.add('completed');
                } else if (stepNumber == nextStep) {
                    step.classList.add('active');
                    step.classList.remove('completed');
                } else {
                    step.classList.remove('active');
                    step.classList.remove('completed');
                }
            });
            
            // Update summary for final step
            if (nextStep === '4') {
                updateSummary();
            }
        });
    });
    
    // Previous Step Navigation
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = this.getAttribute('data-prev');
            
            // Hide all step contents
            stepContents.forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('animated');
            });
            
            // Show the previous step content
            const prevStepContent = document.getElementById(`step-${prevStep}`);
            prevStepContent.classList.remove('hidden');
            prevStepContent.classList.add('animated');
            
            // Update steps indicator
            steps.forEach(step => {
                const stepNumber = step.getAttribute('data-step');
                if (stepNumber < prevStep) {
                    step.classList.remove('active');
                    step.classList.add('completed');
                } else if (stepNumber == prevStep) {
                    step.classList.add('active');
                    step.classList.remove('completed');
                } else {
                    step.classList.remove('active');
                    step.classList.remove('completed');
                }
            });
        });
    });
    
    // Payment Method Selection
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const paymentDetails = document.querySelectorAll('.payment-details');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            const paymentId = this.id;
            
            // Hide all payment details
            paymentDetails.forEach(detail => {
                detail.classList.add('hidden');
            });
            
            // Show the selected payment details
            document.getElementById(`${paymentId}-details`).classList.remove('hidden');
        });
    });
    
    // Update Summary
    function updateSummary() {
        // Game Title
        const gameTitle = document.getElementById('selected-game') ? 
            document.getElementById('selected-game').textContent : (selectedGame || 'PES');
        document.getElementById('summary-game').textContent = gameTitle;
        
        // Selected Offer
        const selectedOffer = document.querySelector('input[name="offer"]:checked');
        const offerAmount = selectedOffer.parentNode.querySelector('.amount').textContent;
        const offerPrice = selectedOffer.parentNode.querySelector('.price').textContent;
        document.getElementById('summary-offer').textContent = `${offerAmount} - ${offerPrice}`;
        
        // Game ID
        const gameId = document.getElementById('game-id').value || 'غير محدد';
        document.getElementById('summary-id').textContent = gameId;
        
        // Payment Method
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        const paymentMethod = selectedPayment.parentNode.querySelector('span').textContent;
        document.getElementById('summary-payment').textContent = paymentMethod;
    }
    
    // دالة لإرسال البيانات إلى بوت التلغرام
    function sendToTelegram(data) {
        // تنسيق الرسالة
        const message = `
🎮 *طلب شحن جديد*
------------------
🎯 *اللعبة*: ${data.game}
💰 *العرض*: ${data.offer}
🆔 *معرف اللاعب*: ${data.gameId}
👤 *اسم اللاعب*: ${data.playerName}
💳 *طريقة الدفع*: ${data.paymentMethod}
⏱ *التاريخ*: ${data.dateTime}
------------------
        `;
        
        // إرسال الرسالة إلى التلغرام
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const params = {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        };
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(data => {
            console.log('تم إرسال البيانات إلى التلغرام بنجاح:', data);
        })
        .catch(error => {
            console.error('خطأ في إرسال البيانات إلى التلغرام:', error);
        });
    }
    
    // إرسال البيانات مع الصورة إلى التلغرام
    function sendReceiptToTelegram(data, receiptFile) {
        // أولاً نرسل الصورة
        const reader = new FileReader();
        reader.onload = function() {
            // إرسال الصورة كـ FormData
            const formData = new FormData();
            formData.append('chat_id', TELEGRAM_CHAT_ID);
            formData.append('photo', receiptFile);
            formData.append('caption', `صورة إيصال الدفع للطلب: ${data.gameId}`);
            
            fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                console.log('تم إرسال صورة الإيصال بنجاح:', result);
                // ثم نرسل بيانات الطلب
                sendToTelegram(data);
            })
            .catch(error => {
                console.error('خطأ في إرسال صورة الإيصال:', error);
                // نرسل البيانات على أي حال
                sendToTelegram(data);
            });
        };
        reader.readAsDataURL(receiptFile);
    }
    
    // Confirm Recharge Button
    const confirmButton = document.getElementById('confirm-recharge');
    
    // تعريف المتغيرات فقط إذا كانت العناصر موجودة
    const closeModalBtn = document.getElementById('modal-close-btn');
    const closeModalX = document.querySelector('.close-modal');
    
    if (confirmButton) {
        confirmButton.addEventListener('click', function() {
            const confirmCheckbox = document.getElementById('confirm');
            
            if (!confirmCheckbox.checked) {
                alert('يرجى الموافقة على الشروط والأحكام للمتابعة');
                return;
            }
            
            // Check if ID is entered
            const gameId = document.getElementById('game-id').value;
            if (!gameId) {
                alert('يرجى إدخال معرف الحساب');
                return;
            }
            
            // جمع البيانات اللازمة للإرسال
            const gameTitle = document.getElementById('summary-game').textContent;
            const offerDetails = document.getElementById('summary-offer').textContent;
            const paymentMethod = document.getElementById('summary-payment').textContent;
            const playerName = document.getElementById('player-name') ? document.getElementById('player-name').value : 'غير متوفر';
            
            // الحصول على التاريخ والوقت الحاليين
            const now = new Date();
            const dateTime = now.toLocaleString('ar-SA');
            
            // إنشاء كائن البيانات
            const orderData = {
                game: gameTitle,
                offer: offerDetails,
                gameId: gameId,
                playerName: playerName,
                paymentMethod: paymentMethod,
                dateTime: dateTime
            };
            
            // Check if receipt is uploaded
            const selectedPayment = document.querySelector('input[name="payment"]:checked').id;
            const receiptInput = document.getElementById(`${selectedPayment}-receipt`);
            
            if (!receiptInput.files.length) {
                alert('يرجى رفع صورة وصل الدفع');
                return;
            }
            
            // إرسال البيانات مع صورة الإيصال إلى التلغرام
            sendReceiptToTelegram(orderData, receiptInput.files[0]);
            
            // Show success modal
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('show-modal');
                modal.style.display = 'block';
            }
        });
    }
    
    // Close Modal Buttons
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.classList.add('hidden');
            modal.classList.remove('show-modal');
            modal.style.display = 'none';
            
            // Reset form and go back to step 1
            resetForm();
        });
    }
    
    if (closeModalX) {
        closeModalX.addEventListener('click', function() {
            modal.classList.add('hidden');
            modal.classList.remove('show-modal');
            modal.style.display = 'none';
        });
    }
    
    // Reset Form
    function resetForm() {
        // Reset to step 1
        stepContents.forEach(content => {
            content.classList.add('hidden');
            content.classList.remove('animated');
        });
        
        document.getElementById('step-1').classList.remove('hidden');
        document.getElementById('step-1').classList.add('animated');
        
        // Reset steps indicator
        steps.forEach(step => {
            const stepNumber = step.getAttribute('data-step');
            if (stepNumber == 1) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active');
                step.classList.remove('completed');
            }
        });
        
        // Reset form inputs
        document.getElementById('game-id').value = '';
        document.getElementById('player-name').value = '';
        
        const postmobReceipt = document.getElementById('postmob-receipt');
        if (postmobReceipt) postmobReceipt.value = '';
        
        const flexyReceipt = document.getElementById('flexy-receipt');
        if (flexyReceipt) flexyReceipt.value = '';
        
        const confirmCheckbox = document.getElementById('confirm');
        if (confirmCheckbox) confirmCheckbox.checked = false;
        
        // Reset to first offer
        const firstOffer = document.getElementById('offer1');
        if (firstOffer) firstOffer.checked = true;
        
        // Reset to first payment method
        const firstPayment = document.getElementById('postmob');
        if (firstPayment) firstPayment.checked = true;
        
        paymentDetails.forEach(detail => {
            detail.classList.add('hidden');
        });
        
        const postmobDetails = document.getElementById('postmob-details');
        if (postmobDetails) postmobDetails.classList.remove('hidden');
    }
    
    // Copy account number functionality
    const accountNumbers = document.querySelectorAll('.account-number');
    
    accountNumbers.forEach(number => {
        number.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text)
                .then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'تم النسخ!';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 1500);
                })
                .catch(err => {
                    console.error('فشل في نسخ النص: ', err);
                });
        });
    });
});
