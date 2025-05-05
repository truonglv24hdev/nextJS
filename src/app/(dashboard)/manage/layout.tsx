import PageNotFound from "@/app/not-found";
import { getUserInfo } from "@/lib/actions/user.actions";
import { EUserRole } from "@/types/enums";
import { auth } from "@clerk/nextjs/server";
import React, { use } from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  const user = await getUserInfo({ userId });
  if (user && user.role !== EUserRole.ADMIN) return <PageNotFound />;
  return <div>{children}</div>;
};

export default layout;
