// Helper function to calculate text width
function getTextWidth(text) {
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
    const context = canvas.getContext('2d');
    context.font = window.getComputedStyle(document.querySelector('.nav-links a')).font;
    const metrics = context.measureText(text);
    return metrics.width;
}

// Helper function to set text width
function setTextWidth(element, text) {
    const textWidth = getTextWidth(text);
    element.style.setProperty('--text-width', `${textWidth}px`);
    return textWidth;
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('.pub-section');
    const backToTop = document.querySelector('.back-to-top');
    
    // Store original navigation content
    let originalNavContent = null;
    let isSubNavVisible = false;
    if (navLinks) {
        originalNavContent = navLinks.innerHTML;
    }

    // Create sub-navigation content
    const createSubNavContent = () => {
        let content = '<a href="#" class="back-nav-link"><img src="assets/logo.png" alt="Logo" class="nav-logo"></a>';
        content += '<span class="separator">|</span>';
        
        // Add section links based on available sections
        const sectionTypes = Array.from(sections).map(section => section.id);
        if (sectionTypes.includes('conference')) {
            content += '<a href="#conference" class="sub-nav-link">Conference</a>';
        }
        if (sectionTypes.includes('journal')) {
            content += '<a href="#journal" class="sub-nav-link">Journal</a>';
        }
        if (sectionTypes.includes('preprints')) {
            content += '<a href="#preprints" class="sub-nav-link">Preprints</a>';
        }
        
        // Add main page section links
        content += '<span class="separator">|</span>';
        content += '<a href="index.html#recent-news" class="main-nav-link">Recent News</a>';
        content += '<a href="index.html#experience" class="main-nav-link">Experience</a>';
        content += '<a href="index.html#awards" class="main-nav-link">Awards</a>';
        
        return content;
    };

    // Function to update sub-nav links text width
    const updateSubNavLinksWidth = () => {
        const subNavLinks = document.querySelectorAll('.sub-nav-link, .main-nav-link');
        subNavLinks.forEach(link => {
            setTextWidth(link, link.textContent);
        });
    };

    // Function to update active section in sub-navigation
    const updateActiveSection = () => {
        if (!isSubNavVisible) return;

        const scrollPosition = window.scrollY;
        const navHeight = document.querySelector('.nav').offsetHeight;
        
        const currentSection = Array.from(sections).find(section => {
            const sectionTop = section.offsetTop - navHeight - 10;
            const sectionBottom = sectionTop + section.offsetHeight;
            return scrollPosition >= sectionTop && scrollPosition < sectionBottom;
        });
        
        if (currentSection) {
            const subNavLinks = document.querySelectorAll('.sub-nav-link');
            subNavLinks.forEach(link => {
                if (link.getAttribute('href') === `#${currentSection.id}`) {
                    if (!link.classList.contains('active')) {
                        link.classList.add('active');
                    }
                } else {
                    link.classList.remove('active');
                }
            });
        }
    };
    
    // Handle back to top button visibility
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Handle click events for sub-navigation links and back button
    document.addEventListener('click', (e) => {
        if (e.target.closest('.back-nav-link')) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (e.target.classList.contains('sub-nav-link')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
    
    // Handle main navigation links
    const mainNavLinks = document.querySelectorAll('.nav-links a');
    mainNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('index.html')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const hashIndex = href.indexOf('#');
                if (hashIndex !== -1) {
                    const targetSection = href.slice(hashIndex + 1);
                    sessionStorage.setItem('scrollTarget', targetSection);
                }
                window.location.href = 'index.html';
            });
        }
    });

    // Handle sub-navigation links that point to index.html sections
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('index.html#')) {
            e.preventDefault();
            const href = link.getAttribute('href');
            const targetSection = href.split('#')[1];
            sessionStorage.setItem('scrollTarget', targetSection);
            window.location.href = 'index.html';
        }
    });

    // Handle scroll behavior for navigation
    if (navLinks && sections.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const navHeight = document.querySelector('.nav').offsetHeight;
            
            // Switch navigation content based on scroll position
            if (scrollPosition > navHeight) {
                if (!isSubNavVisible) {
                    // Only update content if we're switching to sub-nav
                    navLinks.innerHTML = createSubNavContent();
                    updateSubNavLinksWidth();
                    isSubNavVisible = true;
                }
                updateActiveSection();
            } else if (isSubNavVisible) {
                // Only update content if we're switching back to main nav
                navLinks.innerHTML = originalNavContent;
                isSubNavVisible = false;
            }
        });
    }
    
    // Set initial active section based on hash
    const hash = window.location.hash || '#conference';
    const targetSection = document.querySelector(hash);
    if (targetSection) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight - 10;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'instant'
        });
        
        // Trigger scroll event to update navigation
        window.dispatchEvent(new Event('scroll'));
    }
}); 