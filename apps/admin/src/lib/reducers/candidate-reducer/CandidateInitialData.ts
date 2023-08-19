export type aCandidateType = {
	id: string;
	name: string;
	fuid: string;
	portfolio: string;
	profileUrl: string;
};
export type aVote = {
	id: string;
	choice: {
		name: string;
		portfolio: string;
		fuid: string;
	}[];
	voteId: string;
	fuid: string;
};
export type spreadVotes = {
	name: string;
	portfolio: string;
	fuid: string;
};
export type aPortfolioType = {
	id: string;
	fuid: string;
	name: string;
};

/**
 * @description CandidateDataType
 * @type {CandidateDataType}
 * @example
 * const [state, dispatch] = useReducer(CandidateReducers, CandidateInitialData); // CandidateInitialData is the initial data for the CandidateReducer
 */
export type CandidateDataType = {
	username: string;
	portfolio: string;
	isPortfolioSuccess: boolean;
	isPortfolioError: boolean;
	isPortfolioLoading: boolean;
	isNoFile: boolean;
	isCandidateLoading: boolean;
	isCompressing: boolean;
	portfolioList: aPortfolioType[];
	selectedPortfolio: string;
	candidateProfile: File | null;
	isCandidateSubmitError: boolean;
	isCandidateSubmitSuccess: boolean;
	isPortfolioListLoading: boolean;
	candidateList: aCandidateType[];
	isCandidateListLoading: boolean;
	isFileLoading: boolean;
	isNameLoading: boolean;
	isCandidateProfileUpdateSuccess: boolean;
	isCandidateNameUpdateSuccess: boolean;
	isCandidatePortfolioUpdateSuccess: boolean;
	aCandidate: aCandidateType | null;
	isCandidateDeleteModalOpen: boolean;
	isPortfolioDeleteModalOpen: boolean;
	isCandidateDeleting: boolean;
	isCandidateDeleteError: boolean;
	isCandidateDeleteSuccess: boolean;
	aPortfolio: aPortfolioType | null;
	isPortfolioDeleting: boolean;
	isPortfolioDeleteSuccess: boolean;
	isPortfolioDeleteError: boolean;
	isVotesListLoading: boolean;
	votesList: aVote[];
};

/**
 * @description CandidateActionType
 * @type {CandidateActionType}
 */

export enum CandidateActionType {
	username = "USERNAME",
	portfolio = "PORTFOLIO",
	isPortfolioSuccess = "IS_PORTFOLIO_SUCCESS",
	isPortfolioError = "IS_PORTFOLIO_ERROR",
	isPortfolioLoading = "IS_PORTFOLIO_LOADING",
	isNoFile = "IS_NO_FILE",
	isCandidateLoading = "IS_CANDIDATE_LOADING",
	isCompressing = "IS_COMPRESSING",
	portfolioList = "PORTFOLIO_LIST",
	selectedPortfolio = "SELECTED_PORTFOLIO",
	candidateProfile = "CANDIDATE_PROFILE",
	isCandidateSubmitError = "IS_CANDIDATE_SUBMIT_ERROR",
	isCandidateSubmitSuccess = "IS_CANDIDATE_SUBMIT_SUCCESS",
	isPortfolioListLoading = "IS_PORTFOLIO_LIST_LOADING",
	candidateList = "CANDIDATE_LIST",
	isCandidateListLoading = "IS_CANDIDATE_LIST_LOADING",
	isFileLoading = "IS_FILE_LOADING",
	isNameLoading = "IS_NAME_LOADING",
	isCandidateProfileUpdateSuccess = "IS_CANDIDATE_PROFILE_UPDATE_SUCCESS",
	isCandidateNameUpdateSuccess = "IS_CANDIDATE_NAME_UPDATE_SUCCESS",
	isCandidatePortfolioUpdateSuccess = "IS_CANDIDATE_PORTFOLIO_UPDATE_SUCCESS",
	aCandidate = "A_CANDIDATE",
	isCandidateDeleteModalOpen = "IS_CANDIDATE_DELETE_MODAL_OPEN",
	isPortfolioDeleteModalOpen = "IS_PORTFOLIO_DELETE_MODAL_OPEN",
	isCandidateDeleting = "IS_CANDIDATE_DELETING",
	isCandidateDeleteError = "IS_CANDIDATE_DELETE_ERROR",
	isCandidateDeleteSuccess = "IS_CANDIDATE_DELETE_SUCCESS",
	aPortfolio = "A_PORTFOLIO",
	isPortfolioDeleting = "IS_PORTFOLIO_DELETING",
	isPortfolioDeleteSuccess = "IS_PORTFOLIO_DELETE_SUCCESS",
	isPortfolioDeleteError = "IS_PORTFOLIO_DELETE_ERROR",
	isVotesListLoading = "isVotesListLoading",
  votesList = "votesList",
}

/**
 * @description CandidatePayload
 * @type {CandidatePayload}
 * @example
 * const [state, dispatch] = useReducer(CandidateReducers, CandidateInitialData); // CandidateInitialData is the initial data for the CandidateReducer
 */
export type CandidatePayload = {
	[CandidateActionType.username]: string;
	[CandidateActionType.portfolio]: string;
	[CandidateActionType.isPortfolioSuccess]: boolean;
	[CandidateActionType.isPortfolioError]: boolean;
	[CandidateActionType.isPortfolioLoading]: boolean;
	[CandidateActionType.isNoFile]: boolean;
	[CandidateActionType.isCandidateLoading]: boolean;
	[CandidateActionType.isCompressing]: boolean;
	[CandidateActionType.portfolioList]: aPortfolioType[];
	[CandidateActionType.selectedPortfolio]: string;
	[CandidateActionType.candidateProfile]: File | null;
	[CandidateActionType.isCandidateSubmitError]: boolean;
	[CandidateActionType.isCandidateSubmitSuccess]: boolean;
	[CandidateActionType.isPortfolioListLoading]: boolean;
	[CandidateActionType.candidateList]: aCandidateType[];
	[CandidateActionType.isCandidateListLoading]: boolean;
	[CandidateActionType.isFileLoading]: boolean;
	[CandidateActionType.isNameLoading]: boolean;
	[CandidateActionType.isCandidateProfileUpdateSuccess]: boolean;
	[CandidateActionType.isCandidateNameUpdateSuccess]: boolean;
	[CandidateActionType.isCandidatePortfolioUpdateSuccess]: boolean;
	[CandidateActionType.aCandidate]: aCandidateType | null;
	[CandidateActionType.isCandidateDeleteModalOpen]: boolean;
	[CandidateActionType.isPortfolioDeleteModalOpen]: boolean;
	[CandidateActionType.isCandidateDeleting]: boolean;
	[CandidateActionType.isCandidateDeleteError]: boolean;
	[CandidateActionType.isCandidateDeleteSuccess]: boolean;
	[CandidateActionType.aPortfolio]: aPortfolioType | null;
	[CandidateActionType.isPortfolioDeleting]: boolean;
	[CandidateActionType.isPortfolioDeleteSuccess]: boolean;
	[CandidateActionType.isPortfolioDeleteError]: boolean;
	[CandidateActionType.isVotesListLoading]: boolean;
	[CandidateActionType.votesList]: aVote[];
};

/**
 * @description ActionMap
 * @type {ActionMap}
 * @example
 * type CandidatePayload = {
 *  [CandidateActionType.USERNAME]: string;
 * [CandidateActionType.EMAIL]: string;
 * ...
 * }
 */
type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: {
		type: Key;
		payload: M[Key];
	};
};

/**
 * @description CandidateActions
 * @type {CandidateActions}
 * @example
 * const [state, dispatch] = useReducer(CandidateReducers, CandidateInitialData); // CandidateInitialData is the initial data for the CandidateReducer
 * dispatch({
 *   type: CandidateActionType.username,
 *  payload: "John Doe",
 * });
 */
export type CandidateActions = ActionMap<CandidatePayload>[keyof ActionMap<CandidatePayload>];

/**
 * @description Initial data for the CandidateReducer
 * @type {CandidateDataType}
 */
export const CandidateInitialData: CandidateDataType = {
	username: "",
	portfolio: "",
	isPortfolioSuccess: false,
	isPortfolioError: false,
	isPortfolioLoading: false,
	isNoFile: false,
	isCandidateLoading: false,
	isCompressing: false,
	portfolioList: [],
	selectedPortfolio: "",
	candidateProfile: null,
	isCandidateSubmitError: false,
	isCandidateSubmitSuccess: false,
	isPortfolioListLoading: false,
	candidateList: [],
	isCandidateListLoading: false,
	isFileLoading: false,
	isNameLoading: false,
	isCandidateProfileUpdateSuccess: false,
	isCandidateNameUpdateSuccess: false,
	isCandidatePortfolioUpdateSuccess: false,
	aCandidate: null,
	isCandidateDeleteModalOpen: false,
	isPortfolioDeleteModalOpen: false,
	isCandidateDeleting: false,
	isCandidateDeleteError: false,
	isCandidateDeleteSuccess: false,
	aPortfolio: null,
	isPortfolioDeleting: false,
	isPortfolioDeleteSuccess: false,
	isPortfolioDeleteError: false,
	isVotesListLoading: false,
	votesList: [],
};
