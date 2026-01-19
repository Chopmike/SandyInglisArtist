# Sandy Inglis Artist Portfolio Website

A modern, responsive artist portfolio website designed for GitHub Pages hosting. Features a sleek gallery with filtering, detailed artwork pages, and an admin interface for managing content.

## 🎨 Features

- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Hero Banner**: Eye-catching landing section with call-to-action
- **Gallery System**: Grid-based gallery with support for all image orientations (landscape, portrait, square)
- **Advanced Filtering**: Filter artworks by year, accolades, or search by keywords
- **Modal Preview**: Quick view artworks in a modal without leaving the page
- **Individual Artwork Pages**: Dedicated pages for each artwork with full details
- **Metadata Support**: Track title, artist, year, collection, accolades, and descriptions
- **Admin Panel**: User-friendly interface for adding and managing artworks
- **Deep Earthy Red Color Scheme**: Professional aesthetic matching the artist's brand
- **SEO Optimized**: Proper heading structure (single H1 per page) and meta tags

## 📁 Project Structure

```
SandyInglisArtist/
├── index.html              # Main homepage with hero and gallery
├── artwork.html            # Template for individual artwork pages
├── admin.html              # Admin panel for managing artworks
├── css/
│   ├── styles.css          # Main stylesheet
│   ├── artwork.css         # Artwork page specific styles
│   └── admin.css           # Admin panel styles
├── js/
│   ├── app.js              # Main application logic
│   ├── artwork.js          # Artwork page functionality
│   └── admin.js            # Admin panel functionality
├── data/
│   └── artworks.json       # Artwork data storage
├── images/
│   └── artworks/           # Store artwork images here
└── README.md               # This file
```

## 🚀 GitHub Pages Setup

### Initial Setup

1. **Push to GitHub Pages branch**:
   ```bash
   git add .
   git commit -m "Initial website setup"
   git push origin gh-pages
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select the `gh-pages` branch
   - Click "Save"

3. **Custom Domain & SSL (Optional)**:
   - In the same Pages settings, add your custom domain
   - GitHub automatically provisions SSL certificates for custom domains
   - Update your DNS settings with your domain provider:
     - Add a CNAME record pointing to: `chopmike.github.io`
     - Or add A records for GitHub's IP addresses

### Your Site Will Be Available At:
- **Default**: `https://chopmike.github.io/SandyInglisArtist/`
- **Custom Domain**: `https://yourdomain.com` (after DNS setup)

## 📸 Adding Artworks

### Method 1: Using the Admin Panel (Demo)

1. Navigate to `admin.html` on your local site
2. Fill in the artwork details form
3. Upload an image
4. Click "Add Artwork"

**Note**: The admin panel currently uses localStorage for demonstration. For production, you'll need to manually update files (see Method 2).

### Method 2: Manual Addition (Recommended for GitHub Pages)

1. **Add your image** to `images/artworks/` folder

2. **Update `data/artworks.json`**:
   ```json
   {
     "id": 4,
     "title": "Your Artwork Title",
     "artist": "Sandy Inglis",
     "year": 2026,
     "collection": "Contemporary Collection",
     "accolades": "Winner - Best in Show 2026",
     "description": "Oil on canvas, 100x80cm. This piece comes framed...",
     "image": "images/artworks/your-image.jpg"
   }
   ```

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add new artwork"
   git push origin gh-pages
   ```

## 🖼️ Image Guidelines

### Recommended Specifications:
- **Minimum Size**: 1200px on the longest side
- **Format**: JPG, PNG, or WEBP (WEBP recommended)
- **File Size**: Under 2MB for optimal performance
- **Orientation**: Any (landscape, portrait, or square)
- **Quality**: High-resolution with good lighting

### Image Optimization:
Use tools like:
- [TinyPNG](https://tinypng.com/) - Compress PNG/JPG
- [Squoosh](https://squoosh.app/) - Convert to WEBP
- [ImageOptim](https://imageoptim.com/) - Mac optimization tool

### Aspect Ratios:
The gallery uses a flexible grid that preserves aspect ratios. No cropping occurs - images are displayed using `object-fit: cover` in thumbnails and `object-fit: contain` in detail views.

## 🎨 Customization

### Update Colors:
Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary-red: #8B3A3A;
    --deep-red: #6B2828;
    --light-red: #A85454;
    --accent-red: #C97676;
}
```

### Update Contact Information:
Edit the footer section in `index.html`, `artwork.html`, and `admin.html`:
- Email address
- Phone number
- Social media links
- Location

### Update About Section:
Edit the about section in `index.html` to reflect the artist's bio.

### Update Site Name:
Replace "Sandy Inglis" and "SandyInglisArtist" throughout the files with your desired branding.

## 🔧 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Chopmike/SandyInglisArtist.git
   cd SandyInglisArtist
   git checkout gh-pages
   ```

2. **Serve locally** (choose one):
   - Python: `python -m http.server 8000`
   - Node.js: `npx serve`
   - VS Code: Use Live Server extension

3. **View in browser**: `http://localhost:8000`

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🔒 Security Notes

- The admin panel is currently client-side only (demo)
- For production, implement:
  - Backend API for data management
  - Authentication system
  - File upload to cloud storage (AWS S3, Cloudinary, etc.)
  - Server-side image processing

## 🛠️ Future Enhancements

Consider adding:
- [ ] Contact form with email integration
- [ ] Newsletter signup
- [ ] E-commerce integration for selling prints
- [ ] Artwork availability status (Available/Sold)
- [ ] Image zoom functionality
- [ ] Social media sharing buttons
- [ ] Blog/News section
- [ ] Multiple language support
- [ ] Dark mode toggle

## 📄 License

Copyright © 2026 Sandy Inglis Artist. All rights reserved.

## 🤝 Support

For issues or questions, contact: info@sandyinglis.art

---

**Built with ❤️ for artists by artists**
