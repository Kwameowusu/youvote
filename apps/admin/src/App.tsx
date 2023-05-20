import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './pages/ProtectedRoute';
import PortfolioCandidate from "./pages/PortfolioCandidate";
import CandidateList from "./pages/CandidateList";
import Insights from "./pages/Insights";
import {AdminLogin} from "./pages/AdminLogin";
import AuthProvider from "./contextapi/AuthProvider";
import { UpdateInfo } from "./pages/UpdateInfo";
import Settings from "./pages/Settings";
import CandidateProvider from "./contextapi/CandidateProvider";
import UserProvider from "./contextapi/UserProvider";




function App() {


  return (
    <>
    
      <AuthProvider>
        <CandidateProvider>
          <UserProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<PortfolioCandidate />} />
                  <Route path="candidates" element={<CandidateList />} />
                  <Route path="insight" element={<Insights />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="profile" element={<UpdateInfo />} />
                </Route>
                <Route index path="login" element={<AdminLogin />} />
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </CandidateProvider>
      </AuthProvider>
    
    </>
  )
}

export default App
