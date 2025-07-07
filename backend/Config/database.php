<?php

class Connection
{
    private static ?PDO $pdo = null;

    public static function getInstance(): PDO
    {
        if (self::$pdo === null) {
            $host = getenv('DB_HOST');
            $db   = getenv('DB_DATABASE');
            $user = getenv('DB_USERNAME');
            $pass = getenv('DB_PASSWORD');
            $charset = 'utf8mb4';

            $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];

            self::$pdo = new PDO($dsn, $user, $pass, $options);
        }
        return self::$pdo;
    }
}

return Connection::getInstance();