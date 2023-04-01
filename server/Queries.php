<?php

include_once "DbConnect.php";
//general query templates
abstract class Queries
{
    private $conn;
    private $statement;
    private $sql = "";
    private $table;

    public function __construct($table)
    {
        $this->table = $table;
        $objDb = new DbConnect();
        $this->conn = $objDb->connect();//database connection
    }
    //select statement template
    public function select(array $columns)
    {
        $this->sql =
            "SELECT " . implode(",", $columns) . " FROM `" . $this->table . "`";
        return $this;
    }
    //where statement template
    public function where(string $column, string $operator, string $value)
    {
        $this->sql .=
            " WHERE `" . $column . "`" . $operator . "'" . $value . "'";
        return $this;
    }
    //get all products and return them in an associative array
    public function get()
    {
        $result = $this->querydb();
        $products = $result->fetch_all(MYSQLI_ASSOC);
        return $products;
    }
     //order by-statement template
    public function sort(string $column)
    {
        $this->sql .= " ORDER BY " . $column;
        return $this;
    }
    //get record without assoc array
    public function getLess()
    {
        $result = $this->querydb();
        return $result;
    }
    
 //add to db-statement template, with functions to add backticks to column titles and quotes to values
    public function insert(array $values, $columnvalues)
    {
        function add_quotes($str)
        {
            return sprintf("'%s'", $str);
        }
        function add_backticks($str)
        {
            return sprintf("`%s`", $str);
        }
        
        $this->sql .=
            "INSERT INTO `" .
            $this->table .
            "` (" .
            implode(",", array_map("add_backticks", $columnvalues)) .
            ") VALUES (" .
            implode(",", array_map("add_quotes", $values)) .
            ")";
        $insertres = $this->querydb();
        $insertres
            ? ($response = [
                "status" => 1,
                "message" => "Record created successfully.",
            ])
            : ($response = [
                "status" => 0,
                "message" => "Failed to create record.",
            ]);
        return $response;
    }

  
    
    //delete from db statement template
    public function delete(string $column, string $value)
    {
        $this->sql = "DELETE FROM " . $this->table;
        $this->where($column, "=", $value);
        $deleteres = $this->querydb();
        $deleteres
            ? ($response = [
                "status" => 1,
                "message" => "Record deleted successfully.",
            ])
            : ($response = [
                "status" => 0,
                "message" => "Failed to delete record.",
            ]);
        return $response;
    }
    public function update($subjectcol, $newval, $column, $value)
    {
        $this->sql="UPDATE ".$this->table ." SET ". $subjectcol. " = '".$newval."'";
        $this->where($column, "=", $value);
        $updateres = $this->querydb();
        $updateres
            ? ($response = [
                "status" => 1,
                "message" => "Record updated successfully.",
            ])
            : ($response = [
                "status" => 0,
                "message" => "Failed to update record.",
            ]);
        return $response;
    }
     //query database
    private function querydb()
    {
        $this->statement = $this->conn->query($this->sql);
        return $this->statement;
    }
}
?>
