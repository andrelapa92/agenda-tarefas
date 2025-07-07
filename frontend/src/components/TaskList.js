import React from 'react';

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => (
  <li className={`task-item ${task.status}`}>
    <div className="task-info" onClick={() => onToggleStatus(task)} title="Clique para alterar o status">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {task.due_date && <small>Vencimento: {new Date(task.due_date).toLocaleDateString()}</small>}
    </div>
    <div className="task-actions">
      <button onClick={() => onEdit(task)} className="btn-edit">Editar</button>
      <button onClick={() => onDelete(task.id)} className="btn-delete">Excluir</button>
    </div>
  </li>
);

const TaskList = ({ pendingTasks, completedTasks, onEdit, onDelete, onToggleStatus }) => {
  if (pendingTasks.length === 0 && completedTasks.length === 0) {
    return <p>Nenhuma tarefa encontrada. Clique em "Nova Tarefa" para começar!</p>;
  }

  return (
    <div className="tasks-container">
      <div className="tasks-column">
        <h2>Pendentes</h2>
        {pendingTasks.length > 0 ? (
          <ul className="task-list">
            {pendingTasks.map(task => (
              <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
            ))}
          </ul>
        ) : <p className="empty-column-message">Nenhuma tarefa pendente.</p>}
      </div>
      <div className="tasks-column">
        <h2>Concluídas</h2>
        {completedTasks.length > 0 ? (
          <ul className="task-list">
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
            ))}
          </ul>
        ) : <p className="empty-column-message">Nenhuma tarefa concluída.</p>}
      </div>
    </div>
  );
};

export default TaskList;