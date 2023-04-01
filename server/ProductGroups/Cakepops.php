<?php

include_once "Product.php";

class Cakepop extends Product
{
    //DVD size value validation and formatting
    protected function validateValue()
    {
        if (!$this->data["diameter"]) {
            return "cake pop diameter was not provided!";
        }

        if (
            is_numeric($this->data["diameter"]) &&
            floatval($this->data["diameter"] >= 0)
        ) {
            $this->value = ": " . $this->data["diameter"] . " cm ". $this->data["name"];
            return "";
        }

        return "Invalid cakepop size!";
    }
}
