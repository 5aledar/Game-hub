export const getImgkitUrl = (url: string, width:number, height: number) => {
    const path = url.replace("https://media.rawg.io", "");
    return `https://ik.imagekit.io/angwisa${path}?tr=w-${width},h-${height}`;
};
