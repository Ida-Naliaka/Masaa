<?php

include_once "DbConnect.php";
include_once "HelperFunctions/response.php";
include_once "UserGroups/User.php";
include_once "Operations.php";
include_once "ValidateUser.php";
include_once "Auth.php";

class UserActions extends Operations
{
    private $table = "users"; 

    function __construct()
    {
        parent::__construct($this->table);
    }
    //get products from db
    public function getRecords()
    {
        return response($this->getAll("userid"));
    }
    //add products to db or delete depending on post body
    public function setordeleteRecord()
    {
        $user = json_decode(file_get_contents("php://input"), true);
        $auth= new Auth();
        if (count($user) > 2) {
            $auth->Signup($user);
        } else if (count($user) === 1) {
            $deleteuser = $user["email"];
            return response($this->erase("email", $deleteuser));
        } else if (count($user) === 2) {
            $auth->Login($user);
        }
    }
    public function deleteRecord()
    {
        //delete using delete method and url query
        //not used due to hosting site limitations
        $deleteemail = $_GET["email"];
        return response($this->erase("email", $deleteemail));
    }
}
?>
