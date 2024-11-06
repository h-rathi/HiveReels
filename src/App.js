import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import VideoCard from "./Components/VideoCard";
import HivePostSubmission from "./Components/HivePostSubmission"; // Import the HivePostSubmission component
import db from "./firebase";
const dhive = require("@hiveio/dhive");

let opts = {}; // connect to production server
opts.addressPrefix = "STM";
opts.chainId = "beeab0de00000000000000000000000000000000000000000000000000000000";
const client = new dhive.Client("https://api.hive.blog");

const getPosts = async () => {
  const query = {
    tag: "hive",
    limit: 20,
  };

  try {
    const result = await client.database.getDiscussions("created", query);
    console.log("Response received:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

function App() {
  const [reels, setReels] = useState([]);

  const fetchPosts = async () => {
    const newPosts = await getPosts();
    setReels((prevReels) => [...prevReels, ...newPosts]);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Route for / path to show VideoCard components */}
          <Route
            path="/"
            element={
              <div className="app__videos">
                {reels.map(({ author, avatarSrc, url, title, body, active_votes, replies }) => (
                  <VideoCard
                    key={url}
                    body={body}
                    title={title}
                    channel={author}
                    avatarSrc={'avatarSrc'}
                    url={url}
                    likes={active_votes.length}
                    shares={replies.length}
                  />
                ))}
              </div>
            }
          />

          {/* Route for /submit path to show HivePostSubmission component */}
          <Route path="/submit" element={<HivePostSubmission />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
