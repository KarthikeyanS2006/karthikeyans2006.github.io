// GitHub Configuration
const GITHUB_USERNAME = 'KarthikeyanS2006';
const GITHUB_API = 'https://api.github.com';

// Store GitHub data
let githubData = {
    user: null,
    repos: []
};

// Fetch GitHub data
async function fetchGitHubData() {
    try {
        const userResponse = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`);
        githubData.user = await userResponse.json();

        const reposResponse = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        githubData.repos = await reposResponse.json();
        
        console.log('GitHub data loaded successfully');
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        githubData.user = { 
            avatar_url: 'https://via.placeholder.com/400',
            public_repos: 0,
            followers: 0,
            following: 0,
            login: GITHUB_USERNAME
        };
        githubData.repos = [];
    }
}

// Language colors
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'Java': '#b07219',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'PHP': '#4F5D95',
        'Kotlin': '#F18E33',
        'Dart': '#00B4AB',
        'TypeScript': '#2b7489',
        'Flutter': '#02569B'
    };
    return colors[language] || '#858585';
}

// Home Page
function renderHome() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <section class="home-section">
            <div class="home-content">
                <h3>Hello, I'm</h3>
                <h1>Karthikeyan</h1>
                <h2>Full Stack Developer</h2>
                <p>I build modern web and mobile applications using the latest technologies. 
                Passionate about creating seamless user experiences and solving complex problems.</p>
                <a href="#/projects" class="btn">View My Work</a>
                <a href="#/contact" class="btn btn-secondary">Contact Me</a>
            </div>
            <div class="home-image">
                <img src="${githubData.user?.avatar_url || 'https://via.placeholder.com/400'}" 
                     alt="Profile" class="profile-pic">
            </div>
        </section>
    `;
}

// About Page
function renderAbout() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <section class="about-section">
            <h2 class="section-title">About <span>Me</span></h2>
            <p class="section-subtitle">Get to know more about me</p>
            
            <div class="about-content">
                <div class="about-text">
                    <p>I'm a passionate Full Stack Developer currently pursuing BCA (Bachelor of Computer Applications). 
                    I specialize in creating modern web and mobile applications using technologies like PHP, JavaScript, 
                    Flutter, and more.</p>
                    
                    <p>I love building projects that solve real-world problems and continuously learning new technologies. 
                    My focus is on writing clean, efficient code and creating intuitive user interfaces.</p>
                    
                    <p>When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, 
                    and sharing knowledge with the developer community.</p>
                </div>
                
                <div class="github-stats">
                    <div class="stat-box">
                        <h3>${githubData.user?.public_repos || 0}</h3>
                        <p>Repositories</p>
                    </div>
                    <div class="stat-box">
                        <h3>${githubData.user?.followers || 0}</h3>
                        <p>Followers</p>
                    </div>
                    <div class="stat-box">
                        <h3>${githubData.user?.following || 0}</h3>
                        <p>Following</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Projects Page
function renderProjects() {
    const app = document.getElementById('app');
    
    if (!githubData.repos || githubData.repos.length === 0) {
        app.innerHTML = `
            <section class="projects-section">
                <h2 class="section-title">My <span>Projects</span></h2>
                <p class="section-subtitle">Check out my recent work</p>
                <div class="loading">Loading projects...</div>
            </section>
        `;
        return;
    }

    const projectsHTML = githubData.repos.map(repo => `
        <div class="project-card">
            <div class="project-header">
                <h3>${repo.name}</h3>
            </div>
            <div class="project-body">
                <p>${repo.description || 'No description available'}</p>
                <div class="project-meta">
                    ${repo.language ? `
                        <div class="language">
                            <span class="language-dot" style="background: ${getLanguageColor(repo.language)}"></span>
                            <span>${repo.language}</span>
                        </div>
                    ` : ''}
                    <div><i class="fas fa-star"></i> ${repo.stargazers_count}</div>
                    <div><i class="fas fa-code-branch"></i> ${repo.forks_count}</div>
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank">
                        <i class="fab fa-github"></i> View Code
                    </a>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    app.innerHTML = `
        <section class="projects-section">
            <h2 class="section-title">My <span>Projects</span></h2>
            <p class="section-subtitle">Check out my recent work from GitHub</p>
            <div class="projects-grid">
                ${projectsHTML}
            </div>
        </section>
    `;
}

// Skills Page
function renderSkills() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <section class="skills-section">
            <h2 class="section-title">My <span>Skills</span></h2>
            <p class="section-subtitle">Technologies I work with</p>
            
            <div class="skills-grid">
                <div class="skill-category">
                    <h3>Frontend</h3>
                    <div class="skill-item">
                        <div class="skill-name"><span>HTML/CSS</span><span>90%</span></div>
                        <div class="skill-bar"><div class="skill-progress" style="width: 90%"></div></div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name"><span>JavaScript</span><span>85%</span></div>
                        <div class="skill-bar"><div class="skill-progress" style="width: 85%"></div></div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name"><span>Flutter</span><span>80%</span></div>
                        <div class="skill-bar"><div class="skill-progress" style="width: 80%"></div></div>
                    </div>
                </div>

                <div class="skill-category">
                    <h3>Backend</h3>
                    <div class="skill-item">
                        <div class="skill-name"><span>PHP</span><span>85%</span></div>
                        <div class="skill-bar"><div class="skill-progress" style="width: 85%"></div></div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name"><span>Python</span><span>75%</span></div>
                        <div class="skill-bar"><div class="skill-progress" style="width: 75%"></div></div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name"><span>Node.js</span><span>70%</span></div>
                        <div class="skill-bar"><div class="skill-progress" style="width: 70%"></div></div>
                    </div>
                </div>

                <div class="skill-category">
                    <h3>Database & Tools</h3>
                    <div class="skill-item">
                        <div class="skill-name"><span>MySQL</span><span>85%</span></div>
                        <div class="skill-bar"><div class="skill-progress" style="width: 85%"></div></div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name"><span>MongoDB</span><span>80%</span></div>
                        <div class="skill-bar"><div class="skill-progress" style="width: 80%"></div></div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name"><span>Git</span><span>90%</span></div>
                        <div class="skill-bar"><div class="skill-progress" style="width: 90%"></div></div>
                    </div>
                </div>

                <div class="skill-category">
                    <h3>Mobile Development</h3>
                    <div class="skill-item">
                        <div class="skill-name"><span>Android (Kotlin)</span><span>80%</span></div>
                        <div class="skill-bar"><div class="skill-progress" style="width: 80%"></div></div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name"><span>Flutter</span><span>85%</span></div>
                        <div class="skill-bar"><div class="skill-progress" style="width: 85%"></div></div>
                    </div>
                    <div class="skill-item">
                        <div class="skill-name"><span>Firebase</span><span>75%</span></div>
                        <div class="skill-bar"><div class="skill-progress" style="width: 75%"></div></div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Contact Page
function renderContact() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <section class="contact-section">
            <h2 class="section-title">Contact <span>Me</span></h2>
            <p class="section-subtitle">Get in touch with me</p>
            
            <div class="contact-content">
                <div class="contact-info">
                    <div class="info-box">
                        <div class="info-icon"><i class="fas fa-envelope"></i></div>
                        <div class="info-text">
                            <h4>Email</h4>
                            <p><a href="mailto:karthikeyan.s.jd2005@gmail.com">karthikeyan.s.jd2005@gmail.com</a></p>
                        </div>
                    </div>
                    <div class="info-box">
                        <div class="info-icon"><i class="fas fa-map-marker-alt"></i></div>
                        <div class="info-text">
                            <h4>Location</h4>
                            <p>Tamil Nadu, India</p>
                        </div>
                    </div>
                    <div class="info-box">
                        <div class="info-icon"><i class="fab fa-github"></i></div>
                        <div class="info-text">
                            <h4>GitHub</h4>
                            <p><a href="https://github.com/${githubData.user?.login || GITHUB_USERNAME}" target="_blank">${githubData.user?.login || GITHUB_USERNAME}</a></p>
                        </div>
                    </div>
                </div>

                <form class="contact-form" id="contact-form">
                    <div class="form-group">
                        <label>Name <span style="color: var(--primary-orange);">*</span></label>
                        <input type="text" name="name" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <label>Email <span style="color: var(--primary-orange);">*</span></label>
                        <input type="email" name="email" placeholder="Your Email" required>
                    </div>
                    <div class="form-group">
                        <label>Message <span style="color: var(--primary-orange);">*</span></label>
                        <textarea name="message" placeholder="Your Message" required></textarea>
                    </div>
                    <button type="submit" class="btn">
                        <i class="fas fa-paper-plane"></i> Send Message
                    </button>
                </form>
            </div>
        </section>
    `;
    
    requestAnimationFrame(() => {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', handleContactSubmit);
        }
    });
}

// Handle contact form submission - SINGLE FUNCTION ONLY
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}\n\n` +
        `---\n` +
        `Sent from portfolio website`
    );
    
    const choice = confirm(
        'How would you like to send your message?\n\n' +
        'OK = Open Gmail in browser\n' +
        'Cancel = Open default email app'
    );
    
    if (choice) {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=karthikeyan.s.jd2005@gmail.com&su=${subject}&body=${body}`;
        window.open(gmailUrl, '_blank');
    } else {
        window.location.href = `mailto:karthikeyan.s.jd2005@gmail.com?subject=${subject}&body=${body}`;
    }
    
    setTimeout(() => {
        e.target.reset();
        alert('Form submitted! Please send the email to complete your message.');
    }, 500);
}

// 404 Page
function render404() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <section class="about-section" style="text-align: center; min-height: 60vh; display: flex; flex-direction: column; justify-content: center;">
            <h2 class="section-title" style="font-size: 5rem; color: var(--primary-orange);">404</h2>
            <p class="section-subtitle" style="font-size: 1.5rem;">Page Not Found</p>
            <a href="#/" class="btn">Go Home</a>
        </section>
    `;
}

// Register routes
router.route('/', renderHome);
router.route('/about', renderAbout);
router.route('/projects', renderProjects);
router.route('/skills', renderSkills);
router.route('/contact', renderContact);
router.route('/404', render404);

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Initializing application...');
    await fetchGitHubData();
    new NavigationAnimator();
    router.handleRoute();
});
