"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const obj = {
  creators: {
    id: [],
    username: [],
    email: [],
  },
  tag: {
    id: [],
    tagArr: [],
  },
  prompts: {
    id: [],
    promptArr: [],
  },
};

const Feed = () => {
  const [searchText, setsearchText] = useState("");
  const [forSearch, setforSearch] = useState({
    creators: {
      id: [],
      username: [],
      email: [],
    },
    tag: {
      id: [],
      tagArr: [],
    },
    prompts: {
      id: [],
      promptArr: [],
    },
  });
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setposts(data);
    };
    fetchPosts();
  }, []);

  const fillSearch = () => {
    let N = obj;
    console.log(obj);
    for (let post of posts) {
      N.creators.id.push(post.creator._id);
      N.creators.username.push(post.creator.username);
      N.creators.email.push(post.creator.email);
      N.tag.id.push(post._id);
      N.tag.tagArr.push(post.tag);
      N.prompts.id.push(post._id);
      N.prompts.promptArr.push(post.prompt);
    }
    setforSearch((prev) => {
      return (prev = N);
    });
  };

  const handleSearchChange = (e) => {
    fillSearch();
    e.preventDefault();
    setsearchText(e.target.value);
    setTimeout(() => {
      if (searchText) {
      }
    }, 1000);
  };

  return (
    <section className="feed">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative w-full flex-center"
        action=""
      >
        <input
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
          type="text"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};
export default Feed;
