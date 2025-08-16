// Urban Responder Gallery Configuration
// Easy way to manage your gallery images

const GALLERY_CONFIG = {
    // Transition timing (in milliseconds)
    transitionDuration: 3000,  // 3 seconds between transitions
    fadeDuration: 500,         // 500ms fade transition
    
    // Image folder path
    imagesFolder: 'images/gallery/',
    
    // Supported image formats
    supportedFormats: ['jpg', 'jpeg', 'png', 'webp'],
    
    // Default gallery images (fallback if folder scanning fails)
    defaultImages: [
        {
            src: 'images/gallery/20231102_163955.jpg',
            alt: 'אימון חירום מקצועי',
            title: 'אימון חירום מקצועי',
            description: 'תרגול מציאותי עם ציוד מתקדם'
        },
        {
            src: 'images/gallery/20231122_135550.jpg',
            alt: 'הדרכה מקצועית',
            title: 'הדרכה מקצועית',
            description: 'מדריכים מנוסים מהשטח'
        },
        {
            src: 'images/gallery/20211019_100602.jpg',
            alt: 'אימון משפחות',
            title: 'אימון משפחתי',
            description: 'הכנה לחירום לכל המשפחה'
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
        'response': 'תגובה מהירה לחירום'
    }
};

// Export for use in main gallery file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GALLERY_CONFIG;
}
