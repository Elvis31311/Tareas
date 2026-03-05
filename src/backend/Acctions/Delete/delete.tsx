import { supabase } from '../../Conection/conection';

export const deleteProduct = async (id: number) => {
    const { data, error } = await supabase
        .from('productos')
        .delete()
        .eq('id', id)
        .select();

    if (error) {
        console.error('Error deleting product:', error.message);
        throw new Error(error.message);
    }
    return data;
};
