import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../Utils/feedSlice";
import { useState } from "react";

const UserCard = ({ user }) => {
  console.log(user);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.user);
  console.log(loggedInUser);
  const [check, setCheck] = useState(false);

  if (loggedInUser._id === user.id) {
    console.log("same user");
    !check && setCheck(true);
  }

  console.log({ check });

  const { firstName, lastName, gender, age, photoUrl, about } = !check
    ? user
    : loggedInUser;

  const handleRequest = async (status) => {
    try {
      const sendRequest = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + user._id,
        {},
        { withCredentials: true }
      );

      console.log(sendRequest);
      dispatch(removeUserFromFeed(user._id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="card bg-base-300  w-96 shadow-sm my-2 p-2">
        <figure>
          <img
            src={photoUrl}
            alt="ProfileImage"
            className="object-cover h-96"
          />
        </figure>
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title">
              {`${firstName} ${lastName}`} {age && <span>{`${age}`}</span>}
            </h2>
            {gender && <div className="badge badge-accent">{gender}</div>}
          </div>

          <p>{about}</p>
          <div className="card-actions flex justify-center">
            <button
              className={`btn btn-primary  ${check && `btn-disabled`} `}
              onClick={() => handleRequest("interested")}
            >
              Interested
            </button>
            <button
              className={`btn btn-error ${check && "btn-disabled"}  `}
              onClick={() => handleRequest("ignored")}
            >
              Ignored
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
