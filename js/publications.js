document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.pub-section');
    const backToTop = document.querySelector('.back-to-top');
    
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
    
    // Handle sub-navigation section links
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('sub-nav-link')) {
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

    // Update active section in sub-navigation
    const updateActiveSubNavSection = () => {
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
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    };

    // Add scroll listener for sub-nav active states
    window.addEventListener('scroll', updateActiveSubNavSection);
    
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
        
        // Update active states
        updateActiveSubNavSection();
    }
});