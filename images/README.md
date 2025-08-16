# Images Folder for Urban Responder Gallery

## 📁 Folder Structure

```
images/
├── README.md                    # This file
├── gallery/                     # Main gallery images
│   ├── training-1.jpg          # Emergency simulation training
│   ├── training-2.jpg          # Professional instruction
│   ├── training-3.jpg          # Family training
│   ├── training-4.jpg          # Organizational workshops
│   ├── training-5.jpg          # Advanced equipment
│   └── training-6.jpg          # Community practice
└── thumbnails/                 # Optimized thumbnail versions (optional)
    ├── training-1-thumb.jpg
    ├── training-2-thumb.jpg
    └── ...
```

## 🖼️ How to Add Images

### **Step 1: Prepare Your Images**
1. **Download images** from your Google Photos album
2. **Rename them** descriptively (e.g., `training-1.jpg`, `workshop-2.jpg`)
3. **Optimize them** for web (recommended size: 800x600px, under 200KB)

### **Step 2: Place Images in Folder**
- **Put all images** in the `images/gallery/` folder
- **Use consistent naming** for easy management
- **Supported formats**: JPG, PNG, WebP

### **Step 3: Update Configuration**
The JavaScript will automatically detect and load images from this folder.

## 🎯 Image Naming Convention

### **Recommended Format**
```
[category]-[number].[extension]
```

### **Examples**
- `training-1.jpg` - First training image
- `workshop-2.jpg` - Second workshop image
- `equipment-3.jpg` - Third equipment image
- `family-4.jpg` - Fourth family training image

## 📏 Image Specifications

### **Optimal Dimensions**
- **Width**: 800-1200 pixels
- **Height**: 600-900 pixels
- **Aspect ratio**: 4:3 or 16:9 recommended
- **File size**: Under 200KB for fast loading

### **Content Guidelines**
- Show real training activities
- Include diverse participants
- Demonstrate professional equipment
- Capture emergency scenarios
- Show family and community involvement

## 🔄 Automatic Detection

The gallery system will:
- **Scan the images folder** automatically
- **Load all supported images** (JPG, PNG, WebP)
- **Generate thumbnails** if needed
- **Create descriptions** based on filenames
- **Handle missing images** gracefully

## 📱 Responsive Images

Images will automatically:
- **Scale to fit** different screen sizes
- **Maintain aspect ratio** on all devices
- **Load optimized versions** for mobile
- **Support lazy loading** for performance

---

**Note**: Just drop your images in the `images/gallery/` folder and the gallery will automatically include them!
