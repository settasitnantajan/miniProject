// src/components/Navbar.js
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const { currentUser, logout, openAuthModal } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Function to get initials from email or name
  const getInitials = (name) => {
    if (!name) return "U"; // Default User
    const parts = name.split("@")[0].split(/[. _-]/);
    return parts.length > 0 && parts[0].length > 0
      ? parts[0][0].toUpperCase()
      : "U";
  };

  const displayName = currentUser
    ? currentUser.displayName || currentUser.email.split("@")[0]
    : "";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-4">
        <Link className="flex items-center space-x-2" to="/">
          <img
            src="https://res.cloudinary.com/dmhuvzk6p/image/upload/v1751974210/MiniProject_tydklu.png"
            alt="Mini Project Logo"
            className="h-8"
          />
          <span className="hidden font-bold sm:inline-block">Mini Project</span>
        </Link>

        <div className="flex items-center space-x-2">
          {currentUser ? (
            <>
              <span className="hidden text-sm font-medium md:inline-block">
                Welcome, {displayName}
              </span>
              <DropdownMenu onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 p-1 h-auto rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={currentUser.photoURL || ""}
                        alt={displayName}
                      />
                      <AvatarFallback>
                        {getInitials(
                          currentUser.displayName || currentUser.email
                        )}
                      </AvatarFallback>
                    </Avatar>
                    {isDropdownOpen ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {displayName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentUser.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/my-products" className="w-full cursor-pointer">
                      My Products
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button variant="ghost" onClick={openAuthModal}>
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
