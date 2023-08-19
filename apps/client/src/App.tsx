import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './pages/ProtectedRoute';
import { Vote } from "./pages/Vote";
import { ClientLogin } from "./pages/ClientLogin";
import { Congrat } from "./pages/Congrat";
import { UpdateInfo } from "./pages/UpdateInfo";
import AuthProvider from "./contextapi/AuthProvider";
import VoteProvider from "./contextapi/VoteProvider";
import ProtectVote from "./pages/ProtectVote";


function App() {
  return (
    <>
      <AuthProvider>
        <VoteProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route element={<ProtectVote />}>
                  <Route
                    path="/"
                    element={<Vote />}
                  />

                  <Route path="profile" element={<UpdateInfo />} />
                </Route>
                <Route path="congrat" element={<Congrat />} />
              </Route>
              <Route index path="login" element={<ClientLogin />} />
            </Routes>
          </BrowserRouter>
        </VoteProvider>
      </AuthProvider>

    </>
  )
}

export default App
