import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";

import { useDispatch } from "react-redux";
import { removeUser } from "../Utils/userSlice";
import { removeFeed } from "../Utils/feedSlice";

import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.jpg";
const NavBar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  console.log(user);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });

      dispatch(removeUser());
      dispatch(removeFeed());

      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300  w-full">
      <div className="flex-2">
        <div className="avatar">
          <div className="mask mask-squircle w-12 ">
            <Link to="/">
              {" "}
              <img src={Logo} className="object-cover" />
            </Link>
          </div>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-xl  font-[Circular] hidden md:inline-block "
        >
          DevTinder
        </Link>
      </div>
      <div className="flex gap-2 mx-2">
        {user && (
          <div className="dropdown dropdown-end flex justify-between">
            <div className="px-3 py-2 sm:text-xs md:text-sm">
              Welcome {user.firstName}
            </div>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {user && (
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl}
                  />
                </div>
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
