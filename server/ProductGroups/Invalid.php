<?php

include_once "Product.php";

class Invalid extends Product
{
    protected function validateValue()
    {
        return " Invalid Product!";
    }
}
?>
