const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../public/images');

function convertImages(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach((file) => {
            const filePath = path.join(dir, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error stating file:', err);
                    return;
                }

                if (stats.isDirectory()) {
                    convertImages(filePath);
                } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
                    const outputFilePath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

                    sharp(filePath)
                        .webp({ quality: 80 })
                        .toFile(outputFilePath)
                        .then(() => {
                            console.log(`Converted: ${file} -> ${path.basename(outputFilePath)}`);
                            // Optional: Remove original file
                            // fs.unlinkSync(filePath); 
                        })
                        .catch((err) => {
                            console.error('Error converting file:', err);
                        });
                }
            });
        });
    });
}

console.log('Starting conversion...');
convertImages(directoryPath);
