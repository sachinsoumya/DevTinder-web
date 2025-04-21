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

  if (connections) return;

  if (connections.length === 0) return <h1>No connections Found</h1>;

  return (
    <div>
      <h2>My Connections</h2>
    </div>
  );
};

export default Connections;
