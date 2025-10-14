// Replace with your GitHub username
const GITHUB_USERNAME = 'KarthikeyanS2006';
const GITHUB_API = 'https://api.github.com';

// Fetch user profile data
async function fetchUserProfile() {
    try {
        const response = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) throw new Error('Failed to fetch user profile');
        
        const data = await response.json();
        displayUserProfile(data);
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}

// Display user profile information
function displayUserProfile(data) {
    document.getElementById('profile-pic').src = data.avatar_url;
    document.getElementById('profile-name').textContent = data.name || data.login;
    document.getElementById('profile-bio').textContent = data.bio || 'No bio available';
    document.getElementById('followers-count').textContent = data.followers;
    document.getElementById('repos-count').textContent = data.public_repos;
    document.getElementById('following-count').textContent = data.following;
    document.getElementById('github-link').href = data.html_url;
}

// Fetch user repositories
async function fetchRepositories() {
    try {
        const response = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) throw new Error('Failed to fetch repositories');
        
        const repos = await response.json();
        displayRepositories(repos);
    } catch (error) {
        console.error('Error fetching repositories:', error);
        document.getElementById('projects-container').innerHTML = '<p class="loading">Failed to load projects</p>';
    }
}

// Display repositories
function displayRepositories(repos) {
    const container = document.getElementById('projects-container');
    
    if (repos.length === 0) {
        container.innerHTML = '<p class="loading">No repositories found</p>';
        return;
    }
    
    container.innerHTML = repos.map(repo => `
        <div class="project-card">
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <div class="project-meta">
                ${repo.language ? `
                    <div class="language">
                        <span class="language-dot" style="background: ${getLanguageColor(repo.language)}"></span>
                        <span>${repo.language}</span>
                    </div>
                ` : ''}
                <div class="stars">
                    <span>⭐</span>
                    <span>${repo.stargazers_count}</span>
                </div>
                <div class="forks">
                    <span>🔱</span>
                    <span>${repo.forks_count}</span>
                </div>
            </div>
            <div class="project-links">
                <a href="${repo.html_url}" target="_blank">View Code</a>
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank">Live Demo</a>` : ''}
            </div>
        </div>
    `).join('');
}

// Get language color (simplified version)
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
        'TypeScript': '#2b7489'
    };
    return colors[language] || '#858585';
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    fetchUserProfile();
    fetchRepositories();
});
