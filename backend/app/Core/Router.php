<?php

namespace App\Core;

use App\Controllers\TaskController;
use PDO;

class Router
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function run()
    {
        $uri = $_SERVER['REQUEST_URI'];
        $method = $_SERVER['REQUEST_METHOD'];

        if ($uri === '/') {
            echo json_encode(["message" => "Welcome to the Tasks API!"]);
            return;
        }

        if (preg_match('/^\/api\/tasks\/?(\d*)/', $uri, $matches)) {
            $id = $matches[1] ?? null;
            $controller = new TaskController($this->pdo);

            switch ($method) {
                case 'GET':
                    if ($id) {
                        $controller->show($id);
                    } else {
                        $controller->index();
                    }
                    break;
                case 'POST':
                    $controller->store();
                    break;
                case 'PUT':
                case 'PATCH':
                    if (!$id) {
                        http_response_code(400);
                        echo json_encode(["error" => "Task ID is required for update."]);
                        return;
                    }
                    $controller->update($id);
                    break;
                case 'DELETE':
                    if (!$id) {
                        http_response_code(400);
                        echo json_encode(["error" => "Task ID is required for deletion."]);
                        return;
                    }
                    $controller->delete($id);
                    break;
                default:
                    http_response_code(405);
                    echo json_encode(["error" => "Method not allowed"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Not Found"]);
        }
    }
}

?>