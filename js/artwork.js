// Load artwork details from URL parameter
document.addEventListener('DOMContentLoaded', async () => {
    // Get artwork ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const artworkId = parseInt(urlParams.get('id'));
    
    if (!artworkId) {
        // Redirect to gallery if no ID
        window.location.href = 'index.html#gallery';
        return;
    }
    
    // Load artwork data
    await loadArtworkDetails(artworkId);
    
    // Initialize navigation
    initNavigation();
});

// Load specific artwork details
async function loadArtworkDetails(artworkId) {
    try {
        const response = await fetch('data/artworks.json');
        const artworks = await response.json();
        
        const artwork = artworks.find(a => a.id === artworkId);
        
        if (!artwork) {
            window.location.href = 'index.html#gallery';
            return;
        }
        
        // Populate page with artwork data
        document.getElementById('artworkImage').src = artwork.image;
        document.getElementById('artworkImage').alt = artwork.title;
        document.getElementById('artworkTitle').textContent = artwork.title;
        document.getElementById('artworkArtist').textContent = artwork.artist;
        document.getElementById('artworkYear').textContent = artwork.year;
        document.getElementById('artworkCollection').textContent = artwork.collection || 'N/A';
        
        // Handle accolades
        if (artwork.accolades) {
            document.getElementById('artworkAccolades').textContent = artwork.accolades;
            document.getElementById('accoladesRow').style.display = 'flex';
        }
        
        // Handle description
        const descriptionEl = document.getElementById('artworkDescription');
        if (artwork.description) {
            descriptionEl.textContent = artwork.description;
            descriptionEl.style.display = 'block';
        } else {
            descriptionEl.style.display = 'none';
        }
        
        // Update page title
        document.title = `${artwork.title} - Sandy Inglis Artist`;
        
    } catch (error) {
        console.error('Error loading artwork:', error);
        window.location.href = 'index.html#gallery';
    }
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}
