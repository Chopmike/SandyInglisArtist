// Azure Blob Storage Configuration
// IMPORTANT: This file contains the public blob URL only.
// The connection string with account key should NEVER be exposed in client-side code.
// For uploads, use the admin upload tool which connects via Azure backend.

const AZURE_STORAGE_CONFIG = {
    // Storage account name
    accountName: '20260124sandiinlis',
    
    // Container name for all images
    containerName: 'blobs',
    
    // Public blob URL base (for reading images)
    blobBaseUrl: 'https://20260124sandiinlis.blob.core.windows.net/blobs',
    
    // Image folder structure within the container
    folders: {
        artworks: 'artworks/',           // For artwork images
        placeholders: 'placeholders/',    // For placeholder images
        about: 'about/',                  // For Sandy's photos
        logo: 'logo/',                    // For logo images
        hero: 'hero/'                     // For hero banner images
    },
    
    // Get full URL for an image
    getImageUrl: function(folder, filename) {
        return `${this.blobBaseUrl}/${folder}${filename}`;
    },
    
    // Get artwork image URL
    getArtworkUrl: function(filename) {
        return this.getImageUrl(this.folders.artworks, filename);
    },
    
    // Get about page image URL
    getAboutUrl: function(filename) {
        return this.getImageUrl(this.folders.about, filename);
    },
    
    // Get logo URL
    getLogoUrl: function(filename) {
        return this.getImageUrl(this.folders.logo, filename);
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AZURE_STORAGE_CONFIG;
}
