const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const videosDir = path.join(__dirname, '../public/videos');
const outputBaseDir = path.join(__dirname, '../public/images/sequence');

// Ensure base output directory exists
if (!fs.existsSync(outputBaseDir)) {
    fs.mkdirSync(outputBaseDir, { recursive: true });
}

// Get all MP4 files
const videos = fs.readdirSync(videosDir).filter(file => file.endsWith('.mp4'));

console.log(`Found ${videos.length} videos to process.`);

videos.forEach((video, index) => {
    const videoName = path.basename(video, '.mp4');
    const outputDir = path.join(outputBaseDir, videoName);
    const inputPath = path.join(videosDir, video);

    // Skip if directory already exists and has files (simple check)
    if (fs.existsSync(outputDir) && fs.readdirSync(outputDir).length > 0) {
        console.log(`[${index + 1}/${videos.length}] Skipping ${videoName} (already processed)`);
        return;
    }

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`[${index + 1}/${videos.length}] Processing ${videoName}...`);

    try {
        // Extract 5 seconds at 24fps, scale to 1080p width, webp format
        // Added -an to disable audio
        const cmd = `ffmpeg -i "${inputPath}" -t 5 -vf "fps=24,scale=1080:-1" -an -c:v libwebp -quality 80 "${path.join(outputDir, 'frame_%04d.webp')}" -y`;

        execSync(cmd, { stdio: 'inherit' });
        console.log(`✓ Completed ${videoName}`);
    } catch (error) {
        console.error(`✗ Failed to process ${videoName}:`, error.message);
    }
});

console.log('All videos processed!');
