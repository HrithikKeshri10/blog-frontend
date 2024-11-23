"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://blog-backend-nine-swart.vercel.app/api/posts",
        {
          credentials: "include",
        }
      );
      if (response.status === 401) {
        router.push("/login");
        return;
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://blog-backend-nine-swart.vercel.app/api/post",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        }
      );

      if (response.ok) {
        setNewPost({ title: "", content: "" });
        fetchPosts();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const authors = [...new Set(posts.map((post) => post.authorId._id))].map(
    (id) => {
      const post = posts.find((p) => p.authorId._id === id);
      return { id, email: post.authorId.email };
    }
  );

  const filteredPosts = selectedAuthor
    ? posts.filter((post) => post.authorId._id === selectedAuthor)
    : posts;

  return (
    <div className="min-h-screen relative">
      <img
        src="/image.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 container mx-auto p-4 space-y-8">
        <div className="bg-white/90 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Create Post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Post Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              className="w-full p-3 border rounded"
              required
            />
            <textarea
              placeholder="Post Content"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              className="w-full p-3 border rounded h-32"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Post
            </button>
          </form>
        </div>

        <div className="bg-white/90 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Filter Posts</h2>
          <div className="flex gap-4">
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="flex-1 p-3 border rounded"
            >
              <option value="">All Authors</option>
              {authors.map(({ id, email }) => (
                <option key={id} value={id}>
                  {email}
                </option>
              ))}
            </select>
            <button
              onClick={() => setSelectedAuthor("")}
              className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
            >
              Reset
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Posts</h2>
          {isLoading ? (
            <div className="text-white text-center">Loading posts...</div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white/90 p-6 rounded-lg shadow"
                >
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-gray-700 mt-3">{post.content}</p>
                  <div className="text-sm text-gray-600 mt-4 flex justify-between">
                    <span>By: {post.authorId.email}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
