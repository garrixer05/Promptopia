"use client";
import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useParams } from "next/navigation";

const UserProfile = () => {
  const [posts, setposts] = useState([]);
  const {id} = useParams()
  const [username, setusername] = useState("")
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setposts(data);
      setusername(data[0].creator.username)
    };
    fetchPosts();
  }, []);

  const handleDelete = ()=>{}
  const handleEdit=()=>{}

  return (
    <Profile
      name={`${username}'s`}
      desc="Welcome to profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
