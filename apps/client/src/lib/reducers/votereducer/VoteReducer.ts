import { VoteActionType, VoteActions, VoteDataType } from "./VoteInitialData";

// Voteentication Reducer
/**
 *
 * @param state
 * @param action
 * @returns
 * @description
 * This function takes a state and an action and returns a new state.
 * The new state is determined by the action type.
 */
export const VoteReducers = (state: VoteDataType, action: VoteActions) => {
	if (Object.values(VoteActionType).find((item) => item === action.type)) {
		return {
			...state,
			[Object.keys(VoteActionType)[Object.values(VoteActionType).indexOf(action.type)]]: action.payload,
		};
	} else {
		throw new Error(`Unknwon action type: ${action.type}`);
	}
};
