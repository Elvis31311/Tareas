import './button.css'

interface ButtonProps {
  label?: string // Lo hacemos opcional por si quieres usar solo iconos
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  // Añadimos variant para elegir el color
  variant: 'add' | 'update' | 'delete' 
  children?: React.ReactNode // Por si quieres meter iconos dentro
}

export function Button({ 
  label, 
  onClick, 
  type = 'button', 
  disabled = false, 
  variant,
  children 
}: ButtonProps) {
  
  // Mapeamos el nombre de la variante con la clase de tu CSS
  const classNameMap = {
    add: 'btn-primary-add',
    update: 'btn-primary-update',
    delete: 'btn-primary-delete'
  };

  return (
    <button 
      className={classNameMap[variant]} 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
    >
      {label}
      {children}
    </button>
  )
}