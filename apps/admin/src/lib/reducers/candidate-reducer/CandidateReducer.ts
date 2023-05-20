import { CandidateActionType, CandidateActions, CandidateDataType } from "./CandidateInitialData";

/**
 *
 * @param state
 * @param action
 * @returns
 * @description
 * This function takes a state and an action and returns a new state.
 * The new state is determined by the action type.
 */
export const CandidateReducers = (state: CandidateDataType, action: CandidateActions) => {
  // console.log([...state.portfolioList,...( Array.isArray(action.payload)	? action.payload:[] ) ])
	if (Object.values(CandidateActionType).find((item) => item === action.type)) {
		return {
			...state,
			[Object.keys(CandidateActionType)[Object.values(CandidateActionType).indexOf(action.type)]]: action.payload,
		};
	} else {
		throw new Error(`Unknwon action type: ${action.type}`);
	}
};
