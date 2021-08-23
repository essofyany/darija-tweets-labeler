import Head from "next/head";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Wrapper from "../components/WrapperCard";
import { tweetsAtom } from "../context/atoms";

function HomePage() {
  const [{ chunk: tweets }, setTweets] = useRecoilState(tweetsAtom);

  async function fetchTweets() {
    try {
      const res = await fetch("/api/server");
      const data = await res.json();
      setTweets(data);
    } catch (error) {
      throw new Error("something went wrong!!!!!", error);
    }
  }
  useEffect(() => {
    tweets.length === 0 && fetchTweets();
  }, [tweets]);

  return (
    <>
      <Head>
        <title>Tweets Labeler</title>
      </Head>
      <section className="app">
        <div className="container">
          <ul className="tweet-list">
            {tweets.length > 0 &&
              tweets.map((item) => (
                <li className="tweet-item" key={item._id}>
                  <Wrapper item={item} />
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default HomePage;
