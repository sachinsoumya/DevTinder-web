import { useEffect } from "react";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../Utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.requests);

  const handleRequest = async (status, _id) => {
    try {
      const reviewRequest = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      console.log(reviewRequest);

      dispatch(removeRequests(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const requests = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      console.log(requests.data.data);

      dispatch(addRequests(requests?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(request);

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!request) return;

  if (request.length === 0)
    return (
      <div className="font-(family-name:Helvetica) flex justify-center h-12/12 items-center p-2">
        <div className="h-80 md:h-screen bg-black opacity-50 w-10/12 rounded-xl flex justify-center items-center text-white"><h1>No Requests found</h1></div>
      </div>
    );

  return (
    <div className="flex justify-center items-center">
      <div>
        <p className="text-neutral-content py-2 text-center   font-(family-name: Helvetica) font-semibold text-2xl">
          Requests
        </p>
        {request.map((item) => (
          <div
            className="card bg-neutral text-neutral-content w-96 my-2"
            key={item._id}
          >
            <div className="card-body items-center  text-justify">
              <div className="flex justify-around w-6/12">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={item.fromUserId.photoUrl} />
                  </div>
                </div>

                <div>
                  <h2 className="card-title">{item.fromUserId.firstName}</h2>
                  {item.fromUserId.age}, {item.fromUserId.gender}
                  <p></p>
                </div>
              </div>
              <p>{item.fromUserId.about}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-outline btn-primary"
                  onClick={() => handleRequest("accepted", item._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-outline btn-ghost"
                  onClick={() => handleRequest("", item._id)}
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Requests;
