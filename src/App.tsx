import React, { useState, useEffect } from 'react';
import { supabase } from './backend/Conection/conection';
import { Search, Plus, Trash2, Edit2, Calendar, Clock, AlertCircle } from 'lucide-react';
import { addTarea } from './backend/Acctions/Add/add';
import { updateTarea } from './backend/Acctions/Update/update';
import { deleteTarea } from './backend/Acctions/Delete/delete';
import './App.css';

interface Tarea {
  id: number;
  tarea: string;
  fecha: string;
  hora: string;
  estado: boolean;
}

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [filteredTareas, setFilteredTareas] = useState<Tarea[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  // Form State
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    tarea: '',
    fecha: '',
    hora: '',
    estado: true
  });

  const [verEliminadas, setVerEliminadas] = useState(false);

  useEffect(() => {
    fetchTareas();
  }, []);

  useEffect(() => {
    // Filtrar por busqueda y por estado
    // Si la instruccion fue "solo se ven los verdaderos" despues de que "eliminar" cambie de falso a verdadero
    // interpretaremos que el usuario quiere ver las tareas *activas* (estado === falso), y si quiere las "verdaderas" como "completas/eliminadas" 
    // lo manejamos con el toggle. Por defecto, ver solo activas (estado === false)
    let filtered = tareas;

    // Toggle view option if user precisely wants to see the True ones (deleted/completed) or False ones (active)
    if (verEliminadas) {
      filtered = filtered.filter(t => t.estado === false);
    } else {
      filtered = filtered.filter(t => t.estado === true);
    }

    // Busqueda
    if (search) {
      filtered = filtered.filter(t =>
        t.tarea.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredTareas(filtered);
  }, [search, tareas, verEliminadas]);

  const fetchTareas = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tareas')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setTareas(data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ tarea: '', fecha: '', hora: '', estado: true });
    setCurrentId(null);
    setShowModal(true);
  };

  const openEditModal = (t: Tarea) => {
    setModalMode('edit');
    setFormData({ tarea: t.tarea, fecha: t.fecha, hora: t.hora, estado: t.estado });
    setCurrentId(t.id);
    setShowModal(true);
  };

  const saveTarea = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        await addTarea(formData.tarea, formData.fecha, formData.hora);
      } else {
        await updateTarea(currentId as number, {
          tarea: formData.tarea,
          fecha: formData.fecha,
          hora: formData.hora
        });
      }
      setShowModal(false);
      fetchTareas();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error al guardar la tarea');
    }
  };

  const handleDelete = async (id: number) => {
    // "eliminar solo cambie de estado de verdadero a falso"
    try {
      await deleteTarea(id);
      fetchTareas();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error al actualizar el estado de la tarea');
    }
  };

  return (
    <div className="app-container">
      <header className="header-glass">
        <div>
          <h1 className="header-title">Gestor de Tareas</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Organiza tu día con eficiencia y estilo</p>
        </div>

        <div className="controls">
          <div className="search-bar">
            <Search size={20} color="var(--text-secondary)" />
            <input
              type="text"
              placeholder="Buscar tarea..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={openAddModal}>
            <Plus size={20} />
            Nueva Tarea
          </button>

          <button
            className="btn"
            style={{
              background: verEliminadas ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              color: 'var(--text-primary)',
              border: '1px solid var(--glass-border)'
            }}
            onClick={() => setVerEliminadas(!verEliminadas)}
          >
            {verEliminadas ? "Mostrando Eliminadas (False)" : "Mostrando Activas (True)"}
          </button>
        </div>
      </header>

      <main>
        {loading ? (
          <div className="empty-state">
            <div className="loader">Cargando...</div>
          </div>
        ) : filteredTareas.length > 0 ? (
          <div className="tasks-grid">
            {filteredTareas.map((t) => (
              <div key={t.id} className="task-card">
                <h3 className="task-title" style={{ textDecoration: !t.estado ? 'line-through' : 'none' }}>
                  {t.tarea}
                </h3>

                <div className="task-meta">
                  <span className="task-meta-item">
                    <Calendar size={14} />
                    {t.fecha}
                  </span>
                  <span className="task-meta-item">
                    <Clock size={14} />
                    {t.hora}
                  </span>
                </div>

                <div className="task-actions">
                  {t.estado && (
                    <button className="btn-icon edit" onClick={() => openEditModal(t)} title="Editar">
                      <Edit2 size={18} />
                    </button>
                  )}
                  {t.estado && (
                    <button className="btn-icon delete" onClick={() => handleDelete(t.id)} title="Eliminar (Cambiar a False)">
                      <Trash2 size={18} />
                    </button>
                  )}
                  {!t.estado && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--danger)', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={14} /> Eliminada
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No hay tareas que mostrar para esta vista.</p>
          </div>
        )}
      </main>

      {/* Modal Reutilizable para Agregar / Actualizar */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">
              {modalMode === 'add' ? 'Agregar Nueva Tarea' : 'Actualizar Tarea'}
            </h2>
            <form onSubmit={saveTarea}>
              <div className="form-group">
                <label>Descripción de la Tarea</label>
                <input
                  type="text"
                  name="tarea"
                  value={formData.tarea}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej. Preparar informe mensual"
                />
              </div>
              <div className="form-group">
                <label>Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Hora</label>
                <input
                  type="time"
                  name="hora"
                  value={formData.hora}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-cancel" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {modalMode === 'add' ? 'Guardar' : 'Actualizar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
