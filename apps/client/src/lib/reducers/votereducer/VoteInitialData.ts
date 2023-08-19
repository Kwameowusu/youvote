type voteCandidate = {
	fuid: string;
	portfolio: string;
	name: string;
};

type aPortfolioType = {
	id: string;
	fuid: string;
	name: string;
};

export type aCandidateType = {
	id: string;
	name: string;
	fuid: string;
	portfolio: string;
	profileUrl: string;
};

/**
 * @description VoteDataType
 * @type {VoteDataType}
 * @example
 * const [state, dispatch] = useReducer(VoteReducers, VoteInitialData); // VoteInitialData is the initial data for the VoteReducer
 */
export type VoteDataType = {
	selectedChoice: voteCandidate[];
	portfolioList: aPortfolioType[];
	candidateList: aCandidateType[];
	isPortfolioListLoading: boolean;
	isCandidateListLoading: boolean;
	isVoteLoading: boolean;
	isVoteError: boolean;
	isVoteSuccess: boolean;
  election: { state: boolean; fuid: string } | null;
  isElectionLoading: boolean;
};

/**
 * @description VoteActionType
 * @type {VoteActionType}
 */

export enum VoteActionType {
  selectedChoice = "SELECTED_CHOICE",
  portfolioList = "PORTFOLIO_LIST",
  candidateList = "CANDIDATE_LIST",
  isPortfolioListLoading = "isPortfolioListLoading",
  isCandidateListLoading = "isCandidateListLoading",
  isVoteLoading = "isVoteLoading",
  isVoteError = "isVoteError",
  isVoteSuccess = "isVoteSuccess",
  isElectionLoading = "isElectionLoading",
  election = "election",
}

/**
 * @description VotePayload
 * @type {VotePayload}
 * @example
 * const [state, dispatch] = useReducer(VoteReducers, VoteInitialData); // VoteInitialData is the initial data for the VoteReducer
 */
export type VotePayload = {
	[VoteActionType.selectedChoice]: voteCandidate[];
	[VoteActionType.portfolioList]: aPortfolioType[];
	[VoteActionType.candidateList]: aCandidateType[];
	[VoteActionType.isPortfolioListLoading]: boolean;
	[VoteActionType.isCandidateListLoading]: boolean;
	[VoteActionType.isVoteLoading]: boolean;
	[VoteActionType.isVoteError]: boolean;
  [VoteActionType.isVoteSuccess]: boolean;
  [VoteActionType.isElectionLoading]: boolean;
  [VoteActionType.election]: { state: boolean; fuid: string } | null;
};

/**
 * @description ActionMap
 * @type {ActionMap}
 * @example
 * type VotePayload = {
 *  [VoteActionType.USERNAME]: string;
 * [VoteActionType.EMAIL]: string;
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
 * @description VoteActions
 * @type {VoteActions}
 * @example
 * const [state, dispatch] = useReducer(VoteReducers, VoteInitialData); // VoteInitialData is the initial data for the VoteReducer
 * dispatch({
 *   type: VoteActionType.username,
 *  payload: "John Doe",
 * });
 */
export type VoteActions = ActionMap<VotePayload>[keyof ActionMap<VotePayload>];

/******************************  AUTH NOTIFICATION  ******************************/

export type NotificationType = {
	transform: boolean;
	dispatch: () => void;
	isClose: true;
	hexColor: string;
	status?: "success" | "error" | "info";
	noteText: string;
}[];

/**
 * @description Initial data for the VoteReducer
 * @type {VoteDataType}
 */
export const VoteInitialData: VoteDataType = {
	selectedChoice: [],
	portfolioList: [],
	candidateList: [],
	isPortfolioListLoading: false,
	isCandidateListLoading: false,
	isVoteLoading: false,
	isVoteError: false,
  isVoteSuccess: false,
  isElectionLoading: false,
  election: null,
};
