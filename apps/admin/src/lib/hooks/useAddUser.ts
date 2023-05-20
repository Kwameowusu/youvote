import { UserActionType, aUserType } from "../reducers/user-reducer/UserInitialData";
import { useUserProvider } from "../../contextapi/UserProvider";
import { NotificationType } from "../reducers/auth-reducer";
import { mutate } from "swr";
import {  doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const useAddUser = () => {
	const { UserState, UserDispatch } = useUserProvider();

	// create new user either by admin or by voter
	const submitUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		UserDispatch({ type: UserActionType.isUserLoading, payload: true });

		const options = {
			method: "POST",
			body: JSON.stringify({
				email: UserState.email.trim(),
				password: UserState.password.trim(),
				role: UserState.role,
			}),
		};

		const response = await fetch(`${import.meta.env.VITE_API_URL}/create-user`, options);
		const userData = await response.json();
		if (response.ok && response.status < 299 && response.status > 199) {
			mutate(`${import.meta.env.VITE_API_URL}/get-users`, (data: any) => {
				return { ...data, users: [...data.users, userData] };
			});

			UserDispatch({ type: UserActionType.isUserLoading, payload: false });
			UserDispatch({ type: UserActionType.isUserSubmitSuccess, payload: true });
			UserDispatch({ type: UserActionType.role, payload: "" });
			UserDispatch({ type: UserActionType.email, payload: "" });
			UserDispatch({ type: UserActionType.password, payload: "" });

			const timer = setTimeout(() => {
				UserDispatch({ type: UserActionType.isUserSubmitSuccess, payload: false });
			}, 9000);
			return () => clearTimeout(timer);
		} else if (response.status < 599 && response.status > 299) {
			UserDispatch({ type: UserActionType.isUserLoading, payload: false });

			UserDispatch({ type: UserActionType.isUserSubmitError, payload: true });
			const timer = setTimeout(() => {
				UserDispatch({ type: UserActionType.isUserSubmitError, payload: false });
			}, 9000);
			return () => clearTimeout(timer);
		} else {
			UserDispatch({ type: UserActionType.isUserLoading, payload: false });
			UserDispatch({ type: UserActionType.role, payload: "" });
			UserDispatch({ type: UserActionType.email, payload: "" });
			UserDispatch({ type: UserActionType.password, payload: "" });
		}
	};

	// add user to db

	const deleteUser = async (aUser: aUserType) => {
		UserDispatch({ type: UserActionType.isUserDeleting, payload: true });

		const response = await fetch(`${import.meta.env.VITE_API_URL}/delete-user`, {
			method: "POST",
			body: JSON.stringify({ deleteUser: aUser.fuid }),
		});

		console.log(response);

		if (response.ok && response.status < 299 && response.status > 199) {
			mutate(`${import.meta.env.VITE_API_URL}/get-users`, (data: any) => {
				const newData = data.users.filter((user: aUserType) => user.fuid !== aUser.fuid);
				return { ...data, users: newData };
			});

			UserDispatch({ type: UserActionType.isUserDeleting, payload: false });

			UserDispatch({ type: UserActionType.isDeleteModalOpen, payload: false });

			UserDispatch({ type: UserActionType.isUserDeleteSuccess, payload: true });

			const timer = setTimeout(() => {
				UserDispatch({ type: UserActionType.isUserDeleteSuccess, payload: false });
			}, 5000);
			return () => clearTimeout(timer);
		} else {
			UserDispatch({ type: UserActionType.isDeleteModalOpen, payload: false });
			UserDispatch({ type: UserActionType.isUserDeleting, payload: false });
			UserDispatch({ type: UserActionType.isUserDeleteError, payload: true });
			const timer = setTimeout(() => {
				UserDispatch({ type: UserActionType.isUserDeleteError, payload: false });
			}, 5000);
			return () => clearTimeout(timer);
		}
	};

	const addActivate = (activate: boolean) => {
		// setgetstateload(true);
		UserDispatch({ type: UserActionType.isActivateLoading, payload: true });

		const formRef = doc(db, "elections", UserState.election?.fuid as string);

		updateDoc(formRef, {
			state: activate,
		})
			.then(() => {
				UserDispatch({
					type: UserActionType.election,
					payload: { state: activate, fuid: UserState.election?.fuid as string },
				});
				UserDispatch({ type: UserActionType.isActivateSuccess, payload: true });
				UserDispatch({ type: UserActionType.isActivateLoading, payload: false });
				// UserDispatch({ type: UserActionType.activate, payload: null });

				const timer = setTimeout(() => {
					UserDispatch({ type: UserActionType.isActivateSuccess, payload: false });
				}, 3000);
				return () => clearTimeout(timer);
			})
			.catch((error) => {
				console.log(error);
				UserDispatch({ type: UserActionType.isActivateError, payload: true });
				UserDispatch({ type: UserActionType.isActivateLoading, payload: false });

				const timer = setTimeout(() => {
					UserDispatch({ type: UserActionType.isActivateError, payload: false });
				}, 3000);
				return () => clearTimeout(timer);
			});
	};

	/***********************************NOTIFICATION*******************************************************/

  //TODO: refactor notification to be more dynamic.
  // 1. create notification state that is an array of objects
  // 2. Where ever there will be a notification, push an object to the array
  // 3. create a notification component that will render the notification ✔ Done
	const notification: NotificationType = [
		{
			transform: UserState.isUserSubmitSuccess,
			dispatch: () => {
				UserDispatch({ type: UserActionType.isUserSubmitSuccess, payload: false });
			},
			isClose: true,
			hexColor: "#1e900b",
			status: "success",
			noteText: "User added successfully",
		},
		{
			transform: UserState.isUserSubmitError,
			dispatch: () => {
				UserDispatch({ type: UserActionType.isUserSubmitError, payload: false });
			},
			isClose: true,
			hexColor: "#900b0b",
			status: "error",
			noteText: "Oops:) error occured",
		},
		{
			transform: UserState.isUserDeleteSuccess,
			dispatch: () => {
				UserDispatch({ type: UserActionType.isUserDeleteSuccess, payload: false });
			},
			isClose: true,
			hexColor: "#1e900b",
			status: "success",
			noteText: "User deleted successfully",
		},
		{
			transform: UserState.isUserDeleteError,
			dispatch: () => {
				UserDispatch({ type: UserActionType.isUserDeleteError, payload: false });
			},
			isClose: true,
			hexColor: "#900b0b",
			status: "error",
			noteText: "Oops:) error occured",
		},
		{
			transform: UserState.isActivateSuccess,
			dispatch: () => {
				UserDispatch({ type: UserActionType.isActivateSuccess, payload: false });
			},
			isClose: true,
			hexColor: "#1e900b",
			status: "success",
			noteText: UserState.election?.state ? "🔥 Election Activated" : "❌ Election Deactivated",
		},
		{
			transform: UserState.isActivateError,
			dispatch: () => {
				UserDispatch({ type: UserActionType.isActivateError, payload: false });
			},
			isClose: true,
			hexColor: "#900b0b",
			status: "error",
			noteText: "Oops:) error occured",
		},
	];

	/***********************************CONFIRMATION*******************************************************/
	const confirmations = [
		{
			transform: UserState.isDeleteModalOpen,
			isDeleting: UserState.isUserDeleting,
			handleDelete: () => {
				deleteUser(UserState.aUser as aUserType);
			},
			handleClose: () => {
				UserDispatch({ type: UserActionType.isDeleteModalOpen, payload: false });
			},
		},
	];

	return {
		submitUser,
		UserState,
		UserDispatch,
		notification,
		confirmations,
		addActivate,
	};
};
