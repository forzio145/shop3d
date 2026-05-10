import { supabase } from '@/lib/supabase';

export interface Product {
  id: string;
  nome: string;
  descrizione: string;
  prezzo: number;
  categoria: string;
  immagini: string[];
  disponibile: boolean;
  dimensioni_stampa: string;
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('disponibile', true);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data as Product[];
}
