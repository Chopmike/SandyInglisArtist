// Store current artwork globally for email function
let currentArtwork = null;

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
        
        // Store artwork globally for email function
        currentArtwork = artwork;
        
        // Populate page with artwork data
        document.getElementById('artworkImage').src = artwork.image;
        document.getElementById('artworkImage').alt = artwork.title;
        
        // Add fallback for Azure images
        document.getElementById('artworkImage').onerror = function() {
            this.onerror = null;
            this.src = artwork.localImage || artwork.image;
        };
        
        document.getElementById('artworkTitle').textContent = artwork.title;
        document.getElementById('artworkArtist').textContent = artwork.artist;
        document.getElementById('artworkYear').textContent = artwork.year;
        document.getElementById('artworkCollection').textContent = artwork.collection || 'N/A';
        
        // Handle accolades
        if (artwork.accolades) {
            document.getElementById('artworkAccolades').textContent = artwork.accolades;
            document.getElementById('accoladesRow').style.display = 'flex';
        }
        
        // Handle availability status
        const availabilityEl = document.getElementById('artworkAvailability');
        const availableCard = document.getElementById('availableCard');
        const soldCard = document.getElementById('soldCard');
        
        const availability = artwork.availability || 'available'; // Default to available
        
        if (availability === 'available') {
            availabilityEl.textContent = 'Available for Sale';
            availabilityEl.classList.add('available');
            availableCard.style.display = 'flex';
            soldCard.style.display = 'none';
        } else if (availability === 'sold') {
            availabilityEl.textContent = 'Sold / In Private Collection';
            availabilityEl.classList.add('sold');
            availableCard.style.display = 'none';
            soldCard.style.display = 'flex';
        } else if (availability === 'commission-only') {
            availabilityEl.textContent = 'Commission Only';
            availabilityEl.classList.add('commission-only');
            availableCard.style.display = 'none';
            soldCard.style.display = 'none';
        }
        
        // Update enquiry link to go to contact form with artwork details
        const enquireLink = document.getElementById('enquireLink');
        if (enquireLink) {
            enquireLink.href = `contact.html?artwork=${encodeURIComponent(artwork.title)}&type=enquire-artwork`;
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

// Send enquiry email with artwork details
function sendEnquiryEmail() {
    if (!currentArtwork) return;
    
    const email = 'sandy@chasedesign.com.au';
    const subject = `Enquiry: ${currentArtwork.title}`;
    
    // Build email body with artwork details
    let body = `Hi Sandy,\n\n`;
    body += `I'm interested in your "${currentArtwork.title}" artwork.\n\n`;
    body += `Artwork Details:\n`;
    body += `- Title: ${currentArtwork.title}\n`;
    body += `- Year: ${currentArtwork.year}\n`;
    if (currentArtwork.collection) {
        body += `- Collection: ${currentArtwork.collection}\n`;
    }
    if (currentArtwork.description) {
        body += `- Description: ${currentArtwork.description}\n`;
    }
    body += `\nPlease contact me to discuss.\n\n`;
    body += `Kind regards,\n[Your Name]`;
    
    // Create mailto link
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}
