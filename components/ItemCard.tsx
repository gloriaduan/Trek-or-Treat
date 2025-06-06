"use client";

import { useState, useEffect } from "react";
import { Edit, MoreVertical, Navigation, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  date: Date | string;
  imageUrl?: string;
  primaryActionText?: string;
  onDelete: (id: string) => Promise<void> | void;
  onEdit: (id: string) => void;
  onPrimaryAction?: (id: string) => void;
  itemType?: "route" | "post" | string;
}

export default function ItemCard({
  id,
  title,
  description,
  date,
  imageUrl = "/placeholder.svg?height=100&width=200",
  primaryActionText,
  onDelete,
  onEdit,
  onPrimaryAction,
  itemType,
}: ItemCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleDeleteClick = async () => {
    await onDelete(id);
  };

  const handleEditClick = () => {
    onEdit(id);
  };

  const handlePrimaryActionClick = () => {
    if (onPrimaryAction) {
      onPrimaryAction(id);
    }
  };

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-lg pb-4 bg-black text-gray-100 border-neutral-800">
        <div className="relative h-[100px]">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={`Preview for ${title}`}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold text-white">
              {title}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-300 hover:bg-[hsl(17,83%,54%)]/50 hover:text-[hsl(0,0%,98%)] focus:bg-[hsl(17,83%,54%)]/50 focus:text-[hsl(0,0%,98%)]"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-neutral-900 border-neutral-700"
              >
                <DropdownMenuItem
                  onClick={handleEditClick}
                  className="text-gray-200 hover:bg-neutral-800 focus:bg-neutral-800 hover:text-white focus:text-white"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDeleteClick}
                  className="text-red-400 hover:bg-neutral-800 hover:text-red-300 focus:bg-neutral-800 focus:text-red-300"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription className="line-clamp-2 text-sm text-gray-300">
            {description || "No description"}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-2">
          <div className="text-xs text-gray-400">
            {itemType === "route" ? "Saved on" : "Posted on"}{" "}
            {new Date(date).toLocaleDateString()}
          </div>
        </CardContent>
        {onPrimaryAction && primaryActionText && (
          <CardFooter className="flex items-center justify-end pt-2 px-4">
            <Button
              onClick={handlePrimaryActionClick}
              size="sm"
              className="gap-1 bg-primary hover:bg-white text-white hover:text-black"
            >
              <Navigation className="h-3 w-3" />
              {primaryActionText}
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
