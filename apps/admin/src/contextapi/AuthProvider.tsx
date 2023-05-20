import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { AuthReducers, AuthInitialData, AuthDataType, AuthActionType, AuthActions } from "../lib/reducers/auth-reducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


interface AuthProviderProps {
  children?: ReactNode;
}

type AuthContextType = {

  AuthState: AuthDataType
  AuthDispatch: React.Dispatch<AuthActions>
};
const AuthContext = createContext<AuthContextType | null | string>("");

export const useAuthProvider = () => {
  return useContext(AuthContext) as AuthContextType;
};

const AuthProvider = ({ children }: AuthProviderProps) => {

  const [state, dispatch] = useReducer(AuthReducers, AuthInitialData);

  useEffect(() => {

    (() => {
      onAuthStateChanged(auth, async (currentUser) => {

        dispatch({
          type: AuthActionType.credentials, payload: currentUser
        })
        localStorage.setItem(
          "credentials",
          JSON.stringify(currentUser)
        );
      });
    })();
  }, [])



  return (
    <>
      <AuthContext.Provider value={{
        AuthState: state,
        AuthDispatch: dispatch,
      }}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
