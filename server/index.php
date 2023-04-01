<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
header("Access-Control-Allow-Methods:*");
include_once "Router.php";

//$req=strtok($_SERVER["REQUEST_URI"], '?');
$checkout= $_GET["direct"];
$router=new Router($checkout);
$router->relay();

?>
