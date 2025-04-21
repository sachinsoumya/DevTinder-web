import { useEffect } from "react";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../Utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.requests);

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

  if (request.length === 0) return <div>No requests found</div>;

  return (
    <div className="flex justify-center items-center">
      <div>
        {request.map((item) => (
          <div className="card bg-neutral text-neutral-content w-96 my-2" key={item.id}>
            <div className="card-body items-center text-center">
                <div className="flex justify-around w-6/12">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={item.fromUserId.photoUrl} />
                    </div>
                  </div>

              <h2 className="card-title">{item.fromUserId.firstName}</h2>
              </div>
              <p>{item.fromUserId.about}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Accept</button>
                <button className="btn btn-ghost">Deny</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Requests;
