export const ColorBrightness = (color:string) => {
	const hex = color.replace("#", "");
	const colorRed = parseInt(hex.substring(0, 2), 16);
	const colorGreen = parseInt(hex.substring(2, 4), 16);
	const colorBlue = parseInt(hex.substring(4, 6), 16);
	const howbright =
		(colorRed * 299 + colorGreen * 587 + colorBlue * 114) / 1000;
	return howbright > 155;
};