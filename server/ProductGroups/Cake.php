<?php

include_once "Product.php";

class Cake extends Product
{
    //cake size value validation and formatting
    protected function validateValue()
    {
        if (!$this->data["size"] && !$this->data["layers"]) {
            return "cake size was not provided!";
        }

        if (
            is_numeric($this->data["size"]) &&
            floatval($this->data["size"] >= 0) &&
            is_numeric($this->data["layers"]) &&
            floatval($this->data["layers"] >= 0)
        ) {
            $this->value = "size: " . $this->data["size"] . " inch, ".$this->data["layers"] ."Layer";
            return "";
        }

        return "Invalid cake size!";
    }
}
