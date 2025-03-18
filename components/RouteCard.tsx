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

// Update the interface to make the removed fields optional
interface RouteCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
}

// Update the component props to remove the unused parameters
export default function RouteCard({
  id,
  title,
  description,
  date,
  imageUrl = "/placeholder.svg?height=100&width=200",
}: RouteCardProps) {
  const [mounted, setMounted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleEdit = (id: string) => {
    console.log(`Editing route ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Deleting route ${id}`);
  };

  const handleUse = (id: string) => {
    console.log(`Using route ${id}`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-[100px]">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={`Map preview for ${title}`}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(id)}
                className="text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="line-clamp-2 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-xs text-muted-foreground">
          Saved on {new Date(date).toLocaleDateString()}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end pt-2">
        <Button onClick={() => handleUse(id)} size="sm" className="gap-1">
          <Navigation className="h-3 w-3" />
          Use
        </Button>
      </CardFooter>
    </Card>
  );
}
