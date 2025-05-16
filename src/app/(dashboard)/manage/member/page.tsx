import UserManage from "@/components/member/MemberManage";
import { getAllUser } from "@/lib/actions/user.actions";
import { EUserStatus } from "@/types/enums";
import React from "react";

type PageProps = {
  searchParams: Promise<{
    page: number;
    limit: number;
    search?: string;
    status?: EUserStatus;
  }>;
};

const page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const userAll = await getAllUser({
    page: resolvedSearchParams.page || 1,
    limit: 10,
    search: resolvedSearchParams.search,
    status: resolvedSearchParams.status,
  });
  return (
    <UserManage
      users={userAll ? JSON.parse(JSON.stringify(userAll)) : []}
    ></UserManage>
  );
};

export default page;
