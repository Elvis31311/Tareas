import { Dialog, DialogTitle } from '@headlessui/react'
import './SupportDialog.css'
import { InfoPanel } from '../../components/InfoPanel/InfoPanel'

interface SupportDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function SupportDialog({ isOpen, onClose }: SupportDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="dialog-overlay">
      <div className="dialog-backdrop" onClick={onClose} />
        <InfoPanel>
        <DialogTitle className="dialog-title">Agrega un producto</DialogTitle>

        <div className="dialog-content">
          <label htmlFor="productName">Nombre del producto:</label>
          <input type="text" id="productName" name="productName" placeholder="Ej: Camiseta" />
          <label htmlFor="productPrice">Precio:</label>
          <input type="number" id="productPrice" name="productPrice" placeholder="Ej: 19.99" />
          <label htmlFor="productDescription">Descripción:</label>
          <textarea id="productDescription" name="productDescription" placeholder="Ej: Camiseta de algodón 100%"></textarea>
        </div>

        <center><button onClick={onClose} className="dialog-close-btn">
          Cerrar
        </button></center>
        </InfoPanel>
    </Dialog>
  )
}