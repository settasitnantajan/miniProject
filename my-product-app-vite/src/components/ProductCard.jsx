import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { PLACEHOLDER_IMAGE_URL } from "../config/constants";

export default function ProductCard({ product, onEdit, onDelete, variants }) {
  return (
    <motion.div
      variants={variants}
      layout
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="overflow-hidden flex flex-col p-0 gap-0 h-full group">
        <div className="w-full relative overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-video">
          <img
            src={product.imageUrl || PLACEHOLDER_IMAGE_URL}
            alt={`Image of ${product.name}`}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              if (e.currentTarget.src !== PLACEHOLDER_IMAGE_URL)
                e.currentTarget.src = PLACEHOLDER_IMAGE_URL;
            }}
          />
          {(onEdit || onDelete) && (
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {onEdit && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onEdit(product)}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit Product</span>
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete Product</span>
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <CardHeader className="p-0">
            <CardTitle className="truncate" title={product.name}>
              {product.name}
            </CardTitle>
            <CardDescription>SKU: {product.code}</CardDescription>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-2xl font-bold">
              $
              {(typeof product.price === "number"
                ? product.price
                : 0
              ).toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </p>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
