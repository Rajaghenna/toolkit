"use server";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <>
      <h1 className="text-2xl">{JSON.stringify(session)}</h1>
      <form
        className="h-screen w-screen flex flex-col justify-center items-center gap-10"
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <div>
          <p>{session?.user?.name}</p>
          <p>{session?.user?.email}</p>
        </div>
        <Button variant="default" type="submit">
          SignOut
        </Button>
      </form>
    </>
  );
};

export default SettingsPage;
