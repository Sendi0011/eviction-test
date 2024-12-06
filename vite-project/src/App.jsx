// App.js
import React, { useState, useEffect } from "react";
import { fetchPosts, fetchUsers } from "./api";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  // Fetch posts and users data
  useEffect(() => {
    const getPostsAndUsers = async () => {
      const postsData = await fetchPosts();
      const usersData = await fetchUsers();
      setPosts(postsData);
      setUsers(usersData);
    };

    getPostsAndUsers();
  }, []);

  // Handle bookmark functionality
  const toggleBookmark = (postId) => {
    setBookmarkedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  // Handle follow functionality
  const toggleFollow = (userId) => {
    setFollowedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div>
      <h1>Posts</h1>
      <div className="posts">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button
              onClick={() => toggleBookmark(post.id)}
              className={bookmarkedPosts.includes(post.id) ? "bookmarked" : ""}
            >
              {bookmarkedPosts.includes(post.id) ? "Bookmarked" : "Bookmark"}
            </button>
          </div>
        ))}
      </div>

      <h1>Users</h1>
      <div className="users">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <button onClick={() => toggleFollow(user.id)}>
              {followedUsers.includes(user.id) ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))}
      </div>

      {/* Show Bookmarked Posts */}
      <h1>Bookmarked Posts</h1>
      <div className="posts">
        {posts
          .filter((post) => bookmarkedPosts.includes(post.id))
          .map((post) => (
            <div className="post-card" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
      </div>

      {/* Show Followed Users */}
      <h1>Followed Users</h1>
      <div className="users">
        {users
          .filter((user) => followedUsers.includes(user.id))
          .map((user) => (
            <div className="user-card" key={user.id}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
