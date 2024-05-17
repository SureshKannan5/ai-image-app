import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <div>
      <SignIn path="/sign-in" />
    </div>
  );
};

export default SignInPage;
