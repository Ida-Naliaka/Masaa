<?php
include "ProductController/ProductActions.php";
include "UserController/UserActions.php";
include "OrderController/OrderActions.php";

class Methods
{
    public $requester;
    public function __construct($req)
    {
        $this->requester=$req;
    }
    public function requestMethod()
    {
        //get api request methods
       $classname= $this->requester."Actions";
       if (class_exists($classname)) {
        $action = new $classname();
        $method = $_SERVER["REQUEST_METHOD"];
        if ($method === "GET") {
            $action->getRecords();
        }
        if ($method === "POST") {
            $action->setordeleteRecord();
        }
         if ($method === "PUT") {
            $action->updateRecord();
        }
        if ($method === "DELETE") {
            $action->deleteRecord();
        }
    }
}
}

?>
