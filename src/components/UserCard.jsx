import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../Utils/feedSlice";

const UserCard = ({ user }) => {
  console.log(user);
  const dispatch = useDispatch();
  const { firstName, lastName, gender, age, photoUrl, about } = user;

  const handleRequest = async (status) => {
    try {
      const sendRequest = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + user._id,
        {},
        { withCredentials: true }
      );

      console.log(sendRequest);
      dispatch(removeFeed(user._id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="ProfileImage" />
        </figure>
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title">{`${firstName} ${lastName} ${age}`}</h2>
            <div className="badge badge-accent">{gender}</div>
          </div>

          <p>{about}</p>
          <div className="card-actions flex justify-center">
            <button
              className="btn btn-primary"
              onClick={() => handleRequest("interested")}
            >
              Interested
            </button>
            <button
              className="btn btn-error"
              onClick={() => handleRequest("ignored")}
            >
              Rejected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
