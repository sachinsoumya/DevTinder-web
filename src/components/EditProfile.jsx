import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
const EditProfile = ({ userData }) => {
  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  const [age, setAge] = useState(userData?.age);
  const [gender, setGender] = useState(userData?.gender);
  const [about, setAbout] = useState(userData?.about);
  const [showToast, setShowToast] = useState(false);

  const [error, setError] = useState("");

  const [photoUrl, setPhotoUrl] = useState(userData?.photoUrl);

  const dispatch = useDispatch();

  //   const [error, setError] = useState("");
  //   const [error , setError] = useState("");

  console.log(userData);

  const saveProfile = async () => {
    try {
      const saveProfileData = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        {
          withCredentials: true,
        }
      );

      console.log(saveProfileData);

      dispatch(addUser(saveProfileData?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(!setShowToast);
      },3000);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.errors?.gender?.message);
    }
  };
  return (
    <>
      <div className="flex">
        <div className="card w-96 bg-base-300 shadow-sm mx-auto my-10">
          <div className="card-body">
            <div className="flex justify-center">
              {" "}
              <h2 className="text-3xl font-bold">Edit Profile</h2>
            </div>

            <div className="flex justify-center">
              <div className="w-full">
                <fieldset className="fieldset ">
                  <legend className="fieldset-legend py-3">
                    FirstName:{firstName}
                  </legend>
                  <input
                    type="text"
                    className="input w-6/6"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-3">
                    lastName:{lastName}
                  </legend>
                  <input
                    type="text"
                    className="input w-6/6"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-3">Age:{age}</legend>
                  <input
                    type="text"
                    className="input w-6/6"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                {/* <fieldset className="fieldset">
                <legend className="fieldset-legend py-3">
                  Gender:{gender}
                </legend>
                <input
                  type="text"
                  className="input w-6/6"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset> */}

                <fieldset>
                  <legend className="fieldset-legend py-3">
                    Gender:{gender}
                  </legend>
                  <select
                    defaultValue="Pick a color"
                    className="select w-6/6"
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                  >
                    <option selected>male</option>
                    <option>female</option>
                    <option>others</option>
                  </select>
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-3">PhotoUrl:</legend>
                  <input
                    type="text"
                    className="input w-6/6"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-3">
                    About:{about}
                  </legend>
                  <input
                    type="text"
                    className="input w-6/6"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-error text-center my-1">{error}</p>
              {/* <p className="text-red-500 text-center py-2">{error} </p> */}
              <button
                className="btn btn-primary btn-block"
                onClick={() => saveProfile()}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, gender, age, photoUrl, about }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
