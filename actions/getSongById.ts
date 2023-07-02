import { supabaseAction } from "@/libs/supabase-server";
import { Song } from "@/types";

const getSongById = async (id: string): Promise<Song> => {
  const supabase = supabaseAction();

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongById;
