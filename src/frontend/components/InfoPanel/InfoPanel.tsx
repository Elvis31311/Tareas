import { type ReactNode } from 'react'
import './InfoPanel.css'

interface InfoPanelProps {
  children: ReactNode
}

export function InfoPanel({ children }: InfoPanelProps) {
  return <div className="glass-panel">{children}</div>
}
