export type aUserType = {
	id: string;
	email: string;
	role: string;
	fuid: string;
};

/**
 * @description UserDataType
 * @type {UserDataType}
 * @example
 * const [state, dispatch] = useReducer(UserReducers, UserInitialData); // UserInitialData is the initial data for the UserReducer
 */
export type UserDataType = {
	email: string;
	password: string;
	isUserLoading: boolean;
	isUserSubmitError: boolean;
	isUserSubmitSuccess: boolean;
	userList: aUserType[];
	isUserListLoading: boolean;
	isNameLoading: boolean;
	isUserNameUpdateSuccess: boolean;
	aUser: aUserType | null;
	isDeleteModalOpen: boolean;
	isUserDeleting: boolean;
	isUserDeleteError: boolean;
	isUserDeleteSuccess: boolean;
	role: string;
	activate: boolean;
	isActivateLoading: boolean;
	isActivateSuccess: boolean;
	isActivateError: boolean;
	isElectionLoading: boolean;
	election: { state: boolean; fuid: string } | null;
};

/**
 * @description UserActionType
 * @type {UserActionType}
 */

export enum UserActionType {
	email = "EMAIL",
	password = "PASSWORD",
	isUserLoading = "IS_User_LOADING",
	isUserSubmitError = "IS_User_SUBMIT_ERROR",
	isUserSubmitSuccess = "IS_User_SUBMIT_SUCCESS",
	userList = "User_LIST",
	isUserListLoading = "IS_User_LIST_LOADING",
	isNameLoading = "IS_NAME_LOADING",
	isUserNameUpdateSuccess = "IS_User_NAME_UPDATE_SUCCESS",
	aUser = "A_User",
	isDeleteModalOpen = "IS_DELETE_MODAL_OPEN",
	isUserDeleting = "IS_USER_DELETING",
	isUserDeleteError = "IS_User_DELETE_ERROR",
	isUserDeleteSuccess = "IS_User_DELETE_SUCCESS",
	role = "ROLE",
	isActivateLoading = "IS_ACTIVATE_LOADING",
	isActivateSuccess = "IS_ACTIVATE_SUCCESS",
	isActivateError = "IS_ACTIVATE_ERROR",
	activate = "ACTIVATE",
	isElectionLoading = "IS_ELECTION_LOADING",
	election = "ELECTION",
}

/**
 * @description UserPayload
 * @type {UserPayload}
 * @example
 * const [state, dispatch] = useReducer(UserReducers, UserInitialData); // UserInitialData is the initial data for the UserReducer
 */
export type UserPayload = {
	[UserActionType.email]: string;
	[UserActionType.password]: string;
	[UserActionType.isUserLoading]: boolean;
	[UserActionType.isUserSubmitError]: boolean;
	[UserActionType.isUserSubmitSuccess]: boolean;
	[UserActionType.userList]: aUserType[];
	[UserActionType.isUserListLoading]: boolean;
	[UserActionType.isNameLoading]: boolean;
	[UserActionType.isUserNameUpdateSuccess]: boolean;
	[UserActionType.aUser]: aUserType | null;
	[UserActionType.isDeleteModalOpen]: boolean;
	[UserActionType.isUserDeleting]: boolean;
	[UserActionType.isUserDeleteError]: boolean;
	[UserActionType.isUserDeleteSuccess]: boolean;
	[UserActionType.role]: string;
	[UserActionType.isActivateLoading]: boolean;
	[UserActionType.isActivateSuccess]: boolean;
	[UserActionType.isActivateError]: boolean;
	[UserActionType.activate]: boolean;
	[UserActionType.isElectionLoading]: boolean;
	[UserActionType.election]: { state: boolean; fuid: string } | null;
};

/**
 * @description ActionMap
 * @type {ActionMap}
 * @example
 * type UserPayload = {
 *  [UserActionType.USERNAME]: string;
 * [UserActionType.EMAIL]: string;
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
 * @description UserActions
 * @type {UserActions}
 * @example
 * const [state, dispatch] = useReducer(UserReducers, UserInitialData); // UserInitialData is the initial data for the UserReducer
 * dispatch({
 *   type: UserActionType.username,
 *  payload: "John Doe",
 * });
 */
export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

/**
 * @description Initial data for the UserReducer
 * @type {UserDataType}
 */
export const UserInitialData: UserDataType = {
	email: "",
	password: "",
	isUserLoading: false,
	isUserSubmitError: false,
	isUserSubmitSuccess: false,
	userList: [],
	isUserListLoading: false,
	isNameLoading: false,
	isUserNameUpdateSuccess: false,
	aUser: null,
	isDeleteModalOpen: false,
	isUserDeleting: false,
	isUserDeleteError: false,
	isUserDeleteSuccess: false,
	role: "",
	activate: false,
	isActivateLoading: false,
	isActivateSuccess: false,
	isActivateError: false,
	isElectionLoading: false,
	election: null,
};
