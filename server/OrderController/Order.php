<?php
include_once "HelperFunctions/Escapestr.php";
include_once "ProductController/ProductOperations.php";

abstract class Order
{
    public string $userid;
    public string $products;
    public float $amount;
    public string $address;
    public string $status;
    public static array $validStatus = ["Pending","Fulfilled", "Delivered"];
    public array $data;

    public function __construct($input)
    {
        $this->data = $input;
    }

    public function validateData()
    {
        $errors = [];
        if ($this->validateUserid()) {
            $errors[] = $this->validateUserid();
        }
        if ($this->validateAmount()) {
            $errors[] = $this->validateAmount();
        }
        if ($this->validateProducts()) {
            $errors[] = $this->validateProducts();
        }
        if ($this->validateAddress()) {
            $errors[] = $this->validateAddress();
        }
        if ($this->validateStatus()) {
            $errors[] = $this->validateStatus();
        }
        return $errors;
    }
    private function validateUserid()
    {
        if (!$this->data["userid"]) {
            return "userid was not provided!";
        }
        else {
            $this->userid = $this->data["userid"];
            return "";
        }
    }


    private function validateProducts()
    {
        if (!$this->data["products"]) {
            return "Products were not provided!";
        }

        if (count($this->data["products"])<1) {
            return "No products in order request!";
        } else {
        $this->products = $this->data["products"];
        return "";
    }
    }

    private function validateamount()
    {
        if (!$this->data["amount"]) {
            return "Amount was not provided!";
        }

        if (
            !filter_var($this->data["amount"], FILTER_VALIDATE_FLOAT) ||
            !(strlen($this->data["amount"]) > 0) ||
            !(floatval($this->data["amount"]) >= 0)
        ) {
            return "Invalid amount!";
        }

        $this->amount = floatval($this->data["amount"]);
        return "";
    }
    private function validateAddress()
    {
        if (!$this->data["address"]) {
            return "Address was not provided!";
        }
        $this->address = $this->data["address"];
        return "";
    }

    private function validateStatus()
    {
        if (!$this->data["status"]) {
            return "Type was not provided!";
        }
        if (in_array($this->data["status"], $this::$validTypes)) {
            $this->status = $this->data["status"];
            return "";
        }
        return "Invalid status!";
    }

}
?>
