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
    <div className="content-box">
      <p className="mb-sm">
        CURRENT USERNAME: <span className="text-accent">{username || (loading ? "Generating..." : "—")}</span>
      </p>

      <div className="mb-md">
        <button
          type="button" 
          onClick={shuffle}
          disabled={loading}
          className="btn btn-primary mb-sm"
        >
          {loading ? "..." : "NEW ONE"}
        </button>
        <p className="text-secondary">
          you cannot change your username later. everyone gets a unique username and there are currently about 2.6 million possible combinations. I will add more words at one point and then there will be more.  
        </p>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}
    </div>
  );
}