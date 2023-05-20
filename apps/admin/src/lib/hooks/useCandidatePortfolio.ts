import { addDoc, collection } from "firebase/firestore";
import { IterateCompression, uniqueId } from "uicore";
import { useCandidateProvider } from "../../contextapi/CandidateProvider";
import { db } from "../../firebase";
import { NotificationType } from "../reducers/auth-reducer";
import { CandidateActionType } from "../reducers/candidate-reducer";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const useCandidatePortfolio = () => {
	const { CandidateDispatch, CandidateState } = useCandidateProvider();

	const addPortfolio = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// setgetstateload(true);
		CandidateDispatch({ type: CandidateActionType.isPortfolioLoading, payload: true });

		const anId = uniqueId();
		addDoc(collection(db, `portfolio`), {
			id: anId,
			name: CandidateState.portfolio?.toLowerCase()?.trim(),
		})
			.then(() => {
				CandidateDispatch({ type: CandidateActionType.isPortfolioSuccess, payload: true });
				CandidateDispatch({ type: CandidateActionType.isPortfolioLoading, payload: false });
				CandidateDispatch({ type: CandidateActionType.portfolio, payload: "" });

				const timer = setTimeout(() => {
					CandidateDispatch({ type: CandidateActionType.isPortfolioSuccess, payload: false });
				}, 3000);
				return () => clearTimeout(timer);
			})
			.catch((error) => {
				console.log(error);
				CandidateDispatch({ type: CandidateActionType.isPortfolioError, payload: true });
				CandidateDispatch({ type: CandidateActionType.isPortfolioLoading, payload: false });

				const timer = setTimeout(() => {
					CandidateDispatch({ type: CandidateActionType.isPortfolioError, payload: false });
				}, 3000);
				return () => clearTimeout(timer);
			});
	};

	const profileOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		CandidateDispatch({ type: CandidateActionType.isCompressing, payload: true });

		const file = event.target.files && event.target.files[0];

		const image = await IterateCompression(file as File, 200);
		console.log(image);
		CandidateDispatch({ type: CandidateActionType.candidateProfile, payload: image });
		CandidateDispatch({ type: CandidateActionType.isCompressing, payload: false });
	};

	const onCandidateSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
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
						CandidateDispatch({ type: CandidateActionType.isCandidateLoading, payload: true });

						console.log("Upload is running");
						break;
					default:
						console.log("Upload is paused");
				}
			},

			(error) => {
				console.log("error", error);

				if (error) {
					CandidateDispatch({ type: CandidateActionType.isCandidateLoading, payload: false });

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

					submitFormDetails(downloadUrl);
					// Delete the old profile photo
				});
			}
		);
	};

	const submitFormDetails = (downloadUrl: string) => {
		const anId = uniqueId();
		addDoc(collection(db, `candidates`), {
			id: anId,
			portfolio: CandidateState.selectedPortfolio?.toLowerCase().trim(),
			name: CandidateState.username?.toLowerCase().trim(),
			profileUrl: downloadUrl,
		})
			.then(() => {
				CandidateDispatch({ type: CandidateActionType.isCandidateLoading, payload: false });

				CandidateDispatch({ type: CandidateActionType.isCandidateSubmitSuccess, payload: true });
				CandidateDispatch({ type: CandidateActionType.candidateProfile, payload: null });
				CandidateDispatch({ type: CandidateActionType.username, payload: "" });
				CandidateDispatch({ type: CandidateActionType.selectedPortfolio, payload: "" });

				const timer = setTimeout(() => {
					CandidateDispatch({ type: CandidateActionType.isCandidateSubmitSuccess, payload: false });
				}, 9000);
				return () => clearTimeout(timer);
			})
			.catch((error) => {
				console.log(error);
				CandidateDispatch({ type: CandidateActionType.isCandidateLoading, payload: false });

				CandidateDispatch({ type: CandidateActionType.isCandidateSubmitError, payload: true });
				const timer = setTimeout(() => {
					CandidateDispatch({ type: CandidateActionType.isCandidateSubmitError, payload: false });
				}, 9000);
				return () => clearTimeout(timer);
			});
	};

	//TODO: refactor notification to be more dynamic.
	// 1. create notification state that is an array of objects
	// 2. Where ever there will be a notification, push an object to the array
	// 3. create a notification component that will render the notification ✔ Done

	const notification: NotificationType = [
		{
			transform: CandidateState.isPortfolioSuccess,
			dispatch: () => {
				CandidateDispatch({ type: CandidateActionType.isPortfolioSuccess, payload: false });
			},
			isClose: true,
			hexColor: "#1e900b",
			status: "success",
			noteText: "Portfolio added successfully",
		},
		{
			transform: CandidateState.isPortfolioError,
			dispatch: () => {
				CandidateDispatch({ type: CandidateActionType.isPortfolioError, payload: false });
			},
			isClose: true,
			hexColor: "#900b0b",
			status: "error",
			noteText: "Oops:) error occured ",
		},
		{
			transform: CandidateState.isCandidateSubmitError,
			dispatch: () => {
				CandidateDispatch({ type: CandidateActionType.isCandidateSubmitError, payload: false });
			},
			isClose: true,
			hexColor: "#900b0b",
			status: "error",
			noteText: "Oops:) error adding candidate",
		},
		{
			transform: CandidateState.isCandidateSubmitSuccess,
			dispatch: () => {
				CandidateDispatch({ type: CandidateActionType.isCandidateSubmitSuccess, payload: false });
			},
			isClose: true,
			hexColor: "#1e900b",
			status: "success",
			noteText: "Candidate added successfully",
		},
	];

	return {
		notification,
		addPortfolio,
		CandidateDispatch,
		CandidateState,
		profileOnChange,
		onCandidateSubmit,
	};
};
