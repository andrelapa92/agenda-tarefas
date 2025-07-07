<?php

namespace App\Controllers;

use App\Models\TaskModel;
use PDO;

class TaskController
{
    private $taskModel;

    public function __construct(PDO $pdo)
    {
        $this->taskModel = new TaskModel($pdo);
        header('Content-Type: application/json');
    }

    public function index()
    {
        echo json_encode($this->taskModel->all());
    }

    public function show($id)
    {
        $task = $this->taskModel->find($id);
        if (!$task) {
            http_response_code(404);
            echo json_encode(['error' => 'Task not found']);
            return;
        }
        echo json_encode($task);
    }

    public function store()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $result = $this->taskModel->create($data);
        http_response_code(201);
        echo json_encode($result);
    }

    public function update($id)
    {
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid or empty request body']);
            return;
        }

        $this->taskModel->update($id, $data);
        $task = $this->taskModel->find($id);

        if (!$task) {
            http_response_code(404);
            echo json_encode(['error' => 'Task not found']);
            return;
        }

        echo json_encode($task);
    }

    public function delete($id)
    {
        if ($this->taskModel->delete($id) === 0) {
            http_response_code(404);
            echo json_encode(['error' => 'Task not found']);
            return;
        }
        http_response_code(204);
    }
}

?>