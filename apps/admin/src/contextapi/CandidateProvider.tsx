import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { CandidateReducers, CandidateInitialData, CandidateDataType, CandidateActions, CandidateActionType } from "../lib/reducers/candidate-reducer";
import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthProvider } from "./AuthProvider";




interface CandidateProviderProps {
  children?: ReactNode;
}

type CandidateContextType = {

  CandidateState: CandidateDataType
  CandidateDispatch: React.Dispatch<CandidateActions>
};
const CandidateContext = createContext<CandidateContextType | null | string>("");

export const useCandidateProvider = () => {
  return useContext(CandidateContext) as CandidateContextType;
};

let isPortfolioFetched = false
let isCandidateFetched = false
let isVotesFetched = false
let portfolioList: any = []
let candidateList: any = []
let votesList: any[] = []


const CandidateProvider = ({ children }: CandidateProviderProps) => {
  const [state, dispatch] = useReducer(CandidateReducers, CandidateInitialData);

const { AuthState } = useAuthProvider()


  const fetchPortfolioList = async () => {
    if (!AuthState.credentials?.uid) return
    isPortfolioFetched = true
    const querySnapshot = await getDocs(query(collection(db, "portfolio")));

    querySnapshot.forEach((doc) => {
      portfolioList.push({ ...doc.data(), fuid: doc.id })
    });

    dispatch({
      type: CandidateActionType.portfolioList,
      payload: portfolioList,
    });
    // true when data done fetching. It could have been is...Fetched
    dispatch({ type: CandidateActionType.isPortfolioListLoading, payload: true });
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
      type: CandidateActionType.candidateList,
      payload: candidateList,
    });
    // true when data done fetching. It could have been is...Fetched
    dispatch({ type: CandidateActionType.isCandidateListLoading, payload: true });
  };


  useEffect(() => {
    if (isCandidateFetched) return
    fetchCandidateList()
  }, [AuthState.credentials])



  // fetch votes list
  const fetchVotesList = async () => {
    if (!AuthState.credentials?.uid) return

    isVotesFetched = true
    const querySnapshot = await getDocs(query(collection(db, "votes")));

    querySnapshot.forEach((doc) => {
      votesList.push({ ...doc.data(), fuid: doc.id })

      
    });

    dispatch({
      type: CandidateActionType.votesList,
      payload: votesList,
    });
    // true when data done fetching. It could have been is...Fetched
    dispatch({ type: CandidateActionType.isVotesListLoading, payload: true });
  };


  useEffect(() => {
    if (isVotesFetched) return
    fetchVotesList()
  }, [AuthState.credentials])




  return (
    <>
      <CandidateContext.Provider value={{
        CandidateState: state,
        CandidateDispatch: dispatch,

      }}>{children}</CandidateContext.Provider>
    </>
  );
};

export default CandidateProvider;
