const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const videosDir = path.join(__dirname, '../public/raw_mobile_video');
const outputBaseDir = path.join(__dirname, '../public/images/sequence-mobile');

// Mapping to be filled by user or inferred
// Format: { 'Video_Filename.mp4': 'Target_Sequence_Name' }
// Mapping no longer needed as files are renamed
// Format: { 'Video_Filename.mp4': 'Target_Sequence_Name' }
// const videoMapping = {};

// Ensure base output directory exists
if (!fs.existsSync(outputBaseDir)) {
    fs.mkdirSync(outputBaseDir, { recursive: true });
}

// Get videos
const videos = fs.readdirSync(videosDir).filter(file => file.endsWith('.mp4'));

console.log(`Found ${videos.length} mobile videos.`);

videos.forEach((video, index) => {
    const targetSequence = path.basename(video, '.mp4');

    // We need to output to a mobile-specific folder!
    // The current script outputs to `public/images/sequence-mobile/[targetSequence]`
    processVideo(video, targetSequence);
});

// Function to process a single video
function processVideo(filename, targetSequenceName) {
    const inputPath = path.join(videosDir, filename);
    const outputDir = path.join(outputBaseDir, targetSequenceName);

    if (fs.existsSync(outputDir) && fs.readdirSync(outputDir).length > 0) {
        console.log(`Skipping ${targetSequenceName} (already processed)`);
        return;
    }

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`Processing ${filename} -> ${targetSequenceName}...`);

    try {
        // Extract frames: 30fps (or match desktop), scale to 720 width for mobile
        // 5 seconds * 24fps = 120 frames
        const cmd = `ffmpeg -i "${inputPath}" -t 5 -vf "fps=24,scale=720:-1" -an -c:v libwebp -quality 75 "${path.join(outputDir, 'frame_%04d.webp')}" -y`;

        execSync(cmd, { stdio: 'inherit' });
        console.log(`✓ Completed ${targetSequenceName}`);
    } catch (error) {
        console.error(`✗ Failed to process ${filename}:`, error.message);
    }
}

// Export for use if needed, or run directly
module.exports = { processVideo };
