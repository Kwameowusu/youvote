import { ImageDimensions } from "./image-dimension";
import { ImageRename } from "./image-rename";
import imageCompression from "browser-image-compression";

/*
  * @param file: File
  * @param maxSize: number
  * @returns Promise<File>
  * @description
  * This function takes a file and a max size in KB and returns a promise of a file.
  * The file is compressed to the max size provided.
*/ 
export async  function IterateCompression(file: File, maxSize: number): Promise<File> {
	const renamedImage = await ImageRename(file);

	const reqImage = await ImageDimensions(file);

	let theSize = reqImage.width > reqImage.height ? reqImage.width : reqImage.height;
	let maxDimension;

	theSize > maxSize ? (maxDimension = theSize / 1.4) : (maxDimension = theSize);

	const options = {
		maxSizeMB: 3,
		maxWidthOrHeight: maxDimension,
		useWebWorker: true,
		maxIteration: 15,
	};

	const AcompressedFile = await imageCompression(renamedImage, options);

	if (AcompressedFile.size / 1024 > maxSize) {
		return await IterateCompression(AcompressedFile, maxSize);
	} else {
		return AcompressedFile;
	}
}
