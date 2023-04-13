<?php
session_start();
// Include the configuration file and autoloader
require_once "env.php";
include_once "DbConnect.php";
include_once "Addorder.php";
include_once "Operations.php";
include_once "HelperFunctions/response.php";

class MpesaPaymentInit
{
private $consumerKey = 'JWwKm3j6OOGfGie698LXXpGSDS5mIylW';
private $consumerSecret = 'IUFf4inQMAPG91ky';
private $Business_Code = '174379';
private $Passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
private $Type_of_Transaction = 'CustomerPayBillOnline';
private $access_token_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
private $phone_number;
private $amount;
private $initiate_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
private $CallBackURL = 'https://scandiwebidatest.000webhostapp.com/php/index.php?direct=callbackmpesa';
private $Time_Stamp;
private $password;
private $apikey;
private $txn_insert;
private $output;
private $headers = ['Content-Type:application/json; charset=utf8'];
public $userdata;
public function __construct() {
    $jsonObj = json_decode(file_get_contents("php://input"), true);
    $this->phone_number= $jsonObj['phone'];
    $this->amount= $jsonObj['amount'];
    $this->Time_Stamp= date("Ymdhis");
    $this->password= base64_encode($this->Business_Code . $this->Passkey . $this->Time_Stamp);
    $_SESSION["userid"] = $jsonObj['userid'];;
    $_SESSION["name"] = $jsonObj['name'];
    $_SESSION["email"] = $jsonObj['email'];
    $_SESSION["address"] = $jsonObj['address'];
    $_SESSION["description"] = $jsonObj['description'];
    $_SESSION["products"] = $jsonObj['products'];
    $_SESSION["amount"] = $jsonObj['amount'];
   
}
public function initiatePayment() {
  try {
   /* $curl = curl_init($this->access_token_url);
   curl_setopt($curl, CURLOPT_HTTPHEADER, $this->headers);
   curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
   curl_setopt($curl, CURLOPT_HEADER, FALSE);
   curl_setopt($curl, CURLOPT_USERPWD, $this->consumerKey.':'.$this->consumerSecret);
   $result = curl_exec($curl);
   $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
   $result = json_decode($result);
   $access_token = $result->access_token;  
   curl_close($curl);
   # header for stk push
   $stkheader = ['Content-Type:application/json','Authorization:Bearer '.$access_token];
   # initiating the transaction
   $curl = curl_init();
   curl_setopt($curl, CURLOPT_URL, $this->initiate_url);
   curl_setopt($curl, CURLOPT_HTTPHEADER, $stkheader); //setting custom header
   $curl_post_data = array(
    //Fill in the request parameters with valid values
    'BusinessShortCode' => $this->Business_Code,
    'Password' => $this->password,
    'Timestamp' => $this->Time_Stamp,
    'TransactionType' => 'CustomerPayBillOnline',
    'Amount' => 1,
    'PartyA' => $this->phone_number,
    'PartyB' => $this->Business_Code,
    'PhoneNumber' => $this->phone_number,
    'CallBackURL' => $this->CallBackURL,
    'AccountReference' => 'BakedCo',
    'TransactionDesc' => 'Payment for goods'
  );
  $data_string = json_encode($curl_post_data);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);
  $curl_response = curl_exec($curl);
    */
    $token=base64_encode("JWwKm3j6OOGfGie698LXXpGSDS5mIylW:IUFf4inQMAPG91ky");
    $ch = curl_init('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials');
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer '.$token]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $response = curl_exec($ch);
    curl_close($ch);
    echo $response;
   /* $curl = curl_init($this->access_token_url);
   curl_setopt($curl, CURLOPT_HTTPHEADER, $this->headers);
   curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
   curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
   curl_setopt($curl, CURLOPT_HEADER, FALSE);
   curl_setopt($curl, CURLOPT_USERPWD, $this->consumerKey.':'.$this->consumerSecret);
   $result = curl_exec($curl);
  // $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);*/
  $result = json_decode($response);
  $access_token = $result->access_token;  
  curl_close($ch);
   # header for stk push
   $stkheader = ['Content-Type:application/json','Authorization:Bearer '.$access_token];
   # initiating the transaction
   $curl = curl_init();
   curl_setopt($curl, CURLOPT_URL, $this->initiate_url);
   curl_setopt($curl, CURLOPT_HTTPHEADER, $stkheader); //setting custom header
   $curl_post_data = array(
    'BusinessShortCode' => $this->Business_Code,
    'Password' => $this->password,
    'Timestamp' => $this->Time_Stamp,
    'TransactionType' => 'CustomerPayBillOnline',
    'Amount' => 1,
    'PartyA' => $this->phone_number,
    'PartyB' => $this->Business_Code,
    'PhoneNumber' => $this->phone_number,
    'CallBackURL' => $this->CallBackURL,
    'AccountReference' => 'BakedCo',
    'TransactionDesc' => 'Payment for goods'
  );
  $data_string = json_encode($curl_post_data);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);
  $curl_response = curl_exec($curl);
  } catch (Error $e) {
    http_response_code(500);
    $output=['success'=> false,"error" => $e->getMessage()];
    return response($output);
  };
}
}
?>