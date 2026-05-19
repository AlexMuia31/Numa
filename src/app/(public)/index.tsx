import React from "react";
import SignIn from "../../../components/clerk/SignIn";

export default function index() {
  return <SignIn signUpUrl="/sign-up" scheme="numa" />;
}
