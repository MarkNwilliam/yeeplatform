// imageUtils.js
import Pica from 'pica';

const pica = Pica();

export const resizeImage = (file, desiredWidth) => {
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const scaleFactor = desiredWidth / img.width;
                const desiredHeight = img.height * scaleFactor;

                const canvas = document.createElement('canvas');
                canvas.width = desiredWidth;
                canvas.height = desiredHeight;

                pica.resize(img, canvas)
                    .then(result => pica.toBlob(result, 'image/jpeg', 0.80))
                    .then(blob => resolve(blob))
                    .catch(error => reject(error));
            };
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const isImageDimensionsValid = async (file, width, height) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            resolve(img.width === width && img.height === height);
        };
        img.src = URL.createObjectURL(file);
    });
};

export const isFileSizeWithinRange = (file, minSizeInMB, maxSizeInMB) => {
    const sizeInMB = file.size / (1024 * 1024);
    return sizeInMB >= minSizeInMB && sizeInMB <= maxSizeInMB;
};
