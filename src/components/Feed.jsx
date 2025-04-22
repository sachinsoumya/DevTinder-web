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

  if (!feed) return <></>;

  if (feed.length === 0) return <h1>No new user Found</h1>;

  return (
    feed && (
      <div className="flex justify-around flex-wrap">
        {/* {feed?.map((item) => (
          <div key={item.id}>
            <UserCard user={item[]}  />
          </div>
        ))} */}

        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
