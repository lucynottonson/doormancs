"use client";

import { useState, useEffect } from "react";
import { generateUniqueUsername } from "@/lib/supabase/usernames";

interface Props {
  onGenerate: (name: string) => void;
}

export default function UsernameGenerator({ onGenerate }: Props) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function shuffle() {
    setError("");
    setLoading(true);
    try {
      const name = await generateUniqueUsername();
      setUsername(name);
      onGenerate(name); 
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }
 
  useEffect(() => {
    shuffle();
  }, []);

  return (
    <div className="flex flex-col gap-2 max-w-sm">
      <p>CURRENT USERNAME: <strong>{username || (loading ? "Generating..." : "—")}</strong></p>

      <div className="flex gap-2">
        <button
          type="button" 
          onClick={shuffle}
          disabled={loading}
          className="px-3 py-1 bg-black text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "..." : "NEW ONE"}
        </button>
        <p>
          you cannot change your username later. everyone gets a unique username and there are currently about 2.6 million possible combinations. I will add more words at one point and then there will be more.  
        </p>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}