const API_BASE = '/api/tasks';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido na API' }));
    throw new Error(errorData.error || 'Erro na resposta da rede');
  }
  // O método DELETE retorna 204 No Content, que não tem corpo.
  if (response.status === 204) {
    return null;
  }
  return response.json();
};

export const fetchTasks = () => {
  return fetch(API_BASE).then(handleResponse);
};

export const saveTask = (taskData, taskId) => {
  const isEditing = !!taskId;
  const url = isEditing ? `${API_BASE}/${taskId}` : API_BASE;
  const method = isEditing ? 'PUT' : 'POST';

  return fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  }).then(handleResponse);
};

export const deleteTask = (taskId) => {
  return fetch(`${API_BASE}/${taskId}`, { method: 'DELETE' }).then(handleResponse);
};

export const updateTaskStatus = (taskId, newStatus) => {
  return fetch(`${API_BASE}/${taskId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  }).then(handleResponse);
};