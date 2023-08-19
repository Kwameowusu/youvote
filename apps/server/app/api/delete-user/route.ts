import { NextResponse } from "next/server";
import { app } from "../firebase";

export async function POST(request: Request) {
  try {
    
    const params = await request.json();

		await app().auth().deleteUser(params.deleteUser);
		return NextResponse.json({ message: "User deleted successfully" });
	} catch (error) {
		console.log(error);
	}
}
