"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { github } from "../utils/Icons";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import { useGlobalContext } from "../context/globalContext";

function Navbar() {
  const router = useRouter();
  const { state } = useGlobalContext();

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left text-amber-700 font-bold text-3xl">
        KURUKSHETRA
      </div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />
<<<<<<< HEAD
=======

          <Button
            className="chat-ai-btn flex items-center gap-2"
            onClick={() => {
              router.push("/chat-with-ai")
            }}
          >
            Chat with AI
          </Button>
>>>>>>> b0143d015605e34fbd2aa6b35685478eba96716d
        </div>
      </div>
    </div>
  );
}

export default Navbar;
