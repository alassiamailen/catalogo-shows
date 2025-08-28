import { supabase } from './supabaseClient';

export interface Novel {
    id: number;
    title: string;
    description: string;
    cover: string;
    id_categorie: number;
}

/// Get all novels
export async function getNovels(): Promise<Novel[]> {
    const { data, error } = await supabase.from("novels").select('*');   
    if(error){
        console.error("Error fetching novels:", error.message);
        throw new Error(error.message);
    }
    return data;
}

/// Get novel by id
export async function getNovelById(id: number): Promise<Novel> {
    const { data, error } = await supabase.from("novels").select('*').eq('id', id).single();

    if(error){
        console.error(`Error fetching novela by id ${id}:`, error.message);
        throw new Error(error.message);
    }
    return data;
}