import { updateEmail, updatePassword, updateProfile, User } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { IterateCompression } from "uicore";
import { useAuthProvider } from "../../contextapi/AuthProvider";
import { auth } from "../../firebase";
import { useSignOut } from "./useSignOut";
import { AuthActionType, NotificationType } from "../reducers/auth-reducer";
import { FormEvent } from "react";

/**
 * @description This hook is used to update the user profile
 * @returns  {profileOnChange, uploadProfilePhoto, UpdateProfile, UpdateEmail, UpdatePassword, DeleteProfilePhoto}
 * @example
 * const {profileOnChange, uploadProfilePhoto, UpdateProfile, UpdateEmail, UpdatePassword, DeleteProfilePhoto} = useUpdateinfo()
 */
const useUpdateinfo = () => {
	const { AuthDispatch, AuthState } = useAuthProvider();

	const { logOut } = useSignOut();

	/**
	 *
	 * @param e
	 * @returns
	 * @description This function is used to update the user profile
	 * @example
	 *
	 */
	const profileOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		AuthDispatch({ type: AuthActionType.isCompressing, payload: true });

		const file = event.target.files && event.target.files[0];

		const image = await IterateCompression(file as File, 200);
		console.log(image);
		AuthDispatch({ type: AuthActionType.profileImage, payload: image });
		AuthDispatch({ type: AuthActionType.isCompressing, payload: false });
	};

	/**
	 *
	 * @returns
	 * @description This function is used to upload the user profile photo
	 * @example
	 */
	const uploadProfilePhoto = () => {
		const storage = getStorage();

		if (!AuthState.profileImage) {
			AuthDispatch({ type: AuthActionType.noFile, payload: true });

			const timer = setTimeout(() => {
				AuthDispatch({ type: AuthActionType.noFile, payload: false });
			}, 800);

			return () => clearTimeout(timer);
		}
		const storageRef1 = ref(storage, "Youvote/profile/" + AuthState.profileImage?.name);
		const uploadTask = uploadBytesResumable(storageRef1, AuthState.profileImage as File);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						AuthDispatch({ type: AuthActionType.isFileLoading, payload: true });

						console.log("Upload is running");
						break;
					default:
						console.log("Upload is paused");
				}
			},

			(error) => {
				console.log("error", error);

				if (error) {
					AuthDispatch({ type: AuthActionType.isFileLoading, payload: false });

					AuthDispatch({ type: AuthActionType.profileImage, payload: null });

					AuthDispatch({ type: AuthActionType.uploadError, payload: true });
					const timer = setTimeout(() => {
						AuthDispatch({ type: AuthActionType.uploadError, payload: false });
					}, 9000);
					return () => clearTimeout(timer);
				}
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
					console.log(downloadUrl);

					UpdateProfile(downloadUrl);
					// Delete the old profile photo
					deleteProfilePhoto(
						(AuthState.credentials?.providerData && AuthState.credentials.providerData[0]?.photoURL) as string
					);
				});
			}
		);
	};

	/**
	 *
	 * @param downloadUrl
	 * @returns
	 * @description This function is used to update the user profile
	 * @example
	 */
	const UpdateProfile = (downloadUrl: string) => {
		if (!downloadUrl) {
			AuthDispatch({ type: AuthActionType.noFile, payload: true });

			setTimeout(() => {
				AuthDispatch({ type: AuthActionType.noFile, payload: false });
			}, 800);
			return;
		}

		updateProfile(auth.currentUser as User, {
			displayName: "Miss Default",
			photoURL: downloadUrl,
		})
			.then(() => {
				AuthDispatch({ type: AuthActionType.isFileLoading, payload: false });
				AuthDispatch({ type: AuthActionType.profileImage, payload: null });

				AuthDispatch({ type: AuthActionType.isProfileUpdateSuccess, payload: true });

				const timer = setTimeout(() => {
					AuthDispatch({ type: AuthActionType.isProfileUpdateSuccess, payload: false });
				}, 5000);
				return () => clearTimeout(timer);
			})
			.catch((_error) => {
				AuthDispatch({ type: AuthActionType.uploadError, payload: true });
				AuthDispatch({ type: AuthActionType.profileImage, payload: null });
				AuthDispatch({ type: AuthActionType.isFileLoading, payload: false });

				const timer = setTimeout(() => {
					AuthDispatch({ type: AuthActionType.uploadError, payload: false });
				}, 9000);
				return () => clearTimeout(timer);
			});
	};

	/**
	 *
	 * @param url
	 * @description This function is used to delete the user profile photo
	 * @example
	 *
	 */
	const deleteProfilePhoto = (url: string) => {
		const storage = getStorage();
		const storageRef1 = ref(storage, url);
		console.log(storageRef1.name);
		deleteObject(storageRef1)
			.then(() => {
				console.log(" File deleted successfully");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	/**
	 *
	 * @param event
	 * @param field
	 * @description This function is used to update the user credentials
	 * @example
	 *
	 */
	const updateCredentials = (
		event: FormEvent<HTMLFormElement>,
		field: AuthActionType.email | AuthActionType.username | AuthActionType.password
	) => {
		event.preventDefault();

		// console.log(AuthState[field.toLowerCase() as keyof typeof AuthState]);

		const theField =
			field === AuthActionType.email
				? AuthState.email.trim()
				: field === AuthActionType.password
				? AuthState.password.trim()
				: AuthState.username.toLowerCase().trim();
		const profileUrl =
			AuthState.credentials?.providerData && (AuthState.credentials.providerData[0]?.photoURL as string);

		if (theField) {
			AuthDispatch({ type: AuthActionType.isFieldLoading, payload: true });

			(field === AuthActionType.username
				? updateProfile(auth.currentUser as User, { displayName: theField, photoURL: profileUrl })
				: field === AuthActionType.password
				? updatePassword(auth.currentUser as User, theField)
				: updateEmail(auth.currentUser as User, theField)
			)
				.then(() => {
					AuthDispatch({ type: AuthActionType.isFieldLoading, payload: false });
					AuthDispatch({ type: field, payload: "" });

					AuthDispatch({ type: AuthActionType.isFieldSuccess, payload: true });

					const timer = setTimeout(() => {
						AuthDispatch({ type: AuthActionType.isFieldSuccess, payload: false });
					}, 5000);
					return () => clearTimeout(timer);
				})
				.catch((error) => {
					console.log(error);
					AuthDispatch({ type: AuthActionType.isFieldLoading, payload: false });

					AuthDispatch({ type: AuthActionType.isFieldError, payload: true });

					const timer = setTimeout(() => {
						AuthDispatch({ type: AuthActionType.isFieldError, payload: false });
					}, 9000);
					return () => clearTimeout(timer);
				});
		}
	};

	/********************************************  NOTIFICATIONS  ********************************************/

	//TODO: refactor notification to be more dynamic.
	// 1. create notification state that is an array of objects
	// 2. Where ever there will be a notification, push an object to the array
	// 3. create a notification component that will render the notification ✔ Done
	const notification: NotificationType = [
		{
			transform: AuthState.isProfileUpdateSuccess,
			dispatch: () => {
				AuthDispatch({ type: AuthActionType.isProfileUpdateSuccess, payload: false });
			},
			isClose: true,
			hexColor: "#1e900b",
			status: "success",
			noteText: "Profile updated successfully",
		},
		{
			transform: AuthState.uploadError,
			dispatch: () => {
				AuthDispatch({ type: AuthActionType.uploadError, payload: false });
			},
			isClose: true,
			hexColor: "#900b0b",
			status: "error",
			noteText: "Oops:) error uplaoding",
		},
		{
			transform: AuthState.isFieldSuccess,
			dispatch: () => {
				AuthDispatch({ type: AuthActionType.isFieldSuccess, payload: false });
			},
			isClose: true,
			hexColor: "#1e900b",
			status: "success",
			noteText: "Field updated successfully",
		},
		{
			transform: AuthState.isFieldError,
			dispatch: () => {
				AuthDispatch({ type: AuthActionType.isFieldError, payload: false });
			},
			isClose: true,
			hexColor: "#900b0b",
			status: "error",
			noteText: "Oops:) error updating field",
		},
	];

	return {
		uploadProfilePhoto,
		profileOnChange,
		logOut,
		AuthDispatch,
		AuthState,
		updateCredentials,
		deleteProfilePhoto,
		notification,
	};
};

export default useUpdateinfo;
