#!/bin/bash
# Image Processor for Sandy Inglis Artist Website
# This script resizes images to max 1200px width and compresses for web
# 
# USAGE:
# 1. Export images from Photos app to a folder (e.g., ~/Desktop/ArtworkExport)
# 2. Open Terminal
# 3. Run: bash /path/to/process-images.sh ~/Desktop/ArtworkExport
#
# The processed images will be saved to a new folder called "web-ready"

# Use provided folder or default to Sandy's Mac location
if [ -z "$1" ]; then
    INPUT_DIR="/Users/sandyinglis/Desktop/ArtworkExport"
    echo "ℹ️  No folder specified, using default: $INPUT_DIR"
else
    INPUT_DIR="$1"
fi
OUTPUT_DIR="${INPUT_DIR}/web-ready"

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "🖼️  Sandy Inglis Artist - Image Processor"
echo "=========================================="
echo "📂 Input folder: $INPUT_DIR"
echo "📂 Output folder: $OUTPUT_DIR"
echo ""

# Check if sips is available (built into macOS)
if ! command -v sips &> /dev/null; then
    echo "❌ sips command not found. This script requires macOS."
    exit 1
fi

# Process each image
count=0
for img in "$INPUT_DIR"/*.{jpg,jpeg,JPG,JPEG,png,PNG,heic,HEIC}; do
    # Skip if no matches
    [ -e "$img" ] || continue
    
    filename=$(basename "$img")
    name="${filename%.*}"
    
    # Convert HEIC to JPG, otherwise keep original format
    if [[ "${filename,,}" == *.heic ]]; then
        output_file="$OUTPUT_DIR/${name}.jpg"
        ext="jpg"
    else
        ext="${filename##*.}"
        ext="${ext,,}"  # lowercase
        if [ "$ext" = "jpeg" ]; then ext="jpg"; fi
        output_file="$OUTPUT_DIR/${name}.${ext}"
    fi
    
    echo "Processing: $filename"
    
    # Copy file first
    cp "$img" "$output_file"
    
    # Get current width
    current_width=$(sips -g pixelWidth "$output_file" | tail -1 | awk '{print $2}')
    
    # Resize if wider than 1200px
    if [ "$current_width" -gt 1200 ]; then
        sips --resampleWidth 1200 "$output_file" > /dev/null 2>&1
        echo "  ✓ Resized from ${current_width}px to 1200px"
    else
        echo "  ✓ Width OK (${current_width}px)"
    fi
    
    # Get file size
    size_before=$(stat -f%z "$img")
    size_after=$(stat -f%z "$output_file")
    
    # Calculate percentage reduction
    if [ "$size_before" -gt 0 ]; then
        reduction=$((100 - (size_after * 100 / size_before)))
        echo "  ✓ Size: $(echo "scale=1; $size_after/1024/1024" | bc)MB (${reduction}% smaller)"
    fi
    
    ((count++))
done

echo ""
echo "=========================================="
echo "✅ Processed $count images"
echo "📂 Web-ready images saved to: $OUTPUT_DIR"
echo ""
echo "Next steps:"
echo "1. Upload images to Azure Blob Storage (artworks/ folder)"
echo "2. Use the Bulk Upload tool to generate JSON entries"
echo "3. Add metadata (collection, description, availability)"
