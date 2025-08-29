import { supabase } from './supabaseClient';

export interface Chapter {
    id: number;
    id_novel: number;
   number: number;
   title: string;
   image: string;
}
/// Get Chapter by Id Novel
export async function getChaptersByNovel(novelId: number): Promise<Chapter[]> {
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('id_novel', novelId)
      .order('number', { ascending: true });
  
      if(error){
        console.error("Error fetching chapters:", error.message);
        throw new Error(error.message);
    }
    return data;
  }