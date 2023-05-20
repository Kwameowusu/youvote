import { NextResponse } from "next/server";
import { app } from "../firebase";

export const revalidate = 5;
export async function GET() {
	try {
		const ff = await app().auth().listUsers();
		return NextResponse.json(ff);
	} catch (error) {
		console.log(error);
		return NextResponse.error();
	}
}
