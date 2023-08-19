import { CongratCard } from "uicore"
import Layout from "../Layout"
import { useAuthProvider } from "../contextapi/AuthProvider";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { getDocs, query, collection, where } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase";


export function Congrat() {
  const { AuthState } = useAuthProvider();
  const { width, height } = useWindowSize()

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(query(collection(db, "votes"), where("voterId", "==", JSON.parse(localStorage.getItem("credentials") || "{}").uid)))

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          if (doc.data().voterId !== JSON.parse(localStorage.getItem("credentials") || "{}").uid) {
            localStorage.removeItem('isVoted')
          }
        });
        return
      } else if (querySnapshot.empty) {
        localStorage.removeItem('isVoted')
      }
    })()
  }, [])

  return (
    <Layout >
      <Confetti
        // recycle={false}
        gravity={0.07}
        width={width}
        height={height}
        colors={[
          '#1E228D',
          '#1A7718',
          '#92861C',
        ]}
      />
      <CongratCard
        style={{ marginTop: '160px' }}
        profileUrl={(AuthState.credentials?.providerData && AuthState.credentials.providerData[0]?.photoURL) as string}

      />
    </Layout>
  )
}

Congrat.displayName = 'Congrat'