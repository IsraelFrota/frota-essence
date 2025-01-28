"use client";

import { useState } from "react";
import Signin from "./ui/signin/page";
import Signup from "./ui/signup/page";

export default function Home() {
  const [isSignin, setIsSignin] = useState<boolean>(true);
  
  return (
    <>
      {
        isSignin ? 
        <Signin handleSwapForm={() => setIsSignin(false)} /> : 
        <Signup handleSwapForm={() => setIsSignin(true)} /> 
      }
    </>
  );
}
