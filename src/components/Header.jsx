import { BsFillPersonFill } from "react-icons/bs";
import { FaFaceGrinHearts, FaBagShopping } from "react-icons/fa6";
import logo from "../assests/logo.svg";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFetchCurrentUser from "../util/fetchCurrentUser";
import { authAction } from "../store/authStatus";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";

const Header = () => {
  const bag = useSelector((store) => store.bag);
  const authStatus = useSelector((store) => store.authStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  const { fetchUser } = useFetchCurrentUser();
  useEffect(() => {
    fetchUser().then((user) => setUserData(user));
  }, [authStatus]);

  console.log(userData);
  console.log(auth.currentUser);
  const handleClick = () => {
    if (auth?.currentUser?.email) {
      dispatch(authAction.changeAuthStatus(true));
      navigate("/user");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <header>
      <div className="logo_container">
        <Link to="/">
          <img className="myntra_home" src={logo} alt="e-commerce " />
        </Link>
      </div>
      <nav className="nav_bar">
        <a href="#">Men</a>
        <a href="#">Women</a>
        <a href="#">Kids</a>
        <a href="#">Home & Living</a>
        <a href="#">Beauty</a>
        <a href="#">
          Studio <sup>New</sup>
        </a>
      </nav>
      <div className="search_bar">
        <span className="material-symbols-outlined search_icon">
          <FaSearch />
        </span>
        <input
          className="search_input"
          placeholder="Search for products, brands and more"
        />
      </div>
      <div className="action_bar">
        <div className="action_container" onClick={handleClick}>
          <BsFillPersonFill />
          <span className="action_name">{userData?.fullName ?? "profile"}</span>
        </div>

        <Link className="action_container bag" to="/bag">
          <FaBagShopping />
          <span className="action_name">Bag</span>
          <span className="bag-item-count">{bag.length}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
