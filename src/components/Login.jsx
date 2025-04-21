import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/constants";

const Login = () => {
  const [email, setEmail] = useState("gambhir@gmail.com");
  const [password, setPassword] = useState("Gouti@1234");
  const [error, setError] = useState(" ");

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
  return (
    <div>
      <div className="card w-96 bg-base-300 shadow-sm mx-auto my-10">
        <div className="card-body">
          <div className="flex justify-center">
            {" "}
            <h2 className="text-3xl font-bold">Login</h2>
          </div>

          <div className="flex justify-center">
            <div className="w-full">
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
              onClick={() => handleLogin()}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
