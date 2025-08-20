// Urban Responder Gallery Configuration
// Easy way to manage your gallery images

const GALLERY_CONFIG = {
    // Transition timing (in milliseconds)
    transitionDuration: 5000,  // 5 seconds between transitions
    fadeDuration: 500,         // 500ms fade transition
    
    // Image folder path
    imagesFolder: 'images/gallery/',
    
    // Supported image formats
    supportedFormats: ['jpg', 'jpeg', 'png', 'webp'],
    
    // Default gallery images (fallback if folder scanning fails)
    defaultImages: [
        {
            src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop',
            alt: 'סימולציית חירום',
            title: 'סימולציית חירום',
            description: 'תרגול מציאותי עם בובות חכמות'
        },
        {
            src: 'https://images.unsplash.com/photo-1604830924571-3b7b74262b1f?q=80&w=800&auto=format&fit=crop',
            alt: 'הדרכה מקצועית',
            title: 'הדרכה מקצועית',
            description: 'מדריכים מנוסים מהשטח'
        },
        {
            src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop',
            alt: 'אימון משפחות',
            title: 'אימון משפחות',
            description: 'הכנה לחירום לכל המשפחה'
        },
        {
            src: 'https://images.unsplash.com/photo-1604830924571-3b7b74262b1f?q=80&w=800&auto=format&fit=crop',
            alt: 'סדנאות ארגוניות',
            title: 'סדנאות ארגוניות',
            description: 'הכשרת עובדים למוכנות חירום'
        },
        {
            src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop',
            alt: 'ציוד מתקדם',
            title: 'ציוד מתקדם',
            description: 'טכנולוגיה מתקדמת לאימונים'
        },
        {
            src: 'https://images.unsplash.com/photo-1604830924571-3b7b74262b1f?q=80&w=800&auto=format&fit=crop',
            alt: 'תרגול קהילתי',
            title: 'תרגול קהילתי',
            description: 'הכנת שכונות וישובים'
        }
    ],
    
    // Hebrew descriptions for different image types
    hebrewDescriptions: {
        'training': 'אימון חירום מקצועי',
        'workshop': 'סדנת מוכנות לחירום',
        'family': 'אימון משפחתי לחירום',
        'equipment': 'ציוד מתקדם לאימונים',
        'community': 'תרגול קהילתי',
        'simulation': 'סימולציית חירום ריאליסטית',
        'instruction': 'הדרכה מקצועית מהשטח',
        'emergency': 'תגובה למצבי חירום',
        'preparedness': 'מוכנות לחירום אורבני',
        'response': 'תגובה מהירה לחירום',
        'whatsapp': 'תמונה מאימון חירום',
        'image': 'תמונה מאימון חירום',
        'recent': 'אימון עדכני לחירום',
        'date': 'תיעוד אימון חירום',
        'wa': 'תמונה מאימון חירום',
        'img': 'תמונה מאימון חירום'
    }
};

// Export for use in main gallery file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GALLERY_CONFIG;
}
