import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col p-0 gap-0">
      {/* Image Skeleton */}
      <Skeleton className="w-full aspect-video" />

      <div className="p-4 flex-grow flex flex-col">
        <CardHeader className="p-0">
          {/* Title Skeleton */}
          <Skeleton className="h-6 w-3/4" />
          {/* Description Skeleton */}
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="p-0 mt-2">
          {/* Price Skeleton */}
          <Skeleton className="h-8 w-1/3" />
        </CardContent>
      </div>
    </Card>
  );
}
