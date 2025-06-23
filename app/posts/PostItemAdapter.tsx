"use client";

import { useState } from "react";
import ItemCard from "@/components/ItemCard";
import SaveModal from "@/components/SaveModal";
import { deleteLocation } from "@/lib/locations";
import { toast, Toaster } from "sonner";

export type Post = {
  id: string;
  description: string;
  address: string;
  images?: string[];
  createdAt: Date;
};

interface PostItemAdapterProps {
  post: Post;
  onDeleteSuccess?: (postId: string) => void;
}

export default function PostItemAdapter({
  post,
  onDeleteSuccess,
}: PostItemAdapterProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentPostData, setCurrentPostData] = useState<null | {
    id: string;
    title: string;
    description: string;
  }>(null);
  const [currentPost, setCurrentPost] = useState<Post>(post);

  const handleDelete = async (id: string) => {
    const result = await deleteLocation(id);
    if (result?.error) {
      console.error("PostItemAdapter: Error deleting post - ", result.error);
      toast.warning(`Error deleting post: ${result.error}`);
    } else {
      if (onDeleteSuccess) {
        onDeleteSuccess(id);
      }
    }
  };

  const handleEdit = async () => {
    setCurrentPostData({
      id: currentPost.id,
      title: currentPost.address || "No address provided",
      description: currentPost.description || "",
    });
    setEditDialogOpen(true);
  };

  const handlePostUpdate = (newDescription: string) => {
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
