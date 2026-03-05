import { supabase } from '../../Conection/conection';

export const addProduct = async (
    nombre: string,
    precio: number,
    descripcion: string
) => {
    const { data, error } = await supabase
        .from('productos')
        .insert([
            {
                nombre,
                precio,
                descripcion,
                estado: true,
            },
        ])
        .select();

    if (error) {
        console.error('Error adding product:', error.message);
        throw new Error(error.message);
    }
    return data;
};
