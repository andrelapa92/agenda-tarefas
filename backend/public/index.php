<?php

use App\Core\Router;

spl_autoload_register(function ($className) {
    $prefix = 'App\\';
    $base_dir = __DIR__ . '/../app/';

    $len = strlen($prefix);
    if (strncmp($prefix, $className, $len) !== 0) {
        return;
    }

    $relative_class = substr($className, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

$pdo = require __DIR__ . '/../Config/database.php';
$router = new Router($pdo);
$router->run();