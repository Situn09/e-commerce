import React, { useEffect, useState } from "react";
import useFetchCurrentUser from "../util/fetchCurrentUser";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import BagItem from "../components/BagItem";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store/authStatus";
import { bagActions } from "../store/bagSlice";

const User = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const authStatus = useSelector((store) => store.authStatus);
  const bag = useSelector((store) => store.bag);
  const dispatch = useDispatch();
  const { fetchUser } = useFetchCurrentUser();

  useEffect(() => {
    fetchUser().then((user) => {
      setUserData(user);
      console.log(user);
    });
  }, [authStatus]);

  const handleSignOut = async () => {
    await signOut(auth);
    dispatch(authAction.changeAuthStatus(false));
    console.log("before logout bagitem: ", bag);
    dispatch(bagActions.removeAllItem());
    console.log("after logout bagitem: ", bag);
    navigate("/");
  };
  return (
    <div className="detail-item-container">
      <div className="user-icon ">
        <BsFillPersonFill />
      </div>
      <div className="user-detail">
        <h4 className="user-name">{userData?.fullName}</h4>
        <h4 className="user-email">{userData?.email}</h4>
        <button
          type="button"
          className="btn  btn-danger"
          style={{ marginTop: 10 }}
          onClick={handleSignOut}
        >
          Logout
        </button>
      </div>
      <div className="reviews">
        <h1>Purchase History</h1>
        {userData?.purchaseList?.map((item) => (
          <BagItem item={item} showRemoveButton={false} />
        ))}
      </div>
    </div>
  );
};

export default User;
