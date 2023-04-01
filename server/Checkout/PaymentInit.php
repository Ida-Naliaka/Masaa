<?php
// Include the configuration file and autoloader
require_once "env.php";
require_once "vendor/autoload.php";
include_once "DbConnect.php";
include_once "Addorder.php";
include_once "Operations.php";
include_once "HelperFunctions/response.php";
use Stripe\Stripe;

class PaymentInit
{

private $apikey;
private $txn_insert;
private $output;
public function __construct() {
    $this->apikey = getenv("STRIPE_SECRET_KEY");
   // Set API key
    \Stripe\Stripe::setApiKey($this->apikey);
}

public function createPaymentIntent() {
    $jsonObj = json_decode(file_get_contents("php://input"), true);// Retrieve JSON from POST body
    // Define item price and convert to cents
    $itemPriceCents = round($jsonObj['amount']*100);
    // Set content type to JSON
    header("Content-Type: application/json");
    try {
        // Create PaymentIntent with amount and currency
        $paymentIntent = \Stripe\PaymentIntent::create([
            "description" => 'Goods payment',
            "amount" => $itemPriceCents,
            "currency" => 'usd',
            "payment_method" => $jsonObj['payment_method_id'],
            "confirmation_method"=> 'manual',
            'confirm'=> true,
        ]);
        if ($paymentIntent->status === 'succeeded') {
            // The payment didn’t need any additional actions and completed!
            // Handle post-payment fulfillment
            $insert=new Addorder($paymentIntent, $jsonObj);
            $insert->Finalstmt();   
            } else {
                $this->output=['success'=> false, 'error'=> 'Invalid PaymentIntent status'];
            }
        } catch (Error $e) {
            http_response_code(500);
            $this->output=['success'=> false,"error" => $e->getMessage()];
        }
        if($this->output) {
        return response($this->output);
        }
    }
}
?>