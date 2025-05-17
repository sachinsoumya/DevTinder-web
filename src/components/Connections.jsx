import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../Utils/constants";
import { addConnection } from "../Utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const getConnections = async () => {
    try {
      const connections = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log(connections.data.data);

      dispatch(addConnection(connections?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return (<div  className="flex justify-center"><h1>No connections Found</h1></div>);

  return (
    <div className="py-2">
      <h2 className="text-center font-semibold text-2xl font-(family-name:Helvetica) text-nuetral-content py-2">
        My Connections
      </h2>
      <div className="flex justify-center items-center">
        <div>
          {connections.map((item) => (
            <div
              className="card w-96 bg-base-300 card-sm shadow-sm my-2"
              key={item._id}
            >
              <div className="card-body ">
                <div className="flex ">
                  {" "}
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={item.photoUrl} />
                    </div>
                  </div>
                  <div className="mx-2">
                    <h2 className="card-title">{item.firstName}</h2>
                    <div>
                      {item.age} , {item.gender}
                    </div>
                  </div>
                </div>

                <p>{item.about}</p>
                {/* <div className="justify-end card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
