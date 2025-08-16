<?php
// Urban Responder Gallery Image Lister
// This script lists all images in the gallery folder for JavaScript to read

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');

$galleryPath = __DIR__;
$supportedFormats = ['jpg', 'jpeg', 'png', 'webp'];

// Get all image files
$imageFiles = [];
if ($handle = opendir($galleryPath)) {
    while (false !== ($entry = readdir($handle))) {
        $extension = strtolower(pathinfo($entry, PATHINFO_EXTENSION));
        if (in_array($extension, $supportedFormats)) {
            // Skip thumbnail files
            if (!strpos(strtolower($entry), 'thumb')) {
                $imageFiles[] = $entry;
            }
        }
    }
    closedir($handle);
}

// Sort files alphabetically
sort($imageFiles);

// Output as HTML for JavaScript to parse
?>
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="utf-8">
    <title>Gallery Images</title>
</head>
<body>
    <div id="gallery-images">
        <?php foreach ($imageFiles as $image): ?>
            <div class="image-file"><?php echo htmlspecialchars($image); ?></div>
        <?php endforeach; ?>
    </div>
</body>
</html>
