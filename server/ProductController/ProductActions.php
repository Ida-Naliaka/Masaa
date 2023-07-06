<?php
include_once "HelperFunctions/response.php";
include_once "ProductValidation/Product.php";
include_once "Operations.php";

class ProductActions extends Operations
{
    private $table = "Masaaproducts"; 

    function __construct()
    {
        parent::__construct($this->table);
    }
    //get products from db and order by productid
    public function getRecords()
    {
        return response($this->getAll("productid"));
    }
    //add products to db or delete depending on post body
    public function setordeleteRecord()
    {
        $product = json_decode(file_get_contents("php://input"), true);
        if (count($product) > 1) {
                $newproduct = new Product($product);
                $errors = $newproduct->validateData();
                if (!$errors) {
                    return response(
                        $this->save([
                            $newproduct->sku,
                            $newproduct->name,
                            $newproduct->img,
                            $newproduct->price,
                            $newproduct->category,
                            $newproduct->color,
                            $newproduct->description
                        ],
                        [
                            "sku",
                            "name",
                            "img",
                            "price",
                            "category",
                            "color",
                            "description"
                        ])
                    );
                } else {
                    return response($errors);
                }
        } else {
            $deletesku = $product["sku"];
            return response($this->erase("sku", $deletesku));
        }
    }
    public function deleteRecord()
    {
        //delete using delete method and url query
        //not used due to hosting site limitations
        $deletesku = $_GET["sku"];
        return response($this->erase("productid", $deletesku));
    }
}
?>
