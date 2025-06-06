"use client";

import { useState } from "react"; // For managing a loading state if desired
import ItemCard from "@/components/ItemCard"; // Use ItemCard
import SaveModal from "@/components/SaveModal"; // Import SaveModal
import { deleteLocation } from "@/lib/locations";

export type Post = {
  id: string;
  description: string;
  address: string;
  images?: string[]; // Optional: if you want to use images later
  createdAt: Date; // Added createdAt
  // Add any other fields you expect from getUserLocations that PostItem might need
};

interface PostItemAdapterProps {
  post: Post;
  onDeleteSuccess?: (postId: string) => void;
}

export default function PostItemAdapter({
  post,
  onDeleteSuccess,
}: PostItemAdapterProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentPostData, setCurrentPostData] = useState<null | {
    id: string;
    title: string;
    description: string;
  }>(null);
  const [currentPost, setCurrentPost] = useState<Post>(post);

  const handleDelete = async (id: string) => {
    setIsProcessing(true);
    const result = await deleteLocation(id);
    if (result?.error) {
      console.error("PostItemAdapter: Error deleting post - ", result.error);
      alert(`Error deleting post: ${result.error}`);
    } else {
      if (onDeleteSuccess) {
        onDeleteSuccess(id);
      }
    }
    setIsProcessing(false);
  };

  const handleEdit = async (id: string) => {
    setCurrentPostData({
      id: currentPost.id,
      title: currentPost.address || "No address provided",
      description: currentPost.description || "",
    });
    setEditDialogOpen(true);
  };

  const handlePostUpdate = (id: string, newDescription: string) => {
    setCurrentPost((prev) => ({
      ...prev,
      description: newDescription,
    }));
  };

  const cardTitle = currentPost.address || "No address provided";
  const cardDescription = currentPost.description || "No description provided";

  const dateForCard = currentPost.createdAt || new Date().toISOString();

  return (
    <>
      {currentPostData && (
        <SaveModal
          isOpen={editDialogOpen}
          setIsOpen={setEditDialogOpen}
          type="edit"
          data={currentPostData}
          itemType="post"
          onSuccess={handlePostUpdate}
        />
      )}
      <ItemCard
        id={currentPost.id}
        title={cardTitle}
        description={cardDescription}
        date={dateForCard}
        imageUrl={currentPost.images?.[0]}
        itemType="post"
        onDelete={handleDelete}
        onEdit={handleEdit}
        primaryActionText="View"
        onPrimaryAction={(id) => (window.location.href = `/posts/${id}`)}
      />
    </>
  );
}
