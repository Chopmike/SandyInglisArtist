# 📸 Bulk Image Upload Guide

## ✅ What's Been Updated

1. **Footer Details Updated:**
   - ✉️ Email: sandy@chasedesign.com
   - 📞 Phone: 0419 488 626
   - 📍 Location: Sydney, Australia
   - 📱 Instagram: https://www.instagram.com/sandyinglisartist/
   - 📘 Facebook: https://www.facebook.com/sandra.inglis.5
   - 💼 LinkedIn: https://www.linkedin.com/in/sandy-inglis-artist/
   - ❌ Pinterest removed

2. **Font Changed:**
   - Now using SF Pro Text (Apple's system font)
   - Falls back to Helvetica Neue on non-Apple devices
   - Removed Google Fonts dependency for faster loading

3. **New Tool Created:**
   - `bulk-upload.html` - Batch image processor!

---

## 🚀 How to Bulk Upload All Your Images

### Step 1: Prepare Your Images

1. **Gather all your artwork images** in one folder on your computer
2. **Name them descriptively:** 
   - Good: `sunset-beach-painting-2025.jpg`
   - Good: `mountain-landscape.jpg`
   - Bad: `IMG_1234.jpg`

3. **Optimize if needed:**
   - Resize to at least 1200px on longest side
   - Keep under 2MB each
   - Use JPG, PNG, or WEBP format

### Step 2: Copy Images to Project

1. **Copy ALL your images** to:
   ```
   images/artworks/
   ```

2. **Verify they're there:**
   - Navigate to the folder in Finder
   - You should see all your images

### Step 3: Generate JSON with Bulk Upload Tool

1. **Open the bulk upload tool:**
   - Double-click: `bulk-upload.html`
   - OR I'll open it for you now!

2. **Select your images:**
   - Click the upload area
   - Navigate to `images/artworks/` folder
   - Select ALL images at once (Cmd+A)
   - Click "Open"

3. **Generate JSON:**
   - Review the grid preview of your images
   - Click "Generate JSON"
   - JSON code will be automatically copied to clipboard!

### Step 4: Update artworks.json

1. **Open:** `data/artworks.json` in VS Code

2. **Paste the generated JSON:**
   - Replace everything with what was copied
   - OR add new entries to existing ones

3. **Customize the data:**
   - Update titles (auto-generated from filenames)
   - Update years
   - Add collections
   - Add accolades
   - Add descriptions

Example:
```json
[
  {
    "id": 1,
    "title": "Coastal Sunrise",
    "artist": "Sandy Inglis",
    "year": 2025,
    "collection": "Australian Landscapes",
    "accolades": "Winner - Best Landscape 2025",
    "description": "Oil on canvas, 120x90cm. Framed. Captures the golden light of dawn breaking over the Pacific Ocean.",
    "image": "images/artworks/coastal-sunrise.jpg"
  },
  {
    "id": 2,
    "title": "Urban Dreams",
    "artist": "Sandy Inglis",
    "year": 2024,
    "collection": "City Series",
    "accolades": "Highly Commended",
    "description": "Acrylic on canvas, 100x100cm. Unframed. Abstract interpretation of Sydney's vibrant energy.",
    "image": "images/artworks/urban-dreams.jpg"
  }
]
```

### Step 5: Push to GitHub

```bash
git add .
git commit -m "Add complete artwork collection"
git push origin gh-pages
```

### Step 6: Wait & View

- Wait 1-2 minutes for GitHub Pages to rebuild
- Visit: https://chopmike.github.io/SandyInglisArtist/
- Hard refresh: **Cmd + Shift + R**
- All your artworks should now appear! 🎉

---

## 📋 Quick Checklist

Before pushing to GitHub, verify:

- [ ] All images are in `images/artworks/` folder
- [ ] All filenames match exactly in `artworks.json`
- [ ] Each artwork has a unique ID
- [ ] All required fields are filled (id, title, artist, year, image)
- [ ] JSON is valid (no missing commas or brackets)
- [ ] You've tested locally first

---

## 🎨 Image Display Grid

The gallery automatically displays images in a responsive grid:

- **Desktop:** 4 columns
- **Tablet:** 3 columns  
- **Mobile:** 1 column

All orientations work perfectly:
- Landscape (horizontal)
- Portrait (vertical)
- Square
- Panoramic

The grid uses `object-fit: cover` for thumbnails, so images fill their space beautifully without distortion.

---

## 💡 Pro Tips

1. **Batch process images first:**
   - Use ImageOptim (Mac) or TinyPNG (web) to optimize all images at once
   - This reduces file sizes while maintaining quality

2. **Use consistent naming:**
   - `artwork-name-year.jpg`
   - Makes it easier to track and organize

3. **Test with a few images first:**
   - Upload 3-5 images
   - Verify they appear correctly
   - Then upload the rest

4. **Keep backups:**
   - Save a copy of your original high-res images elsewhere
   - Keep a backup of `artworks.json` before major changes

5. **Update in batches:**
   - Group similar artworks (by collection, year, etc.)
   - Makes it easier to manage metadata

---

## 🔧 Troubleshooting

### Images don't appear on website

**Check:**
1. Images are in `images/artworks/` folder
2. Filenames in JSON match actual files (case-sensitive!)
3. Paths start with `images/artworks/`
4. Files were committed and pushed to GitHub
5. You hard-refreshed the browser

### JSON errors

**Common issues:**
- Missing comma between artworks
- Extra comma after last artwork
- Missing quotes around strings
- Mismatched brackets

**Fix:**
- Use a JSON validator: https://jsonlint.com/
- Paste your JSON and check for errors

### File size too large

**Solution:**
- Optimize images with TinyPNG: https://tinypng.com/
- Or Squoosh: https://squoosh.app/
- Target: Under 2MB per image

---

## 📞 Current Contact Info (Updated on Website)

- Email: sandy@chasedesign.com
- Phone: 0419 488 626
- Location: Sydney, Australia
- Instagram: @sandyinglisartist
- Facebook: sandra.inglis.5
- LinkedIn: sandy-inglis-artist

---

## 🎯 What's Next?

After bulk uploading:

1. Customize titles and descriptions
2. Add accolades to award-winning pieces
3. Organize into collections
4. Test filters to ensure they work
5. Share your beautiful website! 🌟

**Your website will automatically display all images in a beautiful, responsive grid!**
