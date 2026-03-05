import { supabase } from '../../Conection/conection';

export const addTarea = async (
    tarea: string,
    fecha: string,
    hora: string
) => {
    const { data, error } = await supabase
        .from('tareas')
        .insert([
            {
                tarea,
                fecha,
                hora,
                estado: true,
            },
        ])
        .select();

    if (error) {
        console.error('Error adding tarea:', error.message);
        throw new Error(error.message);
    }
    return data;
};
