/**
 * صيدلية الندى البيطرية - Al-Nada Veterinary Pharmacy
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Drawer Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const mobileDrawerClose = document.querySelector('.mobile-drawer-close');
    const mobileOverlay = document.querySelector('.mobile-overlay');

    function openDrawer() {
        if (mobileDrawer && mobileOverlay) {
            mobileDrawer.classList.add('open');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeDrawer() {
        if (mobileDrawer && mobileOverlay) {
            mobileDrawer.classList.remove('open');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', openDrawer);
    }

    if (mobileDrawerClose) {
        mobileDrawerClose.addEventListener('click', closeDrawer);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeDrawer);
    }

    // 2. Sticky Header on Scroll
    const header = document.querySelector('header');
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        if (window.scrollY > 350) {
            scrollTopBtn?.classList.add('visible');
        } else {
            scrollTopBtn?.classList.remove('visible');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. Highlight Current Active Nav Link based on URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-list a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 4. Products Category Filter & Live Search
    const productFilterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const productSearchInput = document.querySelector('#productSearch');

    if (productFilterBtns.length > 0 && productCards.length > 0) {
        let activeCategory = 'all';
        let searchQuery = '';

        function filterProducts() {
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('p')?.textContent.toLowerCase() || '';

                const matchesCategory = (activeCategory === 'all' || category === activeCategory);
                const matchesSearch = title.includes(searchQuery) || desc.includes(searchQuery);

                if (matchesCategory && matchesSearch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        productFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                productFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.getAttribute('data-filter') || 'all';
                filterProducts();
            });
        });

        if (productSearchInput) {
            productSearchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim().toLowerCase();
                filterProducts();
            });
        }
    }

    // 5. Tips Search & Filter
    const tipFilterBtns = document.querySelectorAll('.tip-filter-btn');
    const tipCards = document.querySelectorAll('.tip-card');
    const tipSearchInput = document.querySelector('#tipSearch');

    if (tipFilterBtns.length > 0 && tipCards.length > 0) {
        let activeTipCat = 'all';
        let tipSearchQuery = '';

        function filterTips() {
            tipCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('p')?.textContent.toLowerCase() || '';

                const matchesCategory = (activeTipCat === 'all' || category === activeTipCat);
                const matchesSearch = title.includes(tipSearchQuery) || desc.includes(tipSearchQuery);

                if (matchesCategory && matchesSearch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        tipFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tipFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeTipCat = btn.getAttribute('data-filter') || 'all';
                filterTips();
            });
        });

        if (tipSearchInput) {
            tipSearchInput.addEventListener('input', (e) => {
                tipSearchQuery = e.target.value.trim().toLowerCase();
                filterTips();
            });
        }
    }

    // 6. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                // Close other items
                faqItems.forEach(other => other.classList.remove('active'));
                if (!isOpen) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 7. Interactive Toast Notice
    function showToast(message) {
        let toast = document.querySelector('.toast-notice');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-notice';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // 8. Contact Form Handler
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الإرسال...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
                showToast('تم استلام طلبك واستشارتك بنجاح! سيتواصل معك فريق صيدلية الندى البيطري قريباً.');
            }, 1000);
        });
    }
});

