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
            src: 'images/gallery/20231102_163955.jpg',
            alt: 'אימון חירום מקצועי',
            title: 'אימון חירום מקצועי',
            description: 'תרגול מציאותי עם ציוד מתקדם'
        },
        {
            src: 'images/gallery/20221111_092116.jpg',
            alt: 'הדרכה מקצועית',
            title: 'הדרכה מקצועית',
            description: 'מדריכים מנוסים מהשטח'
        },
        {
            src: 'images/gallery/WhatsApp Image 2024-05-11 at 20.17.58 (1).jpeg',
            alt: 'אימון משפחתי',
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
