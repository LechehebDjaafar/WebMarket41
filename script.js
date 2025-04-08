document.addEventListener('DOMContentLoaded', function() {
    // قائمة التنقل للهواتف المحمولة
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // إغلاق القائمة عند النقر على رابط
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // التمرير السلس عند النقر على الروابط الداخلية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // تصفية الألعاب حسب الفئة
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة الفئة النشطة إلى الزر المحدد
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // إظهار أو إخفاء البطاقات حسب الفلتر المحدد
            gameCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // التعامل مع نموذج الشحن
    const rechargeForm = document.querySelector('.recharge-form');
    const rechargeOptions = document.querySelectorAll('.recharge-option');
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    // اختيار خيار الشحن
    rechargeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // إزالة الفئة المحددة من جميع الخيارات
            rechargeOptions.forEach(opt => opt.classList.remove('selected'));
            // إضافة الفئة المحددة إلى الخيار المختار
            this.classList.add('selected');
            
            // تحديث ملخص الطلب
            updateOrderSummary();
        });
    });
    
    // اختيار طريقة الدفع
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // إزالة الفئة المحددة من جميع الخيارات
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            // إضافة الفئة المحددة إلى الخيار المختار
            this.classList.add('selected');
        });
    });
    
    // تحديث ملخص الطلب
    function updateOrderSummary() {
        const selectedOption = document.querySelector('.recharge-option.selected');
        if (selectedOption) {
            const amount = selectedOption.querySelector('h4').textContent;
            const price = selectedOption.querySelector('p').textContent;
            
            // تحديث بيانات الملخص
            const summaryRows = document.querySelectorAll('.summary-row');
            if (summaryRows.length >= 2) {
                summaryRows[0].querySelector('span:last-child').textContent = amount + ' (PUBG Mobile)';
                summaryRows[1].querySelector('span:last-child').textContent = price;
                summaryRows[2].querySelector('span:last-child').textContent = price;
            }
        }
    }
    
    // إرسال نموذج الشحن
    if (rechargeForm) {
        rechargeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // التحقق من صحة البيانات
            const playerId = document.getElementById('player-id').value;
            const phone = document.getElementById('phone').value;
            
            if (!playerId) {
                alert('يرجى إدخال معرف اللاعب');
                return;
            }
            
            if (!phone) {
                alert('يرجى إدخال رقم الهاتف');
                return;
            }
            
            // إظهار رسالة نجاح (يمكن استبدالها بإرسال البيانات إلى الخادم)
            alert('تم استلام طلبك بنجاح! سيتم شحن رصيدك خلال دقائق');
            
            // إعادة تعيين النموذج
            this.reset();
        });
    }

    // تفعيل قسم الأسئلة الشائعة
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // إغلاق جميع الإجابات الأخرى
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // تبديل حالة العنصر المحدد
            item.classList.toggle('active');
        });
    });

    // شريط التمرير للشهادات
    const testimonialSlider = document.querySelector('.testimonials-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (testimonialSlider) {
        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });

        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });

        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
        });

        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2; // سرعة التمرير
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // إرسال نموذج النشرة البريدية
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value) {
                alert('تم الاشتراك في النشرة البريدية بنجاح!');
                emailInput.value = '';
            }
        });
    }

    // تأثير التمرير للرأس الثابت
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // تحريك العناصر عند التمرير (تأثير الظهور)
    function revealOnScroll() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 150) {
                section.classList.add('revealed');
            }
        });
    }
    
    // تنفيذ تأثير الظهور عند التحميل والتمرير
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // تأثير العد التصاعدي للأرقام (يمكن استخدامه لإحصائيات الموقع)
    function startCounter() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = 0;
            const increment = target / 100;
            
            function updateCount() {
                const currentCount = parseInt(counter.innerText);
                
                if (currentCount < target) {
                    counter.innerText = Math.ceil(currentCount + increment);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            }
            
            updateCount();
        });
    }
    
    // بدء العد التصاعدي للأرقام عند وصول العنصر إلى منطقة الرؤية
    const statsSection = document.querySelector('.features-section');
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startCounter();
                observer.unobserve(statsSection);
            }
        });
        
        observer.observe(statsSection);
    }
});