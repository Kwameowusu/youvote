export const ImageDimensions = async (file:File) => {
  let newPromise = new Promise((resolve) => {
    let img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      resolve(img);

    };
  });

  return newPromise as Promise<HTMLImageElement>;
};
