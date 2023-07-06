<?php
include_once "HelperFunctions/Escapestr.php";
include_once "ProductController/ProductOperations.php";

class Product
{
    public string $sku;
    public string $name;
    public float $price;
    public string $color;
    public string $category;
    public string $description;
    public string $img;
    public static array $validCategories = ["Men", 'Women', "Jewellery", "Kiddies"];
    public array $data;

    public function __construct($input)
    {
        $this->data = $input;
    }

    public function validateData()
    {
        $errors = [];
        if ($this->validateSku()) {
            $errors[] = $this->validateSku();
        }
        if ($this->validateName()) {
            $errors[] = $this->validateName();
        }
        if ($this->validateImage()) {
            $errors[] = $this->validateImage();
        }
        if ($this->validatePrice()) {
            $errors[] = $this->validatePrice();
        }
        if ($this->validateCategory()) {
            $errors[] = $this->validateCategory();
        }
        if ($this->validateColor()) {
            $errors[] = $this->validateColor();
        }
        if ($this->validateDescription()) {
            $errors[] = $this->validateDescription();
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
    private function validateCategory()
    {
        if (!$this->data["category"]) {
            return "Category was not provided!";
        }
        if (in_array($this->data["category"], $this::$validCategories)) {
            $this->category = $this->data["category"];
            return "";
        }
        return "Invalid category!";
    }
    
    private function validateColor()
    {
        if (!$this->data["color"]) {
            return "Color was not provided!";
        }

        if ($this->data["color"] === "") {
            return "Invalid color!";
        }
        $prodcolor = Escapestr($this->data["color"]);
        $this->color = $prodcolor;
        return "";
    }
    private function validateDescription()
    {
        if (!$this->data["description"]) {
            return "Description was not provided!";
        }

        if ($this->data["description"] === "") {
            return "Invalid description!";
        }
        $proddesc = Escapestr($this->data["description"]);
        $this->description = $proddesc;
        return "";
    }
}
?>
