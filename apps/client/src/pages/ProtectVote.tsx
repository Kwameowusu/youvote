// import { useContext } from "react";

import { Navigate, useLocation, Outlet } from "react-router-dom";



const ProtectVote = () => {



  const location = useLocation();

  if (localStorage.getItem("isVoted") === "voted") {
    return <Navigate replace to="/congrat" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectVote;
