import admin from "firebase-admin";

export const adminSdkConfig = {
	"type": `${process.env.NEXT_TYPE}`,
	"project_id": `${process.env.NEXT_PROJECT_ID}`,
	"private_key_id": `${process.env.NEXT_PRIVATE_KEY_ID}`,
	"private_key": `${process.env.NEXT_PRIVATE_KEY?.replace(/\\n/gm, "\n")}`,
	"client_email": `${process.env.NEXT_CLIENT_EMAIL}`,
	"client_id": `${process.env.NEXT_CLIENT_ID}`,
	"auth_uri": `${process.env.NEXT_AUTH_URI}`,
	"token_uri": `${process.env.NEXT_TOKEN_URI}`,
	"auth_provider_x509_cert_url": `${process.env.NEXT_AUTH_PROVIDER_X509_CERT_URL}`,
	"client_x509_cert_url": `${process.env.NEXT_CLIENT_X509_CERT_URL}`,
	"universe_domain": `${process.env.NEXT_UNIVERSE_DOMAIN}`,
};

const app = () => {
	if (!admin.apps.length) {
		return admin.initializeApp({
			credential: admin.credential.cert(adminSdkConfig as any),
		});
	} else {
		return admin.app();
	}
};

export { app };

/**
 * 
const firebaseConfig = {
	apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
	authDomain: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}`,
	databaseURL: `${process.env.NEXT_PUBLIC_DATABASE_URL}`,
	projectId: `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
	storageBucket: `${process.env.NEXT_PUBLIC_STORAGE_BUKCET}`,
	messagingSenderId: `${process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID}`,
	appId: `${process.env.NEXT_PUBLIC_APP_ID}`,
	measurementId: `${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`,
};
 */
