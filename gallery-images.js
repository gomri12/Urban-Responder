// Urban Responder Dynamic Gallery
// This file manages the automatic image cycling in the gallery

class DynamicGallery {
    constructor() {
        this.currentIndex = 0;
        
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
        
        // If no images found, load from config as fallback
        if (typeof GALLERY_CONFIG !== 'undefined' && GALLERY_CONFIG.defaultImages) {
            console.log('Loading images from config as fallback');
            this.images = GALLERY_CONFIG.defaultImages;
        } else {
            console.log('No images found, loading sample images');
            this.loadSampleImages();
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
        if (lowerFilename.includes('wa')) return 'whatsapp';
        if (lowerFilename.includes('img')) return 'image';
        if (lowerFilename.includes('2021') || lowerFilename.includes('2022') || lowerFilename.includes('2023') || lowerFilename.includes('2024')) return 'recent';
        return 'training'; // default category
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
            'whatsapp': 'תמונה מאימון',
            'image': 'תמונה מאימון',
            'recent': 'אימון עדכני'
        };
        
        return `${titles[category] || 'אימון'} ${number}`;
    }
    
    createGallery() {
        const galleryContainer = document.querySelector('.gallery-grid');
        if (!galleryContainer) return;
        
        // Clear existing content
        galleryContainer.innerHTML = '';
        

        
        // Create gallery items
        this.images.forEach((image, index) => {
            const galleryItem = this.createGalleryItem(image, index);
            galleryContainer.appendChild(galleryItem);
        });
    }
    
    createGalleryItem(image, index) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.opacity = index === 0 ? '1' : '0.3';
        item.style.transform = index === 0 ? 'scale(1)' : 'scale(0.9)';
        item.style.transition = `all ${this.fadeDuration}ms ease-in-out`;
        
        item.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" loading="lazy">
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
        
        // Move to random image (avoiding current one)
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * items.length);
        } while (newIndex === this.currentIndex && items.length > 1);
        
        this.currentIndex = newIndex;
        
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
        
        // Move to random image (avoiding current one)
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * items.length);
        } while (newIndex === this.currentIndex && items.length > 1);
        
        this.currentIndex = newIndex;
        
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
        // Pause auto-play on hover
        const galleryContainer = document.querySelector('.gallery-grid');
        if (galleryContainer) {
            galleryContainer.addEventListener('mouseenter', () => {
                this.stopAutoPlay();
            });
            
            galleryContainer.addEventListener('mouseleave', () => {
                this.startAutoPlay();
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
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.urbanResponderGallery = new DynamicGallery();
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DynamicGallery;
}
