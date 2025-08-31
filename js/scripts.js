// Load components in the specified order
const components = [
    'profile',  // Profile should always be first
    'news',
    // 'education',
    'experience',
    'awards',
    // Commented out modules to hide them
    // 'projects',
    // 'services',
    // 'talks'
];

// Helper function to set text width
function setTextWidth(element, text) {
    const textWidth = getTextWidth(text);
    element.style.setProperty('--text-width', `${textWidth}px`);
    return textWidth;
}

function generateNavLinks() {
    const navLinks = document.querySelector('.nav-links');
    console.log('Finding nav-links:', navLinks);
    if (!navLinks) return;

    // Check if we're on the publications page
    const isPublicationsPage = window.location.pathname.includes('publications.html');
    console.log('Is publications page:', isPublicationsPage);
    console.log('Current pathname:', window.location.pathname);

    // Add Home link first
    const homeLink = document.createElement('a');
    homeLink.href = isPublicationsPage ? 'index.html' : '#profile';
    homeLink.textContent = 'Home';
    if (!isPublicationsPage) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    navLinks.appendChild(homeLink);
    const homeTextWidth = setTextWidth(homeLink, homeLink.textContent);
    console.log('Added home link:', {
        text: homeLink.textContent,
        elementWidth: homeLink.offsetWidth,
        textWidth: homeTextWidth,
        computedStyle: window.getComputedStyle(homeLink),
        underline: getUnderlineWidth(homeLink)
    });

    // Filter out 'profile' as it's already handled by Home link
    const navigationComponents = components.filter(component => component !== 'profile');
    console.log('Navigation components:', navigationComponents);
    
    // Counter to track position for Publications link
    let linkCount = 1; // Start at 1 because Home is already added
    
    // Generate navigation links
    navigationComponents.forEach(component => {
        // Add Publications link before the third component
        if (linkCount === 2) {
            const publicationsLink = document.createElement('a');
            publicationsLink.href = 'publications.html';
            publicationsLink.textContent = 'Publications';
            if (isPublicationsPage) {
                publicationsLink.classList.add('active');
            }
            navLinks.appendChild(publicationsLink);
            const pubTextWidth = setTextWidth(publicationsLink, publicationsLink.textContent);
            console.log('Added publications link:', {
                text: publicationsLink.textContent,
                elementWidth: publicationsLink.offsetWidth,
                textWidth: pubTextWidth,
                computedStyle: window.getComputedStyle(publicationsLink),
                underline: getUnderlineWidth(publicationsLink)
            });
            linkCount++;
        }
        
        const link = document.createElement('a');
        
        if (isPublicationsPage) {
            link.href = `index.html#${component}`;
        } else {
            link.href = `#${component}`;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetElement = document.getElementById(component);
                if (targetElement) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }

        // Capitalize first letter and add spaces before capital letters
        const displayName = component === 'news' ? 'Recent News' : 
            component.replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase());
        link.textContent = displayName;
        navLinks.appendChild(link);
        const linkTextWidth = setTextWidth(link, link.textContent);
        console.log(`Added link for ${displayName}:`, {
            text: link.textContent,
            elementWidth: link.offsetWidth,
            textWidth: linkTextWidth,
            computedStyle: window.getComputedStyle(link),
            underline: getUnderlineWidth(link)
        });
        linkCount++;
    });

    // Add scroll event listener to update active states
    if (!isPublicationsPage) {
        window.addEventListener('scroll', () => {
            updateActiveNavLink();
        });
        // Initial check
        updateActiveNavLink();
    }
}

// Helper function to calculate text width
function getTextWidth(text) {
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
    const context = canvas.getContext('2d');
    context.font = window.getComputedStyle(document.querySelector('.nav-links a')).font;
    const metrics = context.measureText(text);
    return metrics.width;
}

// Helper function to get underline width
function getUnderlineWidth(element) {
    const style = window.getComputedStyle(element, '::after');
    return {
        width: style.width,
        left: style.left,
        transform: style.transform
    };
}

function updateActiveNavLink() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const navHeight = document.querySelector('.nav').offsetHeight;

    // Get all sections that can be navigated to
    const sections = ['profile', ...components.filter(c => document.getElementById(c))];
    
    // Find the current section
    let currentSection = null;
    
    // Special case for profile/home section
    if (scrollPosition < windowHeight / 3) {
        currentSection = 'profile';
    } else {
        // Find which section is currently in view
        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop - navHeight - 10;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = sectionId;
                    console.log('Current section:', currentSection);
                    break;
                }
            }
        }
    }

    // Update active states of navigation links
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Handle both hash links and regular links
        const linkSection = href.startsWith('#') ? href.slice(1) : 
                          href === 'index.html' ? 'profile' :
                          href === 'publications.html' ? 'publications' : null;

        if (linkSection === currentSection) {
            link.classList.add('active');
            console.log('Active link:', link.textContent, 'width:', link.offsetWidth, 'text width:', getTextWidth(link.textContent));
        } else {
            link.classList.remove('active');
        }
    });
}

async function loadComponents() {
    const contentDiv = document.getElementById('content');
    if (!contentDiv) {
        console.error('Content div not found');
        return;
    }
    
    console.log('Starting to load components:', components);
    
    for (const component of components) {
        try {
            console.log(`Attempting to load ${component}...`);
            // Add cache-busting parameter
            const response = await fetch(`components/${component}.html?v=${Date.now()}`);
            
            if (!response.ok) {
                console.error(`Failed to load ${component}:`, response.status, response.statusText);
                throw new Error(`HTTP error loading ${component}`);
            }
            
            const html = await response.text();
            if (!html.trim()) {
                console.error(`Empty HTML content for ${component}`);
                continue;
            }
            console.log(`Successfully loaded ${component} HTML, length: ${html.length}`);
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html.trim();
            
            const componentElement = tempDiv.firstElementChild;
            if (!componentElement) {
                console.error(`No valid element found in ${component} HTML`);
                continue;
            }
            
            // Ensure proper class and ID setup
            console.log(`${component} element before modification:`, componentElement.outerHTML);
            
            if (!componentElement.classList.contains('section')) {
                componentElement.classList.add('section');
            }
            componentElement.classList.add(`${component}-section`);
            componentElement.id = component;
            
            console.log(`${component} element after modification:`, componentElement.outerHTML);
            
            contentDiv.appendChild(componentElement);
            console.log(`Successfully appended ${component} to content div`);
        } catch (error) {
            console.error(`Error processing ${component}:`, error);
        }
    }

    // Initialize NewsManager after components are loaded
    if (components.includes('news')) {
        console.log('Initializing NewsManager...');
        const newsManager = new NewsManager();
        setTimeout(() => newsManager.init(), 100);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded'); // Debug log
    
    // Always generate navigation links
    generateNavLinks();

    // Only try to load components if we're not on the publications page
    const isPublicationsPage = window.location.pathname.includes('publications.html');
    if (!isPublicationsPage) {
        const contentDiv = document.getElementById('content');
        if (!contentDiv) {
            console.error('Content div not found!'); // Debug log
            return;
        }
        
        loadComponents().then(() => {
            // Add scroll event listener to update active states
            window.addEventListener('scroll', updateActiveNavLink);
            // Initial check for active section
            updateActiveNavLink();
            
            // Check if there's a scroll target from publications page
            const scrollTarget = sessionStorage.getItem('scrollTarget');
            if (scrollTarget) {
                // Clear the stored target
                sessionStorage.removeItem('scrollTarget');
                // Wait a bit for components to fully render
                setTimeout(() => {
                    const targetElement = document.getElementById(scrollTarget);
                    if (targetElement) {
                        const navHeight = document.querySelector('.nav').offsetHeight;
                        const targetPosition = targetElement.offsetTop - navHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            }
        });
    }
}); 