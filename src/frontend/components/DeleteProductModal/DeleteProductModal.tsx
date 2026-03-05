import { Dialog, DialogTitle, DialogBackdrop } from '@headlessui/react';
import '../SupportDialog/SupportDialog.css'; // Reusing some base dialog styles

interface DeleteProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    productName?: string;
}

export function DeleteProductModal({ isOpen, onClose, onConfirm, productName }: DeleteProductModalProps) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="dialog-overlay">
            <DialogBackdrop className="dialog-backdrop" />
            <div className="dialog-panel" style={{ textAlign: 'center', padding: '40px 30px', maxWidth: '450px' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>⚠️</div>
                <DialogTitle className="dialog-title" style={{ color: '#ef4444' }}>
                    ¿Eliminar Producto?
                </DialogTitle>
                <p className="dialog-text" style={{ textAlign: 'center', fontSize: '16px', marginBottom: '30px' }}>
                    Estás a punto de eliminar <strong>{productName || 'este producto'}</strong>. Esta acción moverá el producto al estado inactivo y no se mostrará en la lista. ¿Estás seguro?
                </p>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button onClick={onClose} className="dialog-close-btn" style={{ flex: 1, backgroundColor: '#334155', color: 'white' }}>
                        Cancelar
                    </button>
                    <button onClick={() => { onConfirm(); onClose(); }} style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}>
                        Sí, Eliminar
                    </button>
                </div>
            </div>
        </Dialog>
    );
}
