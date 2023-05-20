import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { uniqueId } from "uicore";
import { useVoteProvider } from "../../contextapi/VoteProvider";
import { db } from "../../firebase";
import { NotificationType } from "../reducers/authreducer";
import { VoteActionType } from "../reducers/votereducer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const useVote = () => {
  const { VoteState, VoteDispatch } = useVoteProvider()
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isVoted") === "voted") {
      navigate('/congrat')
    }
  }, [navigate])

  /********************************************  SUBMIT VOTE  ********************************************/
  const submitVote = async () => {
    console.log(VoteState.selectedChoice)
    VoteDispatch({ type: VoteActionType.isVoteLoading, payload: true });

    if (VoteState.selectedChoice.length !== VoteState.portfolioList.length) {
      VoteDispatch({ type: VoteActionType.isVoteLoading, payload: false });
      VoteDispatch({ type: VoteActionType.isVoteError, payload: true });
      const timer = setTimeout(() => {
        VoteDispatch({ type: VoteActionType.isVoteError, payload: false });
      }, 3000);
      return () => clearTimeout(timer);
    }

    const querySnapshot = await getDocs(query(collection(db, "votes"), where("voterId", "==", JSON.parse(localStorage.getItem("credentials") || "{}").uid)))

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        if (doc.data().voterId === JSON.parse(localStorage.getItem("credentials") || "{}").uid) {
          VoteDispatch({ type: VoteActionType.isVoteLoading, payload: false });
          VoteDispatch({ type: VoteActionType.isVoteError, payload: true });
          const timer = setTimeout(() => {
            VoteDispatch({ type: VoteActionType.isVoteError, payload: false });
            localStorage.setItem("isVoted", "voted")
            navigate('/congrat')
          }, 3000);
          return () => clearTimeout(timer);
        }
      });
      return
    }

    const anId = uniqueId();
    addDoc(collection(db, `votes`), {
      id: anId,
      voterId: JSON.parse(localStorage.getItem("credentials") || "{}").uid,
      choice: VoteState.selectedChoice,
    })
      .then(() => {
        VoteDispatch({ type: VoteActionType.isVoteSuccess, payload: true });
        VoteDispatch({ type: VoteActionType.isVoteLoading, payload: false });
        VoteDispatch({ type: VoteActionType.selectedChoice, payload: [] });

        const timer = setTimeout(() => {
          VoteDispatch({ type: VoteActionType.isVoteSuccess, payload: false });
          navigate('/congrat')
          localStorage.setItem("isVoted", "voted")
        }, 3000);

        return () => clearTimeout(timer);
      })
      .catch((error) => {
        console.log(error);
        VoteDispatch({ type: VoteActionType.isVoteError, payload: true });
        VoteDispatch({ type: VoteActionType.isVoteLoading, payload: false });

        const timer = setTimeout(() => {
          VoteDispatch({ type: VoteActionType.isVoteError, payload: false });
        }, 3000);

        return () => clearTimeout(timer);
      });

  }

  /********************************************  NOTIFICATIONS  ********************************************/
  //TODO: refactor notification to be more dynamic.
  // 1. create notification state that is an array of objects
  // 2. Where ever there will be a notification, push an object to the array
  // 3. create a notification component that will render the notification ✔ Done
  const notification: NotificationType = [
    {
      transform: VoteState.isVoteSuccess,
      dispatch: () => {
        VoteDispatch({ type: VoteActionType.isVoteSuccess, payload: false });
      },
      isClose: true,
      hexColor: "#1e900b",
      status: "success",
      noteText: "✨🎉 Voted successfully",
    },
    {
      transform: VoteState.isVoteError,
      dispatch: () => {
        VoteDispatch({ type: VoteActionType.isVoteError, payload: false });
      },
      isClose: true,
      hexColor: "#900b0b",
      status: "error",
      noteText: "Oops:) error occured",
    },

  ];
  return { submitVote, notification }
}
