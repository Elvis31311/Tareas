import { useState } from 'react';
import { Dialog, DialogTitle, DialogPanel, DialogBackdrop } from '@headlessui/react';
import '../SupportDialog/SupportDialog.css';
import { InfoPanel } from '../../components/InfoPanel/InfoPanel';
import { addProduct } from '../../../backend/Acctions/Add/add';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await addProduct(nombre, parseFloat(precio), descripcion);
            setNombre('');
            setPrecio('');
            setDescripcion('');
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Error al añadir el producto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="dialog-overlay">
            <DialogBackdrop className="dialog-backdrop" />
            <DialogPanel>
                <InfoPanel>
                    <DialogTitle className="dialog-title">Añadir Nuevo Producto</DialogTitle>
                    <form onSubmit={handleSubmit} className="dialog-content">
                        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                        <label htmlFor="add-name">Nombre del producto:</label>
                        <input
                            type="text"
                            id="add-name"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ej: Camiseta"
                            required
                        />
                        <label htmlFor="add-price">Precio:</label>
                        <input
                            type="number"
                            id="add-price"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            placeholder="Ej: 19.99"
                            step="0.01"
                            required
                        />
                        <label htmlFor="add-desc">Descripción:</label>
                        <textarea
                            id="add-desc"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Ej: Camiseta de algodón 100%"
                            required
                        />
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '10px' }}>
                            <button type="button" onClick={onClose} className="dialog-close-btn" style={{ flex: 1 }} disabled={loading}>
                                Cancelar
                            </button>
                            <button type="submit" className="dialog-submit-btn" disabled={loading} style={{
                                flex: 1,
                                padding: '12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: '#10b981', /* Bright modern green */
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}>
                                {loading ? 'Guardando...' : 'Guardar'}
                            </button>
                        </div>
                    </form>
                </InfoPanel>
            </DialogPanel>
        </Dialog>
    );
}
