import { useEffect } from "react";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const feeds = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      console.log(feeds);
      dispatch(addFeed(feeds.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-around flex-wrap">
        {feed?.map((item, key) => (
          <div key={item.id}>
            <UserCard user={item}  />
          </div>
        ))}
      </div>
    )
  );
};

export default Feed;
