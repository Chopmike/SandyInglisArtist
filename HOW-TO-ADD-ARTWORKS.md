# 🔧 How to Add Artworks and See Them on GitHub Pages

## ⚠️ IMPORTANT: Understanding localStorage vs. GitHub

The admin panel you used saves data to **browser localStorage** which is:
- ❌ Only stored in YOUR browser on YOUR computer
- ❌ NOT saved to any files in the repository
- ❌ NOT visible on GitHub Pages or other computers
- ❌ Lost if you clear browser cache

**To make artworks appear on GitHub Pages, you must manually update files!**

---

## 📋 Method 1: Extract Data You Already Added Locally

### Step 1: Extract Your Data
1. **Open the file:** `extract-data.html` (I just created it and opened it for you)
2. Click "Extract Data from localStorage"
3. If you see artworks listed, click "**Copy to Clipboard**" or "**Download as File**"

### Step 2: Update artworks.json
1. Open `data/artworks.json` in VS Code
2. Replace ALL contents with the data you copied
3. Save the file

### Step 3: Add Your Artwork Images
Your images are still only in browser memory. You need to:
1. Find the actual image files on your computer
2. Copy them to: `images/artworks/` folder
3. Make sure filenames match what's in the JSON

### Step 4: Push to GitHub
```bash
git add .
git commit -m "Add new artworks"
git push origin gh-pages
```

### Step 5: Wait & Refresh
- Wait 1-2 minutes for GitHub Pages to rebuild
- Visit: https://chopmike.github.io/SandyInglisArtist/
- Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)

---

## 📝 Method 2: Add Artworks Manually (RECOMMENDED)

This is the proper way to add artworks for GitHub Pages:

### Step 1: Prepare Your Image
1. Find/create your artwork image
2. Resize it (recommended: 1200px+ on longest side)
3. Optimize file size (under 2MB)
4. Name it descriptively: `artwork-name-2026.jpg`

### Step 2: Add Image to Folder
1. Copy your image to: `images/artworks/your-artwork-name.jpg`

### Step 3: Edit artworks.json
Open `data/artworks.json` and add your artwork:

```json
[
  {
    "id": 1,
    "title": "Sunset Dreams",
    "artist": "Sandy Inglis",
    "year": 2025,
    "collection": "Contemporary Collection",
    "accolades": "Winner - Best Contemporary Art 2025",
    "description": "Oil on canvas, 90x120cm. This piece comes framed and ready to hang.",
    "image": "images/artworks/sample1.jpg"
  },
  {
    "id": 4,
    "title": "YOUR NEW ARTWORK TITLE",
    "artist": "Sandy Inglis",
    "year": 2026,
    "collection": "Spring Collection",
    "accolades": "Winner - Excellence Award 2026",
    "description": "Oil on canvas, 120x90cm. Unframed. Beautiful landscape piece.",
    "image": "images/artworks/your-artwork-name.jpg"
  }
]
```

**Important:** 
- Each artwork needs a unique `id` (increment from last one)
- Ensure comma between artworks (except after the last one)
- Path must match actual file location

### Step 4: Commit and Push
```bash
git add data/artworks.json
git add images/artworks/your-artwork-name.jpg
git commit -m "Add new artwork: YOUR ARTWORK TITLE"
git push origin gh-pages
```

### Step 5: Verify Online
- Wait 1-2 minutes
- Visit: https://chopmike.github.io/SandyInglisArtist/
- Your new artwork should appear!

---

## 🔍 Troubleshooting

### Issue: "I don't see my changes on GitHub Pages"

**Solution:**
```bash
# Check what's committed
git status

# If files are uncommitted, add them
git add .
git commit -m "Add artworks"
git push origin gh-pages

# Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

### Issue: "Images don't appear"

**Check:**
1. ✅ Image file is in `images/artworks/` folder
2. ✅ Filename in JSON matches actual filename (case-sensitive!)
3. ✅ Path in JSON starts with `images/artworks/`
4. ✅ Image was committed and pushed to GitHub

**Verify on GitHub:**
- Go to: https://github.com/Chopmike/SandyInglisArtist/tree/gh-pages/images/artworks
- You should see your images listed

### Issue: "Gallery shows empty or old data"

**Solution:**
```bash
# Check artworks.json is correct
cat data/artworks.json

# Make sure it's pushed
git log --oneline -5

# Force browser cache clear
# In browser: Cmd+Shift+R or Ctrl+Shift+R
```

---

## 📊 Current Workflow

### ❌ What DOESN'T Work:
```
Admin Panel → localStorage → ??? → GitHub Pages
                ↑
           (Stuck here - never reaches GitHub!)
```

### ✅ What DOES Work:
```
1. Edit files locally (artworks.json + images)
2. Git add, commit, push
3. GitHub Pages updates
4. Live site shows changes!
```

---

## 🎯 Quick Reference Commands

### Check what needs to be pushed:
```bash
git status
```

### Add all changes:
```bash
git add .
```

### Commit changes:
```bash
git commit -m "Add new artworks"
```

### Push to GitHub Pages:
```bash
git push origin gh-pages
```

### See last 5 commits:
```bash
git log --oneline -5
```

### Check current branch:
```bash
git branch
```

---

## 💡 Pro Tips

1. **Always use descriptive commit messages:**
   ```bash
   git commit -m "Add 'Mountain Sunrise' artwork to collection"
   ```

2. **Test locally before pushing:**
   - Open `index.html` locally
   - Verify artwork appears
   - Then push to GitHub

3. **Keep backups of artworks.json:**
   - Copy it before making major changes
   - Can revert if something breaks

4. **Image optimization tools:**
   - TinyPNG: https://tinypng.com/
   - Squoosh: https://squoosh.app/
   - ImageOptim (Mac): https://imageoptim.com/

5. **Batch add multiple artworks:**
   - Update JSON with all new artworks
   - Copy all images to folder
   - One commit for everything

---

## 🆘 Need Help?

If you're still having issues:

1. Check git status: `git status`
2. Check what's on GitHub: https://github.com/Chopmike/SandyInglisArtist/tree/gh-pages
3. Check browser console for errors: `F12` → Console tab
4. Try incognito/private browsing to rule out cache issues

---

**Remember:** The admin panel is a UI demo only. For GitHub Pages, you must manually update files and push them! 🚀
