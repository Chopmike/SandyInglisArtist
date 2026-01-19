// Admin panel functionality
let artworksData = [];
let selectedImage = null;
let selectedImageDataUrl = null;

// Initialize admin panel
document.addEventListener('DOMContentLoaded', async () => {
    // Load existing artworks
    await loadArtworks();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize form
    initForm();
    
    // Initialize image upload
    initImageUpload();
    
    // Render existing artworks
    renderArtworksList();
});

// Load artworks from JSON file
async function loadArtworks() {
    try {
        const response = await fetch('data/artworks.json');
        artworksData = await response.json();
    } catch (error) {
        console.log('No artworks data found. Starting with empty list.');
        artworksData = [];
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
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Initialize form
function initForm() {
    const form = document.getElementById('artworkForm');
    const resetBtn = document.getElementById('resetForm');
    
    // Set default year to current year
    document.getElementById('artworkYear').value = new Date().getFullYear();
    
    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleFormSubmit();
    });
    
    // Handle reset
    resetBtn.addEventListener('click', () => {
        form.reset();
        document.getElementById('artworkYear').value = new Date().getFullYear();
        resetImageUpload();
    });
}

// Initialize image upload
function initImageUpload() {
    const imageInput = document.getElementById('artworkImage');
    const uploadArea = document.getElementById('imageUploadArea');
    const removeBtn = document.getElementById('removeImage');
    
    // Handle file selection
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageSelection(file);
        }
    });
    
    // Handle drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-red)';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            imageInput.files = e.dataTransfer.files;
            handleImageSelection(file);
        }
    });
    
    // Handle remove image
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetImageUpload();
    });
}

// Handle image selection
function handleImageSelection(file) {
    selectedImage = file;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        selectedImageDataUrl = e.target.result;
        
        const preview = document.getElementById('imagePreview');
        const placeholder = document.querySelector('.upload-placeholder');
        
        preview.querySelector('img').src = e.target.result;
        placeholder.style.display = 'none';
        preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// Reset image upload
function resetImageUpload() {
    selectedImage = null;
    selectedImageDataUrl = null;
    
    const imageInput = document.getElementById('artworkImage');
    const preview = document.getElementById('imagePreview');
    const placeholder = document.querySelector('.upload-placeholder');
    
    imageInput.value = '';
    preview.querySelector('img').src = '';
    preview.style.display = 'none';
    placeholder.style.display = 'block';
}

// Handle form submission
async function handleFormSubmit() {
    const form = document.getElementById('artworkForm');
    const formData = new FormData(form);
    
    // Validate image
    if (!selectedImage) {
        showNotification('Please select an image', 'error');
        return;
    }
    
    // Create new artwork object
    const newArtwork = {
        id: artworksData.length > 0 ? Math.max(...artworksData.map(a => a.id)) + 1 : 1,
        title: formData.get('title'),
        artist: formData.get('artist'),
        year: parseInt(formData.get('year')),
        collection: formData.get('collection') || '',
        accolades: formData.get('accolades') && formData.get('accoladesDetail') 
            ? `${formData.get('accolades')} - ${formData.get('accoladesDetail')}`
            : formData.get('accolades') || '',
        description: formData.get('description') || '',
        image: `images/artworks/${selectedImage.name}`
    };
    
    // Add to artworks array
    artworksData.push(newArtwork);
    
    // Save to localStorage (for demo purposes)
    // In production, this would be saved to a database or backend
    localStorage.setItem('artworks', JSON.stringify(artworksData));
    
    // Show success notification
    showNotification('Artwork added successfully!', 'success');
    
    // Reset form
    form.reset();
    document.getElementById('artworkYear').value = new Date().getFullYear();
    resetImageUpload();
    
    // Re-render artworks list
    renderArtworksList();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render artworks list
function renderArtworksList() {
    const artworksList = document.getElementById('artworksList');
    
    if (artworksData.length === 0) {
        artworksList.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">No artworks yet. Add your first artwork above.</p>';
        return;
    }
    
    artworksList.innerHTML = artworksData.map(artwork => `
        <div class="artwork-item" data-id="${artwork.id}">
            <img src="${artwork.image}" alt="${artwork.title}" class="artwork-item-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22120%22 height=%22120%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2214%22%3ENo Image%3C/text%3E%3C/svg%3E'">
            <div class="artwork-item-info">
                <h3>${artwork.title}</h3>
                <div class="artwork-item-meta">
                    <p>${artwork.artist} • ${artwork.year}</p>
                    ${artwork.accolades ? `<p style="color: var(--primary-red); font-weight: 600;">${artwork.accolades}</p>` : ''}
                </div>
            </div>
            <div class="artwork-item-actions">
                <button class="btn-delete" onclick="deleteArtwork(${artwork.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Delete artwork
function deleteArtwork(id) {
    if (confirm('Are you sure you want to delete this artwork?')) {
        artworksData = artworksData.filter(a => a.id !== id);
        localStorage.setItem('artworks', JSON.stringify(artworksData));
        renderArtworksList();
        showNotification('Artwork deleted successfully', 'success');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    const notificationClose = document.getElementById('notificationClose');
    
    notificationMessage.textContent = message;
    notification.className = `notification ${type} show`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
    
    // Handle close button
    notificationClose.onclick = () => {
        notification.classList.remove('show');
    };
}

// Instructions for production use
console.log(`
%c📝 Admin Panel Instructions

%cThis admin panel demonstrates the UI for managing artworks. For production use:

1. Replace the localStorage implementation with a proper backend API
2. Implement actual file upload to your server or cloud storage (e.g., AWS S3, Cloudinary)
3. Update the artworks.json file on your server after each change
4. Consider adding authentication to protect the admin panel
5. Add image optimization and resizing on upload

For GitHub Pages deployment:
- Manually update data/artworks.json with new artwork data
- Upload images to images/artworks/ folder
- Commit and push changes to the gh-pages branch

`, 
'color: #8B3A3A; font-size: 16px; font-weight: bold;',
'color: #666; font-size: 14px;'
);
