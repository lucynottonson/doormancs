import { one, two } from "@/lib/usernameWords";
import { supabase } from "@/lib/supabase/client";

function pickRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function generateUniqueUsername(): Promise<string> {
  let username = "";
  let exists = true;
  let attempts = 0;

  while (exists && attempts < 100) {
    const words = [pickRandom(one), pickRandom(two), pickRandom(one)];
    username = words.join("-");

    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .single();

    if (!data) exists = false; // dis is so you can tell the username is unique
    attempts++;
  }

  if (exists) throw new Error("Could not generate a username.");
  return username;
}
