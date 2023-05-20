import { UserActionType, UserActions, UserDataType } from "./UserInitialData";

/**
 *
 * @param state
 * @param action
 * @returns
 * @description
 * This function takes a state and an action and returns a new state.
 * The new state is determined by the action type.
 */
export const UserReducers = (state: UserDataType, action: UserActions) => {
	// console.log([...state.portfolioList,...( Array.isArray(action.payload)	? action.payload:[] ) ])
	if (Object.values(UserActionType).find((item) => item === action.type)) {
		return {
			...state,
			[Object.keys(UserActionType)[Object.values(UserActionType).indexOf(action.type)]]:
				action.payload,
		};
	} else {
		throw new Error(`Unknwon action type: ${action.type}`);
	}
};
