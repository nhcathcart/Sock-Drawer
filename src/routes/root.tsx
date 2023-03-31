import React from "react";
import { Link } from "react-router-dom";
import { LoginCard } from "../components/Login";
import { updatePassword, updateUsername } from "../reducers/loginReducer";

export function Root() {
  return (
    <div className="flex w-[100vw] h-[100vh] flex-col justify-center items-center">
      <LoginCard />
    </div>
  );
}
