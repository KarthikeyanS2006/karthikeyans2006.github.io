// Simple SPA Router using Hash
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = '';
        
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    // Register a route
    route(path, handler) {
        this.routes[path] = handler;
    }

    // Handle route changes
    handleRoute() {
        let hash = window.location.hash.slice(1) || '/';
        
        // Handle routes with or without trailing slash
        if (hash !== '/' && hash.endsWith('/')) {
            hash = hash.slice(0, -1);
        }

        this.currentRoute = hash;
        
        // Scroll to top on route change
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update active nav link
        this.updateActiveNav();
        
        // Execute route handler
        const handler = this.routes[hash] || this.routes['/404'];
        if (handler) {
            handler();
        }
    }

    // Update active navigation link
    updateActiveNav() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').slice(1);
            if (href === this.currentRoute) {
                link.classList.add('active');
            }
        });
    }

    // Navigate programmatically
    navigate(path) {
        window.location.hash = path;
    }
}

// Complete navigation animations system (Modified for SPA)
class NavigationAnimator {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        this.handleScroll();
        this.handleMobileMenu();
        // REMOVED: this.handleSmoothScroll() - conflicts with hash routing
        // REMOVED: this.highlightActiveSection() - doesn't work with SPA
        this.addProgressBar();
    }

    handleScroll() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            // Add scrolled class
            if (currentScroll > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // Hide navbar on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 500) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    handleMobileMenu() {
        this.hamburger?.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger?.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });
    }

    addProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
}

// Export router instance
const router = new Router();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NavigationAnimator();
});
