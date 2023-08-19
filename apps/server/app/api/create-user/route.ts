import { NextResponse } from "next/server";
import { app } from "../firebase";

export async function POST(request: Request) {
	try {
		const response = await request.json();
		const userRecord = await app().auth().createUser({ email: response.email, password: response.password });

		if (userRecord?.uid) {
			await app().auth().setCustomUserClaims(userRecord.uid, { role: response.role });
			return NextResponse.json(userRecord);
		}
	} catch (error) {
		console.log(error);
	}
}
