import { supabaseAction } from "@/libs/supabase-server";
import { Song } from "@/types";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = supabaseAction();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session?.user?.id)
    .order("created_at", { ascending: false });

  if (!data) return [];

  return data.map((item) => ({
    ...item.songs,
  }));
};

export default getLikedSongs;
