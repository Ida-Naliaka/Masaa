<?php
include_once "Queries.php";

//more specific template 
class Operations extends Queries

{

    function __construct($table)
    {
        parent::__construct($table);
    }

    public function find(string $what, string $value, $identifier)
    //find one record
    {
        return $this->select([$what])
            ->where($identifier, "=", $value)
            ->getLess();
    }
    public function findandreturn(string $what, string $value, $identifier)
    //find one record
    {
        return $this->select([$what])
            ->where($identifier, "=", $value)
            ->get();
    }
    public function save( array $values, array $columns)
    {
        //add product to db
        return $this->insert($values,$columns);
    }
    public function getAll(string $column)
    {
       // get all products
        return $this->select(["*"])
            ->sort($column)
            ->get();
    }
    public function erase(string $column, string $value)
    {
        return $this->delete($column, $sku);
    }
     public function alter(string $subjectcol, string $newval,string $column, string $id)
    {
        return $this->update($subjectcol, $newval, $column, $id);
    }
}
?>