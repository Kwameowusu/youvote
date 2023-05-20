import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { VoteReducers, VoteInitialData, VoteDataType, VoteActions, VoteActionType } from "../lib/reducers/votereducer";
import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthProvider } from "./AuthProvider";



interface VoteProviderProps {
  children?: ReactNode;
}

type VoteContextType = {

  VoteState: VoteDataType
  VoteDispatch: React.Dispatch<VoteActions>
};
const VoteContext = createContext<VoteContextType | null | string>("");

export const useVoteProvider = () => {
  return useContext(VoteContext) as VoteContextType;
};

const VoteProvider = ({ children }: VoteProviderProps) => {

  const [state, dispatch] = useReducer(VoteReducers, VoteInitialData);
  const { AuthState } = useAuthProvider()

  let isCandidateFetched = false
  let isPortfolioFetched = false
  let isActivateFetched = false
  let candidateList: any[] = []
  let portfolioList: any[] = []


  const fetchPortfolioList = async () => {
    if(!AuthState.credentials?.uid) return
    isPortfolioFetched = true
    const querySnapshot = await getDocs(query(collection(db, "portfolio")));

    querySnapshot.forEach((doc) => {
      portfolioList.push({ ...doc.data(), fuid: doc.id })
    });

    dispatch({
      type: VoteActionType.portfolioList,
      payload: portfolioList,
    });
    // true when data done fetching. It could have been is...Fetched
    dispatch({ type: VoteActionType.isPortfolioListLoading, payload: true });
  };


  useEffect(() => {
    if (isPortfolioFetched) return
    fetchPortfolioList()
  }, [AuthState.credentials])


  // fetch candidate list
  const fetchCandidateList = async () => {
    if (!AuthState.credentials?.uid) return
      isCandidateFetched = true
      const querySnapshot = await getDocs(query(collection(db, "candidates")));

      querySnapshot.forEach((doc) => {
        candidateList.push({ ...doc.data(), fuid: doc.id })
      });

      dispatch({
        type: VoteActionType.candidateList,
        payload: candidateList,
      });
      // true when data done fetching. It could have been is...Fetched
      dispatch({ type: VoteActionType.isCandidateListLoading, payload: true });
    
  };

  useEffect(() => {
    if (isCandidateFetched) return
    fetchCandidateList()
  }, [AuthState.credentials])



  // fetch  list
  const fetchActivations = async () => {
    if (!AuthState.credentials?.uid) return

    isActivateFetched = true
    const querySnapshot = await getDocs(query(collection(db, "elections")));

    querySnapshot.forEach((doc) => {
      dispatch({
        type: VoteActionType.election,
        payload: { state: doc.data().state, fuid: doc.id },
      });
    });


    // true when data done fetching. It could have been is...Fetched
    dispatch({ type: VoteActionType.isElectionLoading, payload: true });
  };


  useEffect(() => {
    if (isActivateFetched) return
    fetchActivations()
  }, [AuthState.credentials])

  return (
    <>
      <VoteContext.Provider value={{
        VoteState: state,
        VoteDispatch: dispatch,
      }}>{children}</VoteContext.Provider>
    </>
  );
};

export default VoteProvider;
