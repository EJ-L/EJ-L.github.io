// Handle scrolling to target section from Publications page
document.addEventListener('DOMContentLoaded', () => {
    const scrollTarget = sessionStorage.getItem('scrollTarget');
    if (scrollTarget) {
        const targetSection = document.getElementById(scrollTarget);
        if (targetSection) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight - 10;
            
            // Clear the scroll target from session storage
            sessionStorage.removeItem('scrollTarget');
            
            // Wait for all content to load before scrolling
            window.addEventListener('load', () => {
                // Additional small delay to ensure all dynamic content is rendered
                setTimeout(() => {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Highlight the section if needed
                    targetSection.classList.add('highlight');
                    setTimeout(() => {
                        targetSection.classList.remove('highlight');
                    }, 2000);
                }, 200);
            });
        }
    }
}); 