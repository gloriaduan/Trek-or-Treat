"use client";

import { useEffect, useState } from "react";
import PostItemAdapter from "./PostItemAdapter";
import { getUserLocations } from "@/lib/locations";
import { toast } from "sonner";
import HalloweenLoading from "@/components/SpookyLoading";

export type Post = {
  id: string;
  description: string;
  address: string;
  images?: string[];
  createdAt: Date;
};

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { locations: fetchedPosts, error: fetchError } =
          await getUserLocations();

        if (fetchError) {
          setError(fetchError as string);
        } else {
          setPosts(fetchedPosts || []);
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostDelete = (postId: string) => {
    // Remove the post from the state
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId)
    );
    toast.success("Post deleted successfully.");
  };

  if (loading) {
    return <HalloweenLoading />;
  }

  return (
    <>
      <div className="dark-bg flex-1">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">My Posted Locations</h1>
          {error && (
            <div className="text-red-500 mb-4">
              Error loading posts: {error}
            </div>
          )}
          {posts.length === 0 && !loading ? (
            <p>You haven&apos;t saved any routes yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: Post) => (
                <PostItemAdapter
                  key={post.id}
                  post={post}
                  onDeleteSuccess={handlePostDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
