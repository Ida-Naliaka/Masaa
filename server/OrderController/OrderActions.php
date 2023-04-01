<?php
include_once "DbConnect.php";
include_once "HelperFunctions/response.php";
include_once "Operations.php";
//include_once "OrderController/Order.php";

class OrderActions extends Operations
{
    private $table = "orders"; 

    function __construct()
    {
        parent::__construct($this->table);
    }
    //get products from db
    public function getRecords()
    {
        $userid = $_GET["userid"];
        if(!empty($userid)) {
            return response($this->findandreturn('*', $userid, 'userid'));
         }else {
        return response($this->getAll("orderid"));
    }
    }
    //add products to db or delete depending on post body
    public function setordeleteRecord()
    {
        $order = json_decode(file_get_contents("php://input"), true);
      
            $deleteorder = $order["orderid"];
            return response($this->erase("orderid", $deleteorder));
    }
    public function deleteRecord()
    {
        //delete using delete method and url query
        //not used due to hosting site limitations
        $deleteorder = $_GET["orderid"];
        return response($this->erase("orderid", $deleteorder));
    }
     public function updateRecord()
    {
        $orderid = $_GET["orderid"];
        $order = json_decode(file_get_contents("php://input"), true);
        $subjectcolumn= $order['column'];
        $newval= $order['status'];
        return response($this->alter($subjectcolumn, $newval,"orderid", $orderid));
    }
}
?> 