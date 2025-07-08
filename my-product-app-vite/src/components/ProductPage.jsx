import React, { useState, useEffect, useMemo } from "react";
import {
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { collection } from "firebase/firestore";
import { motion } from "framer-motion";
import { fetchRandomProductImage } from "../services/productImageService";
import { generateUniqueProductCode } from "../utils/productUtils";
import { useAuth } from "../contexts/AuthContext";
import { ArrowUpDown, ArrowUp, ArrowDown, Loader2, Plus } from "lucide-react";
import { db } from "../firebase";
import AuthModal from "./AuthModal";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

// Animation Variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function ProductPage() {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByPrice, setSortByPrice] = useState(null); // null, 'asc', or 'desc'
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  // Form state for new product
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, "products"), orderBy("name"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    if (!newProductName || !newProductPrice) {
      setFormError("Name and Price fields are required.");
      setIsSubmitting(false);
      return;
    }
    if (isNaN(parseFloat(newProductPrice))) {
      setFormError("Price must be a number.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Fetch a random image using the dedicated service
      const imageUrl = await fetchRandomProductImage();

      const uniqueCode = await generateUniqueProductCode();
      await addDoc(collection(db, "products"), {
        code: uniqueCode,
        name: newProductName,
        price: parseFloat(newProductPrice),
        userId: currentUser.uid, // Associate product with the current user
        imageUrl: imageUrl, // Add the fetched image URL
      });

      Swal.fire({
        icon: "success",
        title: "Product Added!",
        text: "Your new product has been added successfully.",
        showConfirmButton: false,
        timer: 2000,
      });
      // Reset form and close dialog
      setNewProductName("");
      setNewProductPrice("");
      setAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      setFormError("Failed to add product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSortByPrice = () => {
    setSortByPrice((currentSort) => {
      if (currentSort === null) return "asc";
      if (currentSort === "asc") return "desc";
      return null; // Cycle back to no sort
    });
  };

  const filteredProducts = useMemo(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!sortByPrice) {
      return filtered;
    }

    // Create a new array to avoid mutating the original
    return [...filtered].sort((a, b) => {
      if (sortByPrice === "asc") {
        return a.price - b.price;
      }
      return b.price - a.price; // 'desc'
    });
  }, [products, searchTerm, sortByPrice]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">Product List</h2>
          <div className="flex w-full md:w-auto items-center gap-2">
            <Input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button
              variant="outline"
              onClick={handleSortByPrice}
              className={
                sortByPrice
                  ? "border-orange-400 text-orange-500 hover:bg-orange-50 hover:text-orange-600 dark:border-orange-500 dark:text-orange-500 dark:hover:bg-orange-900/50"
                  : ""
              }
            >
              {sortByPrice === "asc" && <ArrowUp className="mr-2 h-4 w-4" />}
              {sortByPrice === "desc" && <ArrowDown className="mr-2 h-4 w-4" />}
              {sortByPrice === null && <ArrowUpDown className="mr-2 h-4 w-4" />}
              Sort by Price
            </Button>
            {currentUser && (
              <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="h-4 w-4" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={handleAddProduct}>
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                      <DialogDescription>
                        Fill in the details for the new product. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {formError && (
                        <p className="text-sm font-medium text-destructive">
                          {formError}
                        </p>
                      )}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={newProductName}
                          onChange={(e) => setNewProductName(e.target.value)}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                          Price
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={newProductPrice}
                          onChange={(e) => setNewProductPrice(e.target.value)}
                          className="col-span-3"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Product"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold">No Products Found</h3>
            <p className="text-muted-foreground mt-2">
              Click "Add Product" to get started.
            </p>
          </div>
        )}
      </main>
      <AuthModal />
    </div>
  );
}
