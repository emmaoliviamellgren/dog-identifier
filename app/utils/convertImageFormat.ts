export const convertImageFormat = async (fileFormat: string | Blob): Promise<string> => {
	return new Promise(async (resolve, reject) => {
		let file: Blob;

		if (typeof fileFormat === "string" && fileFormat.startsWith("blob:")) {
			try {
				const response = await fetch(fileFormat);
				file = await response.blob();
			} catch (error) {
				return reject("Failed to fetch blob from URL: " + error);
			}
		} else if (fileFormat instanceof Blob) {
			file = fileFormat;
		} else {
			return reject("Invalid file input");
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);

		console.log("file:", file);
	});
};
