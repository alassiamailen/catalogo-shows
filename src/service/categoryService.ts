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