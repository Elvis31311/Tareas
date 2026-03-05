import { useState, useEffect } from 'react';
import { Dialog, DialogTitle } from '@headlessui/react';
import '../SupportDialog/SupportDialog.css';
import { InfoPanel } from '../../components/InfoPanel/InfoPanel';
import { updateProduct } from '../../../backend/Acctions/Update/update';

interface Product {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    estado: boolean;
}

interface UpdateProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    product: Product | null;
}

export function UpdateProductModal({ isOpen, onClose, onSuccess, product }: UpdateProductModalProps) {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (product) {
            setNombre(product.nombre);
            setPrecio(product.precio.toString());
            setDescripcion(product.descripcion);
            setEstado(product.estado);
        }
    }, [product]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;
        setLoading(true);
        setError(null);
        try {
            await updateProduct(product.id, {
                nombre,
                precio: parseFloat(precio),
                descripcion,
                estado
            });
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Error al actualizar el producto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="dialog-overlay">
            <div className="dialog-backdrop" onClick={onClose} />
            <InfoPanel>
                <DialogTitle className="dialog-title">Actualizar Producto {product ? `#${product.id}` : ''}</DialogTitle>
                <form onSubmit={handleSubmit} className="dialog-content">
                    {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                    <label htmlFor="update-name">Nombre del producto:</label>
                    <input
                        type="text"
                        id="update-name"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <label htmlFor="update-price">Precio:</label>
                    <input
                        type="number"
                        id="update-price"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        step="0.01"
                        required
                    />
                    <label htmlFor="update-desc">Descripción:</label>
                    <textarea
                        id="update-desc"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                    <center>
                        <button type="button" onClick={onClose} className="dialog-close-btn" style={{ marginRight: '10px' }} disabled={loading}>
                            Cancelar
                        </button>
                        <button type="submit" className="dialog-submit-btn" disabled={loading} style={{
                            padding: '10px 20px',
                            borderRadius: '8px',
                            border: 'none',
                            background: '#2196F3',
                            color: 'white',
                            cursor: 'pointer'
                        }}>
                            {loading ? 'Actualizando...' : 'Actualizar'}
                        </button>
                    </center>
                </form>
            </InfoPanel>
        </Dialog>
    );
}
