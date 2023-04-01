<?php
include_once "Queries.php";

//more specific template 
class UserOperations extends Queries

{
    private $table = "users"; 

    function __construct()
    {
        parent::__construct($this->table);
    }

    public function find(string $id, $identifier)
    //find one record
    {
        return $this->select(["*"])
            ->where($identifier, "=", $id)
            ->getLess();
    }
    public function save( $values, array $columns)
    {
        //add product to db
        return $this->insert(
            [
                $values->name,
                $values->type,
                $values->email,
                $values->password,
                $values->phone,
                $values->city,
                $values->confirmationcode,
                $values->status,
                $values->employeeid,
            ],
            $columns
        );
    }
    public function getAll(string $column)
    {
       // get all products
        return $this->select(["*"])
            ->sort($column)
            ->get();
    }
    public function erase(string $column, string $id)
    {
        return $this->delete($column, $id);
    }
}
?>
