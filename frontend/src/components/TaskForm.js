import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, onCancel, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDueDate(task.due_date?.split('T')[0] || '');
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert('O título é obrigatório.');
      return;
    }
    onSave({ title, description, due_date: dueDate || null });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{task ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <div className="form-buttons">
        <button type="submit" className="btn-save">Salvar</button>
        <button type="button" onClick={onCancel} className="btn-cancel">Cancelar</button>
      </div>
    </form>
  );
};

export default TaskForm;