// Gallery data management
let artworksData = [];
let filteredArtworks = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    // Load artwork data
    await loadArtworks();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize filters
    initFilters();

    // Initialize collection dropdown
    initCollectionFilter();

    // Initialize search
    initSearch();
    
    // Initialize modal
    initModal();
    
    // Render gallery
    renderGallery(artworksData);
});

// Load artworks from JSON file
async function loadArtworks() {
    try {
        const response = await fetch('data/artworks.json');
        artworksData = await response.json();
        filteredArtworks = [...artworksData];
    } catch (error) {
        console.log('No artworks data found. Starting with empty gallery.');
        artworksData = [];
        filteredArtworks = [];
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
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Filter functionality
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Apply filter
            applyFilter(filterValue);
        });
    });
}

// Apply filter to gallery
function applyFilter(filterValue) {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (filterValue === 'all') {
        filteredArtworks = artworksData.filter(artwork => 
            matchesSearch(artwork, searchTerm)
        );
    } else if (filterValue === 'award-winner') {
        filteredArtworks = artworksData.filter(artwork => 
            artwork.accolades && 
            artwork.accolades.toLowerCase().includes('winner') &&
            matchesSearch(artwork, searchTerm)
        );
    } else if (filterValue === 'highly-commended') {
        filteredArtworks = artworksData.filter(artwork => 
            artwork.accolades && 
            artwork.accolades.toLowerCase().includes('highly commended') &&
            matchesSearch(artwork, searchTerm)
        );
    } else {
        // Filter by year
        filteredArtworks = artworksData.filter(artwork => 
            artwork.year.toString() === filterValue &&
            matchesSearch(artwork, searchTerm)
        );
    }
    
    renderGallery(filteredArtworks);
}

// Collection dropdown: build options from the data and filter on change
function initCollectionFilter() {
    const select = document.getElementById('collectionFilter');
    if (!select) return;

    // Unique collection names, ignoring blanks, sorted alphabetically
    const collections = [...new Set(
        artworksData.map(a => (a.collection || '').trim()).filter(Boolean)
    )].sort((a, b) => a.localeCompare(b));

    select.innerHTML = '<option value="all">All collections</option>' +
        collections.map(c => `<option value="${escapeAttr(c)}">${escapeHtml(c)}</option>`).join('');

    select.addEventListener('change', applyFilters);
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', applyFilters);
}

// Combined collection + search filtering
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const select = document.getElementById('collectionFilter');
    const collection = select ? select.value : 'all';

    filteredArtworks = artworksData.filter(artwork =>
        (collection === 'all' || (artwork.collection || '').trim() === collection) &&
        matchesSearch(artwork, searchTerm)
    );

    renderGallery(filteredArtworks);
}

// Small escaping helpers for building option markup safely
function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, '&quot;');
}

// Check if artwork matches search term
function matchesSearch(artwork, searchTerm) {
    if (!searchTerm) return true;
    
    const searchableText = [
        artwork.title,
        artwork.artist,
        artwork.collection,
        artwork.description,
        artwork.accolades
    ].join(' ').toLowerCase();
    
    return searchableText.includes(searchTerm);
}

// Render gallery
function renderGallery(artworks) {
    const galleryGrid = document.getElementById('galleryGrid');
    const noResults = document.getElementById('noResults');
    
    if (artworks.length === 0) {
        galleryGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    galleryGrid.innerHTML = artworks.map(artwork => `
        <div class="gallery-item" data-id="${artwork.id}" onclick="openModal(${artwork.id})">
            <div class="gallery-image">
                <img src="${artwork.image}" 
                     alt="${artwork.title}" 
                     loading="lazy"
                     onerror="this.onerror=null; this.src='${artwork.localImage || artwork.image}';">
            </div>
            <div class="gallery-info">
                <h3>${artwork.title}</h3>
                <div class="gallery-meta">
                    <span>${artwork.artist}</span>
                </div>
                ${artwork.accolades ? `<span class="accolade-badge">${artwork.accolades}</span>` : ''}
            </div>
        </div>
    `).join('');
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('artworkModal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    // Close modal on clicking X
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal on clicking overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Prevent modal body clicks from closing modal
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// Open modal with artwork details
function openModal(artworkId) {
    const artwork = artworksData.find(a => a.id === artworkId);
    if (!artwork) return;
    
    // Populate modal
    document.getElementById('modalImage').src = artwork.image;
    document.getElementById('modalImage').alt = artwork.title;
    document.getElementById('modalTitle').textContent = artwork.title;
    document.getElementById('modalArtist').textContent = artwork.artist;
    document.getElementById('modalCollection').textContent = artwork.collection || 'N/A';
    
    const accoladesEl = document.getElementById('modalAccolades');
    if (artwork.accolades) {
        accoladesEl.innerHTML = `<strong>Accolades:</strong> ${artwork.accolades}`;
        accoladesEl.style.display = 'block';
    } else {
        accoladesEl.style.display = 'none';
    }
    
    const descriptionEl = document.getElementById('modalDescription');
    if (artwork.description) {
        descriptionEl.textContent = artwork.description;
        descriptionEl.style.display = 'block';
    } else {
        descriptionEl.style.display = 'none';
    }
    
    // Set view full page link
    document.getElementById('viewFullPage').href = `artwork.html?id=${artwork.id}`;
    
    // Show modal
    const modal = document.getElementById('artworkModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('artworkModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Reload gallery (called after uploading new images)
function reloadGallery() {
    loadArtworks().then(() => {
        renderGallery(artworksData);
    });
}

// Export for use in admin page
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { reloadGallery, artworksData };
}
