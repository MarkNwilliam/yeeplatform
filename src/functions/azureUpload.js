// azureUpload.js

async function uploadToAzure(file, isThumbnail = false) {
    const response = await fetch('https://yeeplatformbackend.azurewebsites.net/generateSasToken');
    const data = await response.json();
    const sasToken = data.sasToken;

    // Create a unique file name for the thumbnail to avoid name clashes
    let fileName = isThumbnail ? `thumbnail-${Date.now()}.jpg` : file.name;
    const blobURL = `https://yeeplatform.blob.core.windows.net/yeeebooks/${fileName}?${sasToken}`;

    const requestOptions = {
        method: 'PUT',
        body: file,
        headers: {
            'x-ms-blob-type': 'BlockBlob'
        }
    };

    const uploadResponse = await fetch(blobURL, requestOptions);

    if (uploadResponse.ok) {
        const publicBlobURL = blobURL.split('?')[0]; 
        return publicBlobURL;
    } else {
        throw new Error('Error uploading to Azure Blob Storage');
    }
}

export default uploadToAzure;
