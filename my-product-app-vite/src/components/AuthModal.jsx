import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Login from "./Login";
import UserSignUp from "./UserSignUp";
import { useAuth } from "../contexts/AuthContext";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={closeAuthModal}>
      <DialogContent className="sm:max-w-[425px] backdrop-blur-md border-none shadow-lg">
        <DialogHeader>
          <DialogTitle>{isSignUp ? "Create Account" : "Login"}</DialogTitle>
          <DialogDescription>
            {isSignUp
              ? "Enter your email and create a password to sign up."
              : "Enter your email and password to log in to your account."}
          </DialogDescription>
        </DialogHeader>
        {isSignUp ? (
          <UserSignUp onSuccess={closeAuthModal} />
        ) : (
          <Login onSuccess={closeAuthModal} />
        )}
        <div className="mt-4 text-center text-sm">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button
                onClick={toggleAuthMode}
                className="underline text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                Log In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={toggleAuthMode}
                className="underline text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
