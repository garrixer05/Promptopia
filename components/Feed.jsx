"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { searchByEmail, searchByTag, searchByUsername, searchInPompt } from "@utils/searchFuncs";

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
let timeOut;

const Feed = () => {
  const [posts, setposts] = useState([]);
  const [postsCache, setPostsCache] = useState([])
  const [searchText, setsearchText] = useState("");
  const [forSearch, setforSearch] = useState(obj);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setposts(data);
      setPostsCache(data);
    };
    fetchPosts();
  }, []);

  const fillSearch = () => {
    let N = obj;
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
    e.preventDefault();
    setsearchText(e.target.value);
  };
  const handleKeyUp = (e)=>{
    fillSearch();
    if (timeOut){
      clearTimeout(timeOut)
    }
    timeOut = setTimeout(() => {
      if (searchText) {
        const {creators, tag:{tagArr}} = forSearch;
        let newPostObj = {
          byUsername:[],
          byEmail:[],
          byTag:[]
        }
        for (let i=0; i<creators.email.length; i++){
          let username = creators.username[i]
          if(username.toLowerCase().match(searchText)){
            let newPosts = searchByUsername(username, posts);
            newPostObj.byUsername.push(...newPosts)
            break;
          }
        }
        for(let i=0; i<creators.email.length;i++){

          let email = creators.email[i]
         if(email.match(searchText)){
           let newPosts = searchByEmail(email,posts);
           newPostObj.byEmail.push(...newPosts)
           break;
         }
        }
        for (let i=0;i<tagArr.length; i++){
          if (tagArr[i].match(searchText)){
            let newPosts = searchByTag(tagArr[i],posts);
            newPostObj.byTag.push(...newPosts)
            break;
          }
        }
        let newPosts = searchInPompt(searchText,posts);

        setposts(
          [...newPosts,
          ...newPostObj.byEmail,
          ...newPostObj.byUsername,
          ...newPostObj.byTag
        ]);
      }else{
        setposts(postsCache)
      }
    }, 1000);
  }
  const handleTagClick = (e)=>{
    setsearchText(e)
    const newPosts = searchByTag(e, posts);
    setposts(newPosts);
  }

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
          onKeyUp={handleKeyUp}
          required
          className="search_input peer"
          type="text"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};
export default Feed;
