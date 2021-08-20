import { useEffect, useState } from "react";

function HomePage() {
  const [state, setstate] = useState([]);

  async function fetchTweets() {
    try {
      const res = await fetch("/api/server");
      const data = await res.json();
      setstate(data);
    } catch (error) {
      throw new Error("something went wrong!!!!!");
    }
  }

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {state.length > 0 &&
          state.map((item) => <li key={item.tweetId}>{item.text}</li>)}
      </ul>
    </div>
  );
}

export default HomePage;
