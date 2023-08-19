import { useCandidateProvider } from "../../contextapi/CandidateProvider";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CandidateActionType, aCandidateType, aPortfolioType } from "../reducers/candidate-reducer";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import useUpdateinfo from "./useUpdateinfo";
import { NotificationType } from "../reducers/auth-reducer";

export const useUpdateACandidate = () => {
	const { CandidateDispatch, CandidateState } = useCandidateProvider();
	const { deleteProfilePhoto } = useUpdateinfo();

	/**
	 *
	 * @param aCandidate
	 * @returns
	 * @description  submit the candidate profile photo
	 */
	const profilePhotoSubmit = (aCandidate: aCandidateType) => {
		const storage = getStorage();

		if (!CandidateState.candidateProfile) {
			CandidateDispatch({ type: CandidateActionType.isNoFile, payload: true });

			const timer = setTimeout(() => {
				CandidateDispatch({ type: CandidateActionType.isNoFile, payload: false });
			}, 800);

			return () => clearTimeout(timer);
		}
		const storageRef1 = ref(storage, "Youvote/candidate/" + CandidateState.candidateProfile?.name);
		const uploadTask = uploadBytesResumable(storageRef1, CandidateState.candidateProfile as File);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						CandidateDispatch({ type: CandidateActionType.isFileLoading, payload: true });

						console.log("Upload is running");
						break;
					default:
						console.log("Upload is paused");
				}
			},

			(error) => {
				console.log("error", error);

				if (error) {
					CandidateDispatch({ type: CandidateActionType.isFileLoading, payload: false });

					CandidateDispatch({ type: CandidateActionType.candidateProfile, payload: null });

					CandidateDispatch({ type: CandidateActionType.isCandidateSubmitError, payload: true });
					const timer = setTimeout(() => {
						CandidateDispatch({ type: CandidateActionType.isCandidateSubmitError, payload: false });
					}, 9000);
					return () => clearTimeout(timer);
				}
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
					console.log(downloadUrl);

					submitProfileDetails(downloadUrl, aCandidate);

					// Delete the old candidate photo
					deleteProfilePhoto(aCandidate?.profileUrl);
				});
			}
		);
	};

	/**
	 * @param downloadUrl
	 * @param aCandidate
	 * @returns
	 * @description This function is used to submit the candidate profile details
	 */
	const submitProfileDetails = (downloadUrl: string, aCandidate: aCandidateType) => {
		const formRef = doc(db, "candidates", aCandidate?.fuid);
		updateDoc(formRef, {
			profileUrl: downloadUrl,
		})
			.then(() => {
				CandidateDispatch({ type: CandidateActionType.isFileLoading, payload: false });
				CandidateDispatch({ type: CandidateActionType.candidateProfile, payload: null });
				CandidateDispatch({ type: CandidateActionType.isCandidateProfileUpdateSuccess, payload: true });

				const timer = setTimeout(() => {
					CandidateDispatch({ type: CandidateActionType.isCandidateProfileUpdateSuccess, payload: false });
				}, 5000);
				return () => clearTimeout(timer);
			})
			.catch(() => {
				CandidateDispatch({ type: CandidateActionType.isCandidateSubmitError, payload: true });
				CandidateDispatch({ type: CandidateActionType.candidateProfile, payload: null });

				const timer = setTimeout(() => {
					CandidateDispatch({ type: CandidateActionType.isCandidateSubmitError, payload: false });
				}, 9000);
				return () => clearTimeout(timer);
			});
	};

	const submitCandidateName = (e: React.FormEvent<HTMLFormElement>, aCandidate: aCandidateType) => {
		e.preventDefault();

		CandidateDispatch({ type: CandidateActionType.isNameLoading, payload: true });

		const formRef = doc(db, "candidates", aCandidate?.fuid);
		updateDoc(formRef, { name: CandidateState.username?.toLowerCase()?.trim() })
			.then(() => {
				CandidateDispatch({ type: CandidateActionType.isNameLoading, payload: false });
				CandidateDispatch({ type: CandidateActionType.username, payload: "" });

				CandidateDispatch({ type: CandidateActionType.isCandidateNameUpdateSuccess, payload: true });

				const timer = setTimeout(() => {
					CandidateDispatch({ type: CandidateActionType.isCandidateNameUpdateSuccess, payload: false });
				}, 5000);
				return () => clearTimeout(timer);
			})
			.catch(() => {
				CandidateDispatch({ type: CandidateActionType.isCandidateSubmitError, payload: true });
				const timer = setTimeout(() => {
					CandidateDispatch({ type: CandidateActionType.isCandidateSubmitError, payload: false });
				}, 9000);
				return () => clearTimeout(timer);
			});
	};

	/**
	 *
	 * @param e
	 * @param aCandidate
	 */
	const submitCandidatePortfolio = (e: React.FormEvent<HTMLFormElement>, aCandidate: aCandidateType) => {
		e.preventDefault();
		CandidateDispatch({ type: CandidateActionType.isPortfolioLoading, payload: true });

		const formRef = doc(db, "candidates", aCandidate?.fuid);
		updateDoc(formRef, { portfolio: CandidateState.selectedPortfolio?.toLowerCase()?.trim() })
			.then(() => {
				CandidateDispatch({ type: CandidateActionType.isPortfolioLoading, payload: false });
				CandidateDispatch({ type: CandidateActionType.selectedPortfolio, payload: "" });

				CandidateDispatch({ type: CandidateActionType.isCandidatePortfolioUpdateSuccess, payload: true });

				const timer = setTimeout(() => {
					CandidateDispatch({
						type: CandidateActionType.isCandidatePortfolioUpdateSuccess,
						payload: false,
					});
				}, 5000);
				return () => clearTimeout(timer);
			})
			.catch(() => {
				CandidateDispatch({ type: CandidateActionType.isCandidateSubmitError, payload: true });
				const timer = setTimeout(() => {
					CandidateDispatch({ type: CandidateActionType.isCandidateSubmitError, payload: false });
				}, 9000);
				return () => clearTimeout(timer);
			});
	};

	/**
	 * @param aCandidate
	 * @returns
	 * @description This function is used to delete the candidate profile
	 */
	const deleteCandidate = (aCandidate: aCandidateType) => {
		CandidateDispatch({ type: CandidateActionType.isCandidateDeleting, payload: true });

		deleteProfilePhoto(aCandidate?.profileUrl);

		deleteDoc(doc(db, `${"candidates"}`, `${aCandidate.fuid}`))
			.then(() => {
				console.log("hello");

				CandidateDispatch({ type: CandidateActionType.isCandidateDeleting, payload: false });

				CandidateDispatch({ type: CandidateActionType.isCandidateDeleteModalOpen, payload: false });

				CandidateDispatch({ type: CandidateActionType.isCandidateDeleteSuccess, payload: true });

				const timer = setTimeout(() => {
					CandidateDispatch({ type: CandidateActionType.isCandidateDeleteSuccess, payload: false });
				}, 5000);
				return () => clearTimeout(timer);
			})
			.catch(() => {
				CandidateDispatch({ type: CandidateActionType.isCandidateDeleteModalOpen, payload: false });
				CandidateDispatch({ type: CandidateActionType.isCandidateDeleting, payload: false });

				CandidateDispatch({ type: CandidateActionType.isCandidateDeleteError, payload: true });

				const timer = setTimeout(() => {
					CandidateDispatch({ type: CandidateActionType.isCandidateDeleteError, payload: false });
				}, 5000);
				return () => clearTimeout(timer);
			});
	};

	const deletePortfolio = (aPortfolio: aPortfolioType) => {
		CandidateDispatch({ type: CandidateActionType.isPortfolioDeleting, payload: true });

		deleteDoc(doc(db, `${"portfolio"}`, `${aPortfolio.fuid}`))
			.then(() => {
				CandidateDispatch({
					type: CandidateActionType.portfolioList,
					payload: CandidateState.portfolioList?.filter((item) => item.fuid !== aPortfolio.fuid),
				});

				CandidateDispatch({ type: CandidateActionType.isPortfolioDeleting, payload: false });

				CandidateDispatch({ type: CandidateActionType.isPortfolioDeleteModalOpen, payload: false });

				CandidateDispatch({ type: CandidateActionType.isPortfolioDeleteSuccess, payload: true });

				const timer = setTimeout(() => {
					CandidateDispatch({ type: CandidateActionType.isPortfolioDeleteSuccess, payload: false });
				}, 5000);
				return () => clearTimeout(timer);
			})
			.catch(() => {
				CandidateDispatch({ type: CandidateActionType.isPortfolioDeleteModalOpen, payload: false });
				CandidateDispatch({ type: CandidateActionType.isPortfolioDeleting, payload: false });

				CandidateDispatch({ type: CandidateActionType.isPortfolioDeleteError, payload: true });

				const timer = setTimeout(() => {
					CandidateDispatch({ type: CandidateActionType.isPortfolioDeleteError, payload: false });
				}, 5000);
				return () => clearTimeout(timer);
			});
	};

	/********************************************NOTIFICATION********************************************* */

	//TODO: refactor notification to be more dynamic.
	// 1. create notification state that is an array of objects
	// 2. Where ever there will be a notification, push an object to the array
	// 3. create a notification component that will render the notification ✔ Done
	const notification: NotificationType = [
		{
			transform: CandidateState.isCandidateProfileUpdateSuccess,
			dispatch: () => {
				CandidateDispatch({ type: CandidateActionType.isCandidateProfileUpdateSuccess, payload: false });
			},
			isClose: true,
			hexColor: "#1e900b",
			status: "success",
			noteText: "Profile updated successfully",
		},
		{
			transform: CandidateState.isCandidateSubmitError,
			dispatch: () => {
				CandidateDispatch({ type: CandidateActionType.isCandidateSubmitError, payload: false });
			},
			isClose: true,
			hexColor: "#900b0b",
			status: "error",
			noteText: "Oops:) error occured",
		},
		{
			transform: CandidateState.isCandidateNameUpdateSuccess,
			dispatch: () => {
				CandidateDispatch({ type: CandidateActionType.isCandidateNameUpdateSuccess, payload: false });
			},
			isClose: true,
			hexColor: "#1e900b",
			status: "success",
			noteText: "Name updated successfully",
		},
		{
			transform: CandidateState.isCandidatePortfolioUpdateSuccess,
			dispatch: () => {
				CandidateDispatch({ type: CandidateActionType.isCandidatePortfolioUpdateSuccess, payload: false });
			},
			isClose: true,
			hexColor: "#1e900b",
			status: "success",
			noteText: "Portfolio updated successfully",
		},
		{
			transform: CandidateState.isCandidateDeleteSuccess,
			dispatch: () => {
				CandidateDispatch({ type: CandidateActionType.isCandidateDeleteSuccess, payload: false });
			},
			isClose: true,
			hexColor: "#1e900b",
			status: "success",
			noteText: "Candidate deleted successfully",
		},
		{
			transform: CandidateState.isCandidateDeleteError,
			dispatch: () => {
				CandidateDispatch({ type: CandidateActionType.isCandidateDeleteError, payload: false });
			},
			isClose: true,
			hexColor: "#900b0b",
			status: "success",
			noteText: "Oops:) error occured",
		},
		{
			transform: CandidateState.isPortfolioDeleteSuccess,
			dispatch: () => {
				CandidateDispatch({ type: CandidateActionType.isPortfolioDeleteSuccess, payload: false });
			},
			isClose: true,
			hexColor: "#1e900b",
			status: "success",
			noteText: "Portfolio deleted successfully",
		},
		{
			transform: CandidateState.isPortfolioDeleteError,
			dispatch: () => {
				CandidateDispatch({ type: CandidateActionType.isPortfolioDeleteError, payload: false });
			},
			isClose: true,
			hexColor: "#900b0b",
			status: "success",
			noteText: "Oops:) error occured",
		},
	];

	/***********************************CONFIRMATION*******************************************************/
	const confirmations = [
		{
			transform: CandidateState.isCandidateDeleteModalOpen,
			isDeleting: CandidateState.isCandidateDeleting,
			handleDelete: () => {
				deleteCandidate(CandidateState.aCandidate as aCandidateType);
			},
			handleClose: () => {
				CandidateDispatch({ type: CandidateActionType.isCandidateDeleteModalOpen, payload: false });
			},
		},
		{
			transform: CandidateState.isPortfolioDeleteModalOpen,
			isDeleting: CandidateState.isPortfolioDeleting,
			handleDelete: () => {
				deletePortfolio(CandidateState.aPortfolio as aPortfolioType);
			},
			handleClose: () => {
				CandidateDispatch({ type: CandidateActionType.isPortfolioDeleteModalOpen, payload: false });
			},
		},
	];

	return {
		profilePhotoSubmit,
		notification,
		submitCandidateName,
		submitCandidatePortfolio,
		confirmations,
	};
};
