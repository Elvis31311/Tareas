import { supabase } from '../../Conection/conection';

export const updateTarea = async (
    id: number,
    updates: { tarea?: string; fecha?: string; hora?: string; estado?: boolean }
) => {
    const { data, error } = await supabase
        .from('tareas')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) {
        console.error('Error updating tarea:', error.message);
        throw new Error(error.message);
    }
    return data;
};
