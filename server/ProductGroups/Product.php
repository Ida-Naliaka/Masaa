<?php
include_once "HelperFunctions/Escapestr.php";
include_once "ProductController/ProductOperations.php";

abstract class Product
{
    public string $sku;
    public string $name;
    public float $price;
    public string $type;
    public string $value;
    public string $img;
    public static array $validTypes = ["Cake", "Cakepop", "Pastry"];
    public array $data;

    public function __construct($input)
    {
        $this->data = $input;
    }

    public function validateData()
    {
        $errors = [];
        if ($this->validateName()) {
            $errors[] = $this->validateName();
        }
        if ($this->validatePrice()) {
            $errors[] = $this->validatePrice();
        }
        if ($this->validateSku()) {
            $errors[] = $this->validateSku();
        }
        if ($this->validateImage()) {
            $errors[] = $this->validateImage();
        }
        if ($this->validateType()) {
            $errors[] = $this->validateType();
        }
        if ($this->validateValue()) {
            $errors[] = $this->validateValue();
        }
        return $errors;
    }
    private function validateSku()
    {
        if (!$this->data["sku"]) {
            return "SKU was not provided!";
        }
        $statement = (new ProductOperations())->find( $this->data["sku"], "sku");
        if ($statement->num_rows > 0) {
            return "SKU already exists!";
        } else {
            $this->sku = $this->data["sku"];
            return "";
        }
    }


    private function validateName()
    {
        if (!$this->data["name"]) {
            return "Name was not provided!";
        }

        if ($this->data["name"] === "") {
            return "Invalid name!";
        }
        $prodname = Escapestr($this->data["name"]); //for name entries with apostrophes etc
        $this->name = $prodname;
        return "";
    }

    private function validatePrice()
    {
        if (!$this->data["price"]) {
            return "Price was not provided!";
        }

        if (
            !filter_var($this->data["price"], FILTER_VALIDATE_FLOAT) ||
            !(strlen($this->data["price"]) > 0) ||
            !(floatval($this->data["price"]) >= 0)
        ) {
            return "Invalid price!";
        }

        $this->price = floatval($this->data["price"]);
        return "";
    }
    private function validateImage()
    {
        if (!$this->data["img"]) {
            return "Image was not provided!";
        }
        if (
            !filter_var($this->data["img"], FILTER_VALIDATE_URL))
        {
            return "Invalid image!";
        }

        $this->img = $this->data["img"];
        return "";
    }

    private function validateType()
    {
        if (!$this->data["type"]) {
            return "Type was not provided!";
        }
        if (in_array($this->data["type"], $this::$validTypes)) {
            $this->type = $this->data["type"];
            return "";
        }
        return "Invalid type!";
    }

    abstract protected function validateValue();
}
?>
