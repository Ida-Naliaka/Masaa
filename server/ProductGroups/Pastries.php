<?php

include_once "Product.php";

class Pastry extends Product
{
    //DVD size value validation and formatting
    protected function validateValue()
    {
        if (!$this->data["quantity"]) {
            return "Pastry quantity was not provided!";
        }

        if (
            is_numeric($this->data["quantity"]) &&
            floatval($this->data["quantity"] >= 0)
        ) {
            $this->value = "Qtty: " . $this->data["quantity"] . $this->data["name"];
            return "";
        }

        return "Invalid Pastry size!";
    }
}
?>