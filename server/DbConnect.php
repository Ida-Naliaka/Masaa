<?php
include_once "env.php";
class DbConnect
{
    public function connect()
    {
        $server = "localhost";
        $dbname = getenv("dbname");
        $username = getenv("user");
        $pass = getenv("pass");
        $conn = new mysqli($server, $username, $pass);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        // Creating a new database
        $sql = "SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$dbname'";
        $statement = $conn->query($sql);
        if (!$statement->fetch_row()[0]) {
            $db = "CREATE DATABASE $dbname";
            if ($conn->query($db) === true) {
                echo "Database created successfully";
                $conn->select_db($dbname);
                $productstable = "CREATE TABLE `Masaaproducts` (
                    `productid` int(255) COLLATE utf8_bin NOT NULL PRIMARY KEY AUTO_INCREMENT,
                    `sku` varchar(255) COLLATE utf8_bin NOT NULL,
                    `name` varchar(255) COLLATE utf8_bin NOT NULL,
                    `img` varchar(255) COLLATE utf8_bin NOT NULL,
                    `price` varchar(255) COLLATE utf8_bin NOT NULL,
                    `category` varchar(255) COLLATE utf8_bin NOT NULL,
                    `color` varchar(255) COLLATE utf8_bin NOT NULL,
                    `description` varchar(255) COLLATE utf8_bin NOT NULL,
                    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
                    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP)";
                if ($conn->query($productstable)) {
                    echo "Table products created successfully";
                } else {
                    echo "Error creating table: " . $conn->error;
                }
                 $userstable = "CREATE TABLE `users` (
                    `userid` int(255) COLLATE utf8_bin NOT NULL PRIMARY KEY AUTO_INCREMENT,
                    `name` varchar(255) COLLATE utf8_bin NOT NULL,
                    `type` varchar(255) COLLATE utf8_bin NOT NULL,
                    `employeeid` varchar(255) COLLATE utf8_bin NOT NULL,
                    `email` varchar(255) COLLATE utf8_bin NOT NULL,
                    `pass` varchar(255) COLLATE utf8_bin NOT NULL,
                    `phone` varchar(255) COLLATE utf8_bin NOT NULL,
                    `city` varchar(255) COLLATE utf8_bin NOT NULL,
                    `confirmationcode` varchar(255) COLLATE utf8_bin NOT NULL,
                    `status` varchar(255) COLLATE utf8_bin NOT NULL,
                    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
                    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP)";
                if ($conn->query($userstable)) {
                    echo "Table users created successfully";
                } else {
                    echo "Error creating table: " . $conn->error;
                }
                $orderstable = "CREATE TABLE `orders` (
                    `orderid` int(255) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                    `userid` int(255) COLLATE utf8_bin NOT NULL,
                    `customer_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
                    `customer_email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
                    `address` varchar(255) NOT NULL,
                    `description` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
                    `product_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
                    `product_quantity` int(50) COLLATE utf8_unicode_ci NOT NULL,
                    `product_price` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
                    `amount` varchar(255) NOT NULL,
                    `paid_amount` float(10,2) NOT NULL,
                    `currency` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
                    `transaction_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
                    `order_status` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
                    `payment_status` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
                    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
                    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
                if ($conn->query($orderstable)) {
                    echo "Table orders created successfully";
                } else {
                    echo "Error creating table: " . $conn->error;
                };
                return $conn;
            } else {
                echo "Error creating database: " . $conn->error;
            }
        }
        //if db exists
        $conn->select_db($dbname);
        return $conn;
    }
}
?>
