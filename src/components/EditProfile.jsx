import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";
import { useDispatch , useSelector } from "react-redux";
import { addUser } from "../Utils/userSlice";
import Profilepic from "./Profilepic";
const EditProfile = () => { //*userData is passed as props
  const userData = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  const [age, setAge] = useState(userData?.age || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const [about, setAbout] = useState(userData?.about || "");
  const [showToast, setShowToast] = useState(false);
  

  const [error, setError] = useState("");

  const [photoUrl, setPhotoUrl] = useState(userData?.photoUrl);

  const dispatch = useDispatch();

  //   const [error, setError] = useState("");
  //   const [error , setError] = useState("");

  console.log(userData);
  const formData = new FormData();

  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("age", age);
  formData.append("gender", gender);
  formData.append("about", about);
  formData.append("photoUrl", photoUrl);

  console.log(formData.get("photoUrl"));

  console.log("rendering...... in edit-profile");

  console.log(photoUrl);

  

  const saveProfile = async () => {
    try {
      const saveProfileData = await axios.patch(
        BASE_URL + "/profile/edit",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(saveProfileData);

      dispatch(addUser(saveProfileData?.data?.data));
      if (error) setError("");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(!setShowToast);
      }, 3000);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.errors?.gender?.message);
    }
  };
  return (
    <>
      <div className=" grid lg:grid-cols-2 sm:grid-cols-1 gap-2 py-2 ">
        <div className="card w-96 bg-base-300 shadow-sm mx-auto my-10 order-2 lg:order-1">
          <div className="card-body">
            <div className="flex justify-center">
              {" "}
              <h2 className="text-3xl font-bold font-(family-name: Helvetica) ">
                Edit Profile
              </h2>
            </div>

            <div className="flex justify-center">
              <div className="w-full">
                <Profilepic setPhotoUrl={setPhotoUrl} photoUrl={photoUrl}  />
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
                    className="select w-6/6"
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                  >
                    <option>male</option>
                    <option>female</option>
                    <option>others</option>
                  </select>
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend py-3">
                    PhotoUrl:{photoUrl.name}
                  </legend>
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
        <div className="m-auto order-1 lg:order-2 ">
          <UserCard
            user={{ firstName, lastName, gender, age, photoUrl, about , id:userData._id }}
          />
        </div>
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
