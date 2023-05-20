import { NextResponse } from "next/server";
import { app } from "../firebase";

export async function POST(request: Request) {
	try {
		const response = await request.json();
		const userRecord = await app().auth().getUserByEmail(response.email);

		if (userRecord?.uid && userRecord.customClaims?.role !== "voter") {
			return new Response("unathorized", { status: 401 });
		} else {
			return NextResponse.json({ message: "success" });
		}
	} catch (error) {
		console.log(error);
	}
}
