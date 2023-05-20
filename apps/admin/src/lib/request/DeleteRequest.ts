// import React from "react";
import axios, { AxiosError } from "axios";

export const DeleteRequest = async (...args: any[]) => {
	console.log(...args);
	try {
		const response = await axios.post(args[0], args[1]);
		return response;
	} catch (error) {
		return error as Promise<AxiosError<any, any>>;
	}
};
