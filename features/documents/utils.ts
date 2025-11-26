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
