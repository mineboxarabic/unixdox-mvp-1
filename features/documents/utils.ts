export const getDrivePreviewUrl = (url: string | null | undefined) => {
    if (!url) return null;
    // Convert Google Drive view URL to preview URL for iframe embedding
    if (url.includes("drive.google.com") && url.includes("/view")) {
        // Add parameters to reduce Google Drive UI controls
        const previewUrl = url.replace("/view", "/preview");
        const params = previewUrl.includes('?') ? '&' : '?';
        return `${previewUrl}${params}rm=minimal&embedded=true`;
    }
    return null;
};

export const getDriveThumbnailUrl = (url: string | null | undefined) => {
    if (!url) return null;
    
    // Extract file ID from Google Drive URL
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
        const fileId = match[1];
        // Use the thumbnail endpoint with size parameters
        // sz=w400-h400 requests a thumbnail of 400x400 pixels
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h400`;
    }
    
    return null;
};
