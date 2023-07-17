"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div>
        <button
          onClick={() => signOut()}
          type="button"
          className="btn btn-outline btn-primary btn-sm"
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <button
      onClick={() => signIn()}
      type="button"
      className="btn btn-outline btn-primary btn-sm"
    >
      Sign In
    </button>
  );
};

export default SigninButton;
