import { signInWithEmailAndPassword } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import { useAuthProvider } from '../../contextapi/AuthProvider';
import { auth } from '../../firebase';
import { useEffect } from 'react';
import { AuthActionType } from '../reducers/authreducer';

export const useLogin = () => {
  const navigate = useNavigate();
  const { AuthDispatch, AuthState } = useAuthProvider();

  useEffect(() => {
    if (AuthState.credentials) {
      navigate("/");
    }
  }, [navigate]);

  /**
   * 
   * @param e 
   * @returns 
   * @description
   * This function is used to login the user
   * 
   */
  const SubmitData = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    AuthDispatch({
      type: AuthActionType.isLoading, payload: true
    })

    	const options = {
				method: "POST",
				body: JSON.stringify({
					email: AuthState.email,
				}),
    };
    
    	const response = await fetch(`${import.meta.env.VITE_API_URL}/sign-in-client`, options);
			console.log(response);
			if (response.status === 401) {
				AuthDispatch({
					type: AuthActionType.isLoginError,
					payload: true,
				});

				AuthDispatch({
					type: AuthActionType.isLoading,
					payload: false,
				});

				const timer = setTimeout(() => {
					AuthDispatch({
						type: AuthActionType.isLoginError,
						payload: false,
					});
				}, 5000);
				return () => clearTimeout(timer);
			}

    if (auth) {
      signInWithEmailAndPassword(auth, AuthState.email, AuthState.password)
        .then((userCredential) => {
        
          localStorage.setItem(
            "credentials",
            JSON.stringify(userCredential.user)
          );
          AuthDispatch({
            type: AuthActionType.credentials, payload: userCredential.user
          })
          AuthDispatch({
            type: AuthActionType.isLoading, payload: false
          })

          navigate("/");
        })
        .catch((error) => {

          const errorMessage = error.message;
          console.log(errorMessage);

          AuthDispatch({
            type: AuthActionType.isLoginError, payload: true
          })

          AuthDispatch({
            type: AuthActionType.isLoading, payload: false
          })

          const timer = setTimeout(() => {
            AuthDispatch({
              type: AuthActionType.isLoginError, payload: false
            })
          }, 5000);
          return () => clearTimeout(timer);
        });
    }
  };

  return {
    SubmitData, AuthDispatch, AuthState
  }
}
