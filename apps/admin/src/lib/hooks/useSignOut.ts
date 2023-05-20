import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

export const useSignOut = () => {
  const navigate = useNavigate();

  /**
   * 
   * @param e 
   * @returns
   * @description
   * This function is used to logout the user
   */
  const logOut = async (e?: { preventDefault: () => void }) => {
    e?.preventDefault();
    localStorage.clear()
    navigate("/login");
    await signOut(auth);
  };
  return {
    logOut
  }
}
