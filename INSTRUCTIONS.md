# 🎨 Sandy Inglis Artist Website - Quick Start Guide

## ✅ What's Been Created

Your modern artist portfolio website is now ready! Here's what you have:

### Website Features:
- ✨ Sleek hero banner with gradient in deep earthy red tones
- 🖼️ Responsive gallery grid supporting all image orientations
- 🔍 Advanced filtering (by year, accolades) and search functionality
- 👁️ Modal quick-view for artworks
- 📄 Individual artwork detail pages
- 📝 Metadata tracking (title, year, collection, accolades, description)
- 🎛️ Admin panel for managing artworks
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Professional color scheme with deep earthy red (#8B3A3A)

## 🚀 Next Steps - Enable GitHub Pages

1. **Go to GitHub Repository Settings:**
   - Navigate to: https://github.com/Chopmike/SandyInglisArtist
   - Click "Settings" tab
   - Click "Pages" in the left sidebar

2. **Configure GitHub Pages:**
   - Under "Source", select branch: `gh-pages`
   - Keep folder as `/ (root)`
   - Click "Save"

3. **Wait 2-5 minutes** for GitHub to build your site

4. **Your site will be live at:**
   - `https://chopmike.github.io/SandyInglisArtist/`

## 🔒 Setting Up SSL Certificate & Custom Domain

### Option A: Use GitHub's Free SSL (Recommended)
GitHub automatically provides free SSL certificates. Once you set up a custom domain:

1. **In GitHub Pages Settings:**
   - Add your custom domain (e.g., `www.sandyinglis.art`)
   - Check "Enforce HTTPS" (appears after DNS propagation)

2. **Update Your DNS Settings** (with your domain provider):
   
   For **subdomain** (www.sandyinglis.art):
   ```
   Type: CNAME
   Host: www
   Value: chopmike.github.io
   ```
   
   For **apex domain** (sandyinglis.art):
   ```
   Type: A Records (add all 4)
   Host: @
   Values:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   ```

3. **Add CNAME file** to your repository:
   Create a file named `CNAME` (no extension) containing:
   ```
   www.sandyinglis.art
   ```

### Option B: Cloudflare (Advanced)
Use Cloudflare as a DNS proxy for additional features like DDoS protection and caching.

## 📸 Adding Your Artworks

### Quick Method (For GitHub Pages):

1. **Prepare Your Images:**
   - Resize to at least 1200px on longest side
   - Optimize file size (under 2MB)
   - Save as JPG, PNG, or WEBP
   - Name descriptively: `sunset-painting-2025.jpg`

2. **Add Images to Folder:**
   - Place images in: `images/artworks/`

3. **Update Artwork Data:**
   - Edit: `data/artworks.json`
   - Add a new entry:
   ```json
   {
     "id": 4,
     "title": "My Artwork Title",
     "artist": "Sandy Inglis",
     "year": 2026,
     "collection": "Spring Collection",
     "accolades": "Winner - Best Contemporary 2026",
     "description": "Oil on canvas, 100x80cm. Framed and ready to hang.",
     "image": "images/artworks/my-artwork.jpg"
   }
   ```

4. **Commit and Push:**
   ```bash
   git add .
   git commit -m "Add new artwork"
   git push origin gh-pages
   ```

5. **Wait 1-2 minutes** for changes to appear live

## 🎨 Image Dimension Guidelines

**Good news!** The gallery is designed to handle ANY dimension beautifully:

- **Landscape** (e.g., 1600x1200): ✅ Perfect
- **Portrait** (e.g., 1200x1600): ✅ Perfect  
- **Square** (e.g., 1200x1200): ✅ Perfect
- **Panoramic** (e.g., 2400x800): ✅ Perfect

### How It Works:
- **Gallery Grid**: Uses `object-fit: cover` - fills the space proportionally
- **Modal View**: Uses `object-fit: contain` - shows full image
- **Detail Pages**: Full image display with proper aspect ratio

**Nothing gets cropped** - images scale intelligently!

## 📝 Customizing Your Website

### Update Contact Details:
Edit the footer in these files:
- `index.html`
- `artwork.html`
- `admin.html`

Look for:
```html
<li>Email: <a href="mailto:info@sandyinglis.art">info@sandyinglis.art</a></li>
<li>Phone: <a href="tel:+61400000000">+61 400 000 000</a></li>
```

### Update Social Media Links:
Find the social media section in footer and replace `#` with actual URLs:
```html
<a href="https://instagram.com/sandyinglis" aria-label="Instagram">
<a href="https://facebook.com/sandyinglis" aria-label="Facebook">
```

### Change Color Scheme:
Edit `css/styles.css` at the top:
```css
:root {
    --primary-red: #8B3A3A;      /* Main brand color */
    --deep-red: #6B2828;         /* Darker shade */
    --light-red: #A85454;        /* Lighter shade */
    --accent-red: #C97676;       /* Accent color */
}
```

### Update About Section:
Edit `index.html`, find the "About Sandy Inglis" section and update the text.

## 🛠️ Using the Admin Panel

The admin panel (`admin.html`) is currently a demo interface. To use it:

1. **Local Development Only:**
   - Open `admin.html` locally
   - Fill in artwork details
   - Upload image
   - Data saves to browser localStorage

2. **To Make Changes Live:**
   - Manually add artworks as described above
   - Or implement a backend API (advanced)

## 📱 Testing Your Website

Before going live, test on:
- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android tablets)
- ✅ Mobile phones (iPhone, Android)
- ✅ Different screen sizes

## 🎯 Current File Structure

```
SandyInglisArtist/
├── index.html          → Homepage with gallery
├── artwork.html        → Individual artwork pages
├── admin.html          → Admin panel (demo)
├── README.md           → Full documentation
├── INSTRUCTIONS.md     → This file!
├── css/
│   ├── styles.css      → Main styles
│   ├── artwork.css     → Artwork page styles
│   └── admin.css       → Admin styles
├── js/
│   ├── app.js          → Main functionality
│   ├── artwork.js      → Artwork page logic
│   └── admin.js        → Admin panel logic
├── data/
│   └── artworks.json   → Artwork database
└── images/
    └── artworks/       → Your artwork images
        ├── sample1.jpg → Sample artwork 1
        ├── sample2.jpg → Sample artwork 2
        └── sample3.jpg → Sample artwork 3
```

## 🚨 Troubleshooting

### Site not loading?
- Check GitHub Pages is enabled in Settings → Pages
- Verify you selected `gh-pages` branch
- Wait 5 minutes after enabling

### Images not showing?
- Check image paths in `artworks.json` are correct
- Ensure images are in `images/artworks/` folder
- Verify image file names match exactly (case-sensitive)

### Filters not working?
- Check browser console for errors (F12)
- Ensure `artworks.json` is valid JSON
- Verify all required fields are present

### Changes not appearing?
- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- Check commit was pushed: `git log`
- Wait 1-2 minutes for GitHub to rebuild

## 📞 Need Help?

- Review the full `README.md` for detailed instructions
- Check GitHub Pages documentation: https://pages.github.com/
- Open browser console (F12) to check for errors

## 🎉 You're All Set!

Your beautiful artist portfolio website is ready to showcase Sandy Inglis's artworks to the world!

Remember to:
1. Enable GitHub Pages in repository settings
2. Add real artwork images and data
3. Update contact information
4. Test on multiple devices
5. Share the link!

**Happy showcasing! 🎨✨**
