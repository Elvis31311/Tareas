import { supabase } from '../../Conection/conection';

export const updateProduct = async (
    id: number,
    updates: { nombre?: string; precio?: number; descripcion?: string; estado?: boolean }
) => {
    const { data, error } = await supabase
        .from('productos')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) {
        console.error('Error updating product:', error.message);
        throw new Error(error.message);
    }
    return data;
};
