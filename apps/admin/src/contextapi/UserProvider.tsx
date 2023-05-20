import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";

import { UserDataType, UserActions, UserInitialData, UserActionType } from "../lib/reducers/user-reducer/UserInitialData";
import { UserReducers } from "../lib/reducers/user-reducer/UserReducer";
import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthProvider } from "./AuthProvider";




interface UserProviderProps {
  children?: ReactNode;
}

type UserContextType = {

  UserState: UserDataType
  UserDispatch: React.Dispatch<UserActions>
};
const UserContext = createContext<UserContextType | null | string>("");

export const useUserProvider = () => {
  return useContext(UserContext) as UserContextType;
};


let isActivateFetched = false


const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(UserReducers, UserInitialData);
  const { AuthState } = useAuthProvider()



  // fetch  list
  const fetchActivations = async () => {
    if (!AuthState.credentials?.uid) return

    isActivateFetched = true
    const querySnapshot = await getDocs(query(collection(db, "elections")));

    querySnapshot.forEach((doc) => {
      dispatch({
        type: UserActionType.election,
        payload: { state: doc.data().state, fuid: doc.id },
      });
    });


    // true when data done fetching. It could have been is...Fetched
    dispatch({ type: UserActionType.isElectionLoading, payload: true });
  };


  useEffect(() => {
    if (isActivateFetched) return
    fetchActivations()
  }, [AuthState.credentials])

  // fetch user lis
  // const fetchUserList = async () => {
  //   isUserFetched = true
  //   const response = (await (await fetch(`${import.meta.env.VITE_API_URL}/get-users`)).json()).users
  //   dispatch({
  //     type: UserActionType.userList,
  //     payload: (await response).map((item: any) => ({
  //       fuid: item.uid,
  //       name: item.displayName,
  //       email: item.email,
  //       role: item.customClaims && item.customClaims.role
  //     }))
  //   });
  //   dispatch({ type: UserActionType.isUserListLoading, payload: true });
  // };


  // useEffect(() => {
  //   if (isUserFetched) return
  //   fetchUserList()
  // }, [])



  return (
    <>
      <UserContext.Provider value={{
        UserState: state,
        UserDispatch: dispatch,

      }}>{children}</UserContext.Provider>
    </>
  );
};

export default UserProvider;
