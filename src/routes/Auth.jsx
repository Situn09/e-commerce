import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function Auth() {
  return (
    <>
      <div className="outer-box">
        <Outlet />
        <div className="circle c1"></div>
        <div className="circle c2"></div>
        <Toaster />
      </div>
    </>
  );
}

export default Auth;
