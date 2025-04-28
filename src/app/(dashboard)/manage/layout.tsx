import { auth } from "@clerk/nextjs/server";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();
  return <div>{children}</div>;
};

export default layout;
