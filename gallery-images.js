// Urban Responder Dynamic Gallery
// This file manages the automatic image cycling in the gallery

class DynamicGallery {
    constructor() {
        this.currentIndex = 0;
        this.isExpanded = false;
        this.initialImageCount = 3;
        
        // Use configuration if available, otherwise use defaults
        if (typeof GALLERY_CONFIG !== 'undefined') {
            this.images = GALLERY_CONFIG.defaultImages;
            this.transitionDuration = GALLERY_CONFIG.transitionDuration;
            this.fadeDuration = GALLERY_CONFIG.fadeDuration;
            this.imagesFolder = GALLERY_CONFIG.imagesFolder;
            this.supportedFormats = GALLERY_CONFIG.supportedFormats;
            this.hebrewDescriptions = GALLERY_CONFIG.hebrewDescriptions;
        } else {
            // Fallback defaults
            this.images = [
                {
                    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400&auto=format&fit=crop',
                    alt: 'סימולציית חירום',
                    title: 'סימולציית חירום',
                    description: 'תרגול מציאותי עם בובות חכמות'
                },
                {
                    src: 'https://images.unsplash.com/photo-1604830924571-3b7b74262b1f?q=80&w=400&auto=format&fit=crop',
                    alt: 'הדרכה מקצועית',
                    title: 'הדרכה מקצועית',
                    description: 'מדריכים מנוסים מהשטח'
                }
            ];
            this.transitionDuration = 3000;
            this.fadeDuration = 500;
            this.imagesFolder = 'images/gallery/';
            this.supportedFormats = ['jpg', 'jpeg', 'png', 'webp'];
            this.hebrewDescriptions = {};
        }
        
        this.interval = null;
        
        this.init();
    }
    
    async init() {
        await this.scanImagesFolder();
        this.createGallery();
        this.startAutoPlay();
        this.addEventListeners();
    }
    
    async scanImagesFolder() {
        console.log('Scanning images folder:', this.imagesFolder);
        
        try {
            // Try to fetch the images folder listing from PHP script first
            let response = await fetch(this.imagesFolder + 'index.php');
            console.log('PHP response status:', response.status);
            if (response.ok) {
                const html = await response.text();
                console.log('PHP HTML received:', html.substring(0, 200) + '...');
                const imageFiles = this.extractImageFiles(html);
                console.log('Extracted image files:', imageFiles);
                if (imageFiles.length > 0) {
                    this.images = this.createImageObjects(imageFiles);
                    console.log(`Found ${this.images.length} images via PHP`);
                    return;
                }
            }
        } catch (error) {
            console.log('PHP error:', error.message);
        }
        
        try {
            // Fallback to HTML file if PHP is not available
            const response = await fetch(this.imagesFolder + 'images-list.html');
            console.log('HTML response status:', response.status);
            if (response.ok) {
                const html = await response.text();
                console.log('HTML received:', html.substring(0, 200) + '...');
                const imageFiles = this.extractImageFiles(html);
                console.log('Extracted image files from HTML:', imageFiles);
                if (imageFiles.length > 0) {
                    this.images = this.createImageObjects(imageFiles);
                    console.log(`Found ${this.images.length} images via HTML`);
                    return;
                }
            }
        } catch (error) {
            console.log('HTML error:', error.message);
        }
        
        try {
            // Try sample images file as last resort
            const response = await fetch(this.imagesFolder + 'sample-images.html');
            console.log('Sample images response status:', response.status);
            if (response.ok) {
                const html = await response.text();
                console.log('Sample images HTML received:', html.substring(0, 200) + '...');
                const imageFiles = this.extractImageFiles(html);
                console.log('Extracted sample image files:', imageFiles);
                if (imageFiles.length > 0) {
                    this.images = this.createImageObjects(imageFiles);
                    console.log(`Found ${this.images.length} sample images`);
                    return;
                }
            }
        } catch (error) {
            console.log('Sample images error:', error.message);
        }
        
        try {
            // Try actual working images file
            const response = await fetch(this.imagesFolder + 'actual-images.html');
            console.log('Actual images response status:', response.status);
            if (response.ok) {
                const html = await response.text();
                console.log('Actual images HTML received:', html.substring(0, 200) + '...');
                const imageFiles = this.extractImageFiles(html);
                console.log('Extracted actual image files:', imageFiles);
                if (imageFiles.length > 0) {
                    this.images = this.createImageObjects(imageFiles);
                    console.log(`Found ${this.images.length} actual images`);
                    return;
                }
            }
        } catch (error) {
            console.log('Actual images error:', error.message);
        }
        
        // If no images found, try to load some sample images
        console.log('No images found in folder, using sample images');
        this.loadSampleImages();
        
        // Also try to load from config if available
        if (typeof GALLERY_CONFIG !== 'undefined' && GALLERY_CONFIG.defaultImages) {
            console.log('Loading images from config as fallback');
            this.images = GALLERY_CONFIG.defaultImages;
        }
    }
    
    loadSampleImages() {
        // Load some sample images that we know exist
        this.images = [
            {
                src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400&auto=format&fit=crop',
                alt: 'סימולציית חירום',
                title: 'סימולציית חירום',
                description: 'תרגול מציאותי עם בובות חכמות'
            },
            {
                src: 'https://images.unsplash.com/photo-1604830924571-3b7b74262b1f?q=80&w=400&auto=format&fit=crop',
                alt: 'הדרכה מקצועית',
                title: 'הדרכה מקצועית',
                description: 'מדריכים מנוסים מהשטח'
            },
            {
                src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400&auto=format&fit=crop',
                alt: 'אימון משפחות',
                title: 'אימון משפחות',
                description: 'הכנה לחירום לכל המשפחה'
            },
            {
                src: 'https://images.unsplash.com/photo-1604830924571-3b7b74262b1f?q=80&w=400&auto=format&fit=crop',
                alt: 'סדנאות ארגוניות',
                title: 'סדנאות ארגוניות',
                description: 'הכשרת עובדים למוכנות חירום'
            }
        ];
        console.log('Loaded sample images:', this.images.length);
    }
    
    extractImageFiles(html) {
        const imageFiles = [];
        
        // Parse the PHP output to find image files
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const imageElements = doc.querySelectorAll('.image-file');
        
        imageElements.forEach(element => {
            const filename = element.textContent.trim();
            if (filename) {
                imageFiles.push(filename);
            }
        });
        
        return imageFiles.sort();
    }
    
    createImageObjects(imageFiles) {
        return imageFiles.map((filename, index) => {
            const name = filename.split('.')[0];
            const category = this.detectCategory(name);
            const description = this.hebrewDescriptions[category] || 'תמונה מאימון חירום';
            
            return {
                src: this.imagesFolder + filename,
                alt: description,
                title: this.generateHebrewTitle(category, index + 1),
                description: description
            };
        });
    }
    
    detectCategory(filename) {
        const lowerFilename = filename.toLowerCase();
        
        // Check for WhatsApp images
        if (lowerFilename.includes('whatsapp') || lowerFilename.includes('wa')) return 'whatsapp';
        
        // Check for IMG files
        if (lowerFilename.includes('img')) return 'image';
        
        // Check for date-based files (2021, 2022, 2023, 2024)
        if (lowerFilename.includes('2021') || lowerFilename.includes('2022') || 
            lowerFilename.includes('2023') || lowerFilename.includes('2024')) {
            return 'date';
        }
        
        // Check for specific training types
        if (lowerFilename.includes('training')) return 'training';
        if (lowerFilename.includes('workshop')) return 'workshop';
        if (lowerFilename.includes('family')) return 'family';
        if (lowerFilename.includes('equipment')) return 'equipment';
        if (lowerFilename.includes('community')) return 'community';
        if (lowerFilename.includes('simulation')) return 'simulation';
        if (lowerFilename.includes('instruction')) return 'instruction';
        if (lowerFilename.includes('emergency')) return 'emergency';
        if (lowerFilename.includes('preparedness')) return 'preparedness';
        if (lowerFilename.includes('response')) return 'response';
        
        // Default category
        return 'training';
    }
    
    generateHebrewTitle(category, number) {
        const titles = {
            'training': 'אימון חירום',
            'workshop': 'סדנת מוכנות',
            'family': 'אימון משפחתי',
            'equipment': 'ציוד מתקדם',
            'community': 'תרגול קהילתי',
            'simulation': 'סימולציית חירום',
            'instruction': 'הדרכה מקצועית',
            'emergency': 'תגובה לחירום',
            'preparedness': 'מוכנות לחירום',
            'response': 'תגובה מהירה',
            'whatsapp': 'תמונה מאימון חירום',
            'image': 'תמונה מאימון חירום',
            'date': 'תיעוד אימון חירום'
        };
        
        return `${titles[category] || 'אימון'} ${number}`;
    }
    
    createGallery() {
        const galleryContainer = document.querySelector('.gallery-grid');
        if (!galleryContainer) return;
        
        // Clear existing content
        galleryContainer.innerHTML = '';
        
        if (this.images.length === 0) {
            // Show message if no images found
            galleryContainer.innerHTML = `
                <div style="text-align:center;padding:40px;color:#6c757d;">
                    <h3>אין תמונות זמינות</h3>
                    <p>אנא הוסף תמונות לתיקיית images/gallery/</p>
                    <p style="font-size:14px;margin-top:20px;">
                        <strong>הוראות:</strong><br>
                        1. הוסף תמונות לתיקיית images/gallery/<br>
                        2. או ערוך את gallery-config.js עם URLs של תמונות<br>
                        3. רענן את הדף
                    </p>
                </div>
            `;
            return;
        }
        
        // Determine how many images to show
        const imagesToShow = this.isExpanded ? this.images.length : Math.min(this.initialImageCount, this.images.length);
        
        // Create gallery items
        for (let i = 0; i < imagesToShow; i++) {
            const galleryItem = this.createGalleryItem(this.images[i], i);
            galleryContainer.appendChild(galleryItem);
        }
        
        // Add expand/collapse button if there are more than 3 images
        if (this.images.length > this.initialImageCount) {
            this.addExpandButton(galleryContainer);
        }
        
        // Add a subtle indicator of how many images are shown vs total
        if (!this.isExpanded && this.images.length > this.initialImageCount) {
            const indicator = document.createElement('div');
            indicator.style.textAlign = 'center';
            indicator.style.marginTop = '15px';
            indicator.style.color = '#6c757d';
            indicator.style.fontSize = '14px';
            indicator.style.direction = 'ltr'; // Force left-to-right for indicator
            indicator.textContent = `מציג ${imagesToShow} מתוך ${this.images.length} תמונות`;
            galleryContainer.appendChild(indicator);
        }
    }
    
    createGalleryItem(image, index) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.opacity = index === 0 ? '1' : '0.3';
        item.style.transform = index === 0 ? 'scale(1)' : 'scale(0.9)';
        item.style.transition = `all ${this.fadeDuration}ms ease-in-out`;
        item.style.display = 'block'; // Ensure all items are visible
        
        item.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" loading="lazy" style="width:100%;height:250px;object-fit:cover;">
            <div class="gallery-overlay">
                <h4>${image.title}</h4>
                <p>${image.description}</p>
            </div>
        `;
        
        return item;
    }
    
    startAutoPlay() {
        this.interval = setInterval(() => {
            this.nextImage();
        }, this.transitionDuration);
    }
    
    stopAutoPlay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    nextImage() {
        const items = document.querySelectorAll('.gallery-item');
        if (items.length === 0) return;
        
        // Fade out current image
        items[this.currentIndex].style.opacity = '0.3';
        items[this.currentIndex].style.transform = 'scale(0.9)';
        
        // Move to next image (cycling through visible images)
        this.currentIndex = (this.currentIndex + 1) % items.length;
        
        // Fade in new image
        items[this.currentIndex].style.opacity = '1';
        items[this.currentIndex].style.transform = 'scale(1)';
    }
    
    previousImage() {
        const items = document.querySelectorAll('.gallery-item');
        if (items.length === 0) return;
        
        // Fade out current image
        items[this.currentIndex].style.opacity = '0.3';
        items[this.currentIndex].style.transform = 'scale(0.9)';
        
        // Move to previous image (cycling through visible images)
        this.currentIndex = (this.currentIndex - 1 + items.length) % items.length;
        
        // Fade in new image
        items[this.currentIndex].style.opacity = '1';
        items[this.currentIndex].style.transform = 'scale(1)';
    }
    
    goToImage(index) {
        const items = document.querySelectorAll('.gallery-item');
        if (items.length === 0 || index < 0 || index >= items.length) return;
        
        // Fade out current image
        items[this.currentIndex].style.opacity = '0.3';
        items[this.currentIndex].style.transform = 'scale(0.9)';
        
        // Set new current index
        this.currentIndex = index;
        
        // Fade in new image
        items[this.currentIndex].style.opacity = '1';
        items[this.currentIndex].style.transform = 'scale(1)';
    }
    
    addEventListeners() {
        // Pause auto-play on hover (only when not expanded)
        const galleryContainer = document.querySelector('.gallery-grid');
        if (galleryContainer) {
            galleryContainer.addEventListener('mouseenter', () => {
                if (!this.isExpanded) {
                    this.stopAutoPlay();
                }
            });
            
            galleryContainer.addEventListener('mouseleave', () => {
                if (!this.isExpanded) {
                    this.startAutoPlay();
                }
            });
        }
        
        // Add click navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousImage();
            } else if (e.key === 'ArrowRight') {
                this.nextImage();
            }
        });
    }
    
    // Method to reset gallery to initial state
    resetGallery() {
        this.isExpanded = false;
        this.currentIndex = 0;
        this.createGallery();
        this.startAutoPlay();
    }
    
    // Method to add new images dynamically
    addImage(imageData) {
        this.images.push(imageData);
        this.createGallery();
    }
    
    // Method to remove image by index
    removeImage(index) {
        if (index >= 0 && index < this.images.length) {
            this.images.splice(index, 1);
            this.createGallery();
        }
    }
    
    // Method to update transition duration
    setTransitionDuration(duration) {
        this.transitionDuration = duration;
        if (this.interval) {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    }

    addExpandButton(galleryContainer) {
        const expandButton = document.createElement('div');
        expandButton.style.textAlign = 'center';
        expandButton.style.marginTop = '30px';
        expandButton.style.marginBottom = '20px';
        expandButton.style.direction = 'ltr'; // Force left-to-right for button container
        
        const button = document.createElement('button');
        button.className = 'btn';
        button.style.margin = '0 auto'; // Center the button
        button.style.padding = '15px 30px';
        button.style.fontSize = '16px';
        button.style.fontWeight = '600';
        button.style.border = 'none';
        button.style.borderRadius = '14px';
        button.style.color = '#ffffff';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.3s ease';
        button.style.display = 'block'; // Ensure block display for margin auto to work
        
        if (this.isExpanded) {
            button.textContent = 'הצג פחות תמונות';
            button.style.background = 'linear-gradient(135deg, #6c757d, #495057)';
            button.style.boxShadow = '0 4px 15px rgba(108, 117, 125, 0.3)';
        } else {
            button.textContent = `הצג עוד תמונות (${this.images.length - this.initialImageCount})`;
            button.style.background = 'linear-gradient(135deg, #dc3545, #fd7e14)';
            button.style.boxShadow = '0 4px 15px rgba(220, 53, 69, 0.3), 0 0 20px rgba(253, 126, 20, 0.6)';
        }
        
        button.addEventListener('click', () => {
            this.toggleExpand();
        });
        
        expandButton.appendChild(button);
        galleryContainer.appendChild(expandButton);
    }
    
    toggleExpand() {
        this.isExpanded = !this.isExpanded;
        
        // Update auto-play for expanded view
        if (this.isExpanded) {
            this.stopAutoPlay();
            // Don't auto-play when expanded to avoid overwhelming users
        } else {
            this.startAutoPlay();
        }
        
        // Recreate gallery to update button and layout
        this.createGallery();
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.urbanResponderGallery = new DynamicGallery();
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DynamicGallery;
}
