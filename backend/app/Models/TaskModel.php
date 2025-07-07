<?php

namespace App\Models;

use PDO;

class TaskModel
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function all()
    {
        return $this->pdo->query("SELECT * FROM tasks")->fetchAll(PDO::FETCH_ASSOC);
    }

    public function find($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM tasks WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO tasks (title, description, status, due_date) VALUES (?, ?, ?, ?)"
        );
        $stmt->execute([
            $data['title'],
            $data['description'],
            $data['status'] ?? 'pending',
            $data['due_date'] ?? null
        ]);
        $id = $this->pdo->lastInsertId();
        return $this->find($id);
    }

    public function update($id, $data)
    {
        $stmt = $this->pdo->prepare(
            "UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ?"
        );
        $stmt->execute([
            $data['title'],
            $data['description'],
            $data['status'],
            $data['due_date'] ?? null,
            $id
        ]);
        return $stmt->rowCount();
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->rowCount();
    }

}

?>