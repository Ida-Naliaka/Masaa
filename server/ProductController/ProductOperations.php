<?php
include_once "Queries.php";

//more specific template 
class ProductOperations extends Queries

{
    private $table = "Masaaproducts"; 

    function __construct()
    {
        parent::__construct($this->table);
    }

    public function find(string $sku, $identifier)
    //find one record
    {
        return $this->select(["*"])
            ->where($identifier, "=", $sku)
            ->getLess();
    }
    public function save( $values, array $columns)
    {
        //add product to db
        return $this->insert(
            [
                $values->sku,
                $values->name,
                $values->img,
                $values->price,
                $values->category,
                $values->color,
                $values->description,
                
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
    public function erase(string $column, string $sku)
    {
        return $this->delete($column, $sku);
    }
}
?>
