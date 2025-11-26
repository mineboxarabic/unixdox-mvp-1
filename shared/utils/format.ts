export const formatSize = (bytes?: number) => {
    if (!bytes) return "--";
    const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i)) + '' + sizes[i];
};
