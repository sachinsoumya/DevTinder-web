import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(" ");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      // console.log(res);
      dispatch(addUser(res.data));

      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );

      console.log(res);

      dispatch(addUser(res?.data?.data));

      navigate("/profile")

;
      console.log(res);
    } catch (err) {
      setError(err?.response?.data)
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center md:h-[700px] lg:h-auto" >
      <div className="card w-96 bg-base-300 shadow-sm mx-auto my-10">
        <div className="card-body">
          <div className="flex justify-center">
            {" "}
            <h2 className="text-3xl font-bold">
              {" "}
              {isLogin ? "Login" : "Sign up"}
            </h2>
          </div>

          <div className="flex justify-center">
            <div className="w-full">
              {!isLogin && (
                <>
                  <fieldset className="fieldset ">
                    <legend className="fieldset-legend py-3">
                      First Name:{firstName}
                    </legend>
                    <input
                      type="text"
                      className="input w-6/6"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="fieldset ">
                    <legend className="fieldset-legend py-3">
                      Last Name:{lastName}
                    </legend>
                    <input
                      type="text"
                      className="input w-6/6"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </fieldset>
                </>
              )}

              <fieldset className="fieldset ">
                <legend className="fieldset-legend py-3">Email:{email}</legend>
                <input
                  type="text"
                  className="input w-6/6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend py-3">
                  Password:{password}
                </legend>
                <input
                  type="text"
                  className="input w-6/6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-red-500 text-center py-2">{error} </p>
            <button
              className="btn btn-primary btn-block"
              onClick={isLogin ? () => handleLogin() : () => handleSignUp()}
            >
             {isLogin ? "Login" : "Sign up" }
            </button>
            {isLogin ? (
              <p className="my-2 text-white cursor-pointer">
                New User ?{" "}
                <span onClick={() => setIsLogin(!isLogin)} className="hover:underline">Sign up Now</span>
              </p>
            ) : (
              <p className="my-2 text-white cursor-pointer">
                Already have an account ?
                <span onClick={() => setIsLogin(!isLogin)} className="hover:underline">Login Now</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
