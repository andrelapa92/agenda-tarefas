import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchTasks = useCallback(() => {
    fetch('/api/tasks')
      .then(res => {
        if (!res.ok) {
          throw new Error('Erro na resposta da rede');
        }
        return res.json();
      })
      .then(data => {
        setTasks(data);
      })
      .catch(error => console.error("Erro ao buscar tarefas:", error));
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); 

  const handleSaveTask = (taskData) => {
    const isEditing = !!currentTask;
    const url = isEditing ? `/api/tasks/${currentTask.id}` : '/api/tasks';
    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    })
    .then(res => res.json())
    .then(() => {
      fetchTasks();
      setIsFormVisible(false);
      setCurrentTask(null);
    })
    .catch(error => console.error("Erro ao salvar tarefa:", error));
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      fetch(`/api/tasks/${id}`, { method: 'DELETE' })
        .then(res => {
          if (res.ok) {
            setTasks(tasks.filter(task => task.id !== id));
          } else {
            console.error("Falha ao excluir tarefa");
            fetchTasks();
          }
        })
        .catch(error => console.error("Erro ao excluir tarefa:", error));
    }
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setIsFormVisible(true);
  };

  const handleNewTaskClick = () => {
    setCurrentTask(null);
    setIsFormVisible(true);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setCurrentTask(null);
  };

  const toggleTaskStatus = (task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      .then(res => res.json())
      .then(updatedTask => {
         setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      })
      .catch(error => console.error("Erro ao atualizar status:", error));
  };

  const pendingTasks = tasks
    .filter(task => task.status === 'pending')
    .sort((a, b) => {
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date) - new Date(b.due_date);
    });

  const completedTasks = tasks
    .filter(task => task.status === 'completed')
    .sort((a, b) => {
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gerenciador de Tarefas</h1>
      </header>
      <main>
        {isFormVisible ? (
          <TaskForm
            onSave={handleSaveTask}
            onCancel={handleCancelForm}
            task={currentTask}
          />
        ) : (
          <>
            <TaskList
              pendingTasks={pendingTasks}
              completedTasks={completedTasks}
              onEdit={handleEditClick}
              onDelete={handleDeleteTask}
              onToggleStatus={toggleTaskStatus}
            />
            <div className="new-task-button-container">
              <button onClick={handleNewTaskClick} className="btn btn-primary btn-lg">Nova Tarefa</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
