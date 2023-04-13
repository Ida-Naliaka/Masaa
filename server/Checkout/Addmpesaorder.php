<?php
include_once "DbConnect.php";
include_once "Operations.php";
include_once "HelperFunctions/response.php";

class Addmpesaorder
{
    private $conn;
    private $statement;
    private $sql = "";
    private $userid;
    private $customer_name;
    private $customer_email;
    private $address;
    private $description;
    private $products;
    private $amount;
    private $centsamount;
    private $paid_amount;
    private $currency;
    private $transaction_id;
    private $order_status;
    private $payment_status;
    private $output;
    
    public function __construct($payment_intent)
    {
        $objDb = new DbConnect();
        $this->conn = $objDb->connect();//database connection
         if (!empty($payment_intent)) {
            $this->userid= $_SESSION["userid"];
            $this->customer_name = $_SESSION["name"];
            $this->customer_email =  $_SESSION["email"];
            $this->address= $_SESSION["address"];
            $this->description= $_SESSION["description"];
            $this->products= $_SESSION["products"];
            $this->amount =$_SESSION["amount"];
            $mpesaamount=$payment_intent->Body->stkCallback->CallbackMetadata->Item[0]->Value;
            $this->paid_amount = strval($mpesaamount);
            $this->currency = 'Ksh';
            $this->transaction_id = $payment_intent->Body->stkCallback->CallbackMetadata->Item[1]->Value;
            $this->order_status='pending';
            $this->payment_status = $payment_intent->Body->stkCallback->ResultCode===0?"succeeded":"failed";
        }
    }
    public function insertstmt()
    {
        $this->sql =
        "INSERT INTO `orders`(
            `userid`,
            `customer_name`,
            `customer_email`,
            `address`,
            `description`,
            `product_name`,
            `product_quantity`,
            `product_price`,
            `amount`,
            `paid_amount`,
            `currency`,
            `transaction_id`,
            `order_status`,
            `payment_status`) VALUES ";
    }
    public function loop()
    {
        $counter = 0;
        // Check if any transaction data is exists already with the same TXN ID
        foreach ($this->products as $prod) {
             if( $counter == count($this->products) - 1) {
                $punctuation=';';
            } else {
                $punctuation=',';
            }
            $counter = $counter + 1;
            $value='('.$this->userid .','.
            "'".$this->customer_name."',".
            "'".$this->customer_email."',".
            "'".$this->address."',".
            "'".$this->description."',".
            "'".$prod['name']."',".
            "'".$prod['quantity']."',".
            "'".$prod['price']."',".
            "'".$this->amount."',".
            "'".$this->paid_amount."',".
            "'".$this->currency."',".
            "'".$this->transaction_id."',".
            "'".$this->order_status."',".
            "'".$this->payment_status."')". $punctuation;
            $this->sql.= $value; 
        };
         return $this->sql; 
    }
    public function Finalstmt()
    {
        // Check if any transaction data is exists already with the same TXN ID
         $statement = (new Operations("orders"))->find(
            "orderid",
            $this->transaction_id,
            "transaction_id"
        );
        $payment_id = 0;
        if ($statement->num_rows > 0) {
            $res=$statement->fetch_assoc();
            $payment_id = $res['orderid'];
            $this->output = ['success'=> false, 'error'=>'order already created'];
        } else {
            // Insert order data into the database
            $this->insertstmt();
            $this->loop();
            $insertres = $this->querydb();
            if($insertres) {
                $statement = (new Operations("orders"))->find(
                    "*",
                    $this->transaction_id,
                    "transaction_id"
                );
            if ($statement->num_rows > 0) {
                 $order=$statement->fetch_assoc();
                 $orderid = $order['orderid'];
                $ordertxnid = $order['transaction_id'];
                $this->output = ['success'=> true, 'orderid'=>$orderid, 'txn_id'=>$ordertxnid, "payment_txn_id" => base64_encode($this->transaction_id)];
            } else {
                 $this->output = ['success'=> false, 'error'=>'order not found in database'];
            }
            } else {
                $this->output = [
                    "success" => false,
                    "error" => "Failed to create record.",
                ];
            };   
        }
        return response($this->output);
    }
    private function querydb()
    {
        $this->statement = $this->conn->query($this->sql);
        return $this->statement;
    }
}
// remove all session variables
session_unset();
?>