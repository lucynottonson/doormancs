"use client";

import { useState } from "react";
import { generateUniqueUsername } from "@/lib/supabase/usernames";

interface Props {
  onGenerate: (name: string) => void;
}

export default function UsernameGenerator({ onGenerate }: Props) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  async function shuffle() {
    setError("");
    try {
      const name = await generateUniqueUsername();
      setUsername(name);
      
      onGenerate(name); 
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="flex flex-col gap-2 max-w-sm">
      <p>Suggested: <strong>{username || "—"}</strong></p>

      <div className="flex gap-2">
        <button
          type="button" 
          onClick={shuffle}
          className="px-3 py-1 bg-black text-white rounded"
        >
          Shuffle
        </button>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}