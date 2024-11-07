export const getImgkitUrl = (url: string, width = 200, height = 200) => {
    const path = url.replace("https://media.rawg.io", "");
    return `https://ik.imagekit.io/angwisa${path}?tr=w-${width},h-${height}`;
};
