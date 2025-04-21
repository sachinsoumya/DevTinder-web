import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
const Profile = () => {
  const user = useSelector((store) => store.user);
  console.log(user);
  return  (
    user && <div>
      {/* <h1>Profile</h1> */}
      <EditProfile userData = {user} />
    </div>
  );
};

export default Profile;
