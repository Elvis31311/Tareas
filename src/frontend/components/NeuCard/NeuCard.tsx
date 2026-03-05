import { type ReactNode } from 'react'
import './NeuCard.css'

interface NeuCardProps {
  children: ReactNode
}

export function NeuCard({ children }: NeuCardProps) {
  return <div className="neu-card-body">{children}</div>
}