import { supabase } from './supabaseClient';
import {Novel} from './novelService';

export interface Category {
    id: number;
   name: string;
}

/// Get all categories
export async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase.from('categories').select('*');
  
    if (error){ 
      console.error("Error fetching categories:", error.message);
      throw new Error(error.message);
    }
    return data;
  }

/// Get novel by id_category
export async function getNovelsByCategory(categoryId: number): Promise<Novel[]> {
  const { data, error } = await supabase
    .from('novels')
    .select('*')
    .eq('id_categorie', categoryId);

  if (error){ 
    console.error("Error fetching novel by id_category:", error.message);
    throw new Error(error.message);
  }
  return data;
}