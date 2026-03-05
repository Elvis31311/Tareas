import { supabase } from '../../Conection/conection';

export const deleteTarea = async (id: number) => {
    const { data, error } = await supabase
        .from('tareas')
        .update({ estado: false })
        .eq('id', id)
        .select();

    if (error) {
        console.error('Error updating status:', error.message);
        throw new Error(error.message);
    }
    return data;
};
