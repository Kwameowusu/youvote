import { AuthActionType, AuthActions, AuthDataType } from "./AuthInitialData";

// Authentication Reducer
/**
 *
 * @param state
 * @param action
 * @returns
 * @description
 * This function takes a state and an action and returns a new state.
 * The new state is determined by the action type.
 */
export const AuthReducers = (state: AuthDataType, action: AuthActions) => {
	if (Object.values(AuthActionType).find((item) => item === action.type)) {
		return {
			...state,
			[Object.keys(AuthActionType)[Object.values(AuthActionType).indexOf(action.type)]]: action.payload,
		};
	} else {
		throw new Error(`Unknwon action type: ${action.type}`);
	}
};
