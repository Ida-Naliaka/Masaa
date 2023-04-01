<?php
class Checkout
{
    private $consumer_key = 'JWwKm3j6OOGfGie698LXXpGSDS5mIylW';
    private $consumer_secret = 'IUFf4inQMAPG91ky';
    private $Business_Code = '174379';
    private $Passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
    private $Type_of_Transaction = 'CustomerPayBillOnline';
    private $Token_URL = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    private $phone_number;
    private $OnlinePayment = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    private $total_amount;
    private $Time_Stamp;
    private $CallBackURL = 'http://localhost/reactphp/server/checkout.php';
    private $password;
    protected function __construct()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $this->phone_number=$data["phone"];
        $this->total_amount=$data["total"];
        $this->Time_Stamp=date("Ymdhis");
        $this->password=base64_encode($Business_Code . $Passkey . $Time_Stamp);
    }
    public function lipanampesa() {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $Token_URL);
        $credentials = base64_encode($consumer_key . ':' . $consumer_secret);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Basic ' . $credentials));
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $ch_response = curl_exec($ch);
        
        $token = json_decode($ch_response)->access_token;
        
        $ch2 = curl_init();
        curl_setopt($ch2, CURLOPT_URL, $OnlinePayment);
        curl_setopt($ch2, CURLOPT_HTTPHEADER, array('Content-Type:application/json', 'Authorization:Bearer ' . $token));
        $ch2_post_data = [
            'BusinessShortCode' => $Business_Code,
            'Password' => $password,
            'Timestamp' =>$Time_Stamp,
            'TransactionType' =>$Type_of_Transaction,
            'Amount' => $total_amount,
            'PartyA' => $phone_number,
            'PartyB' => $Business_Code,
            'PhoneNumber' => $phone_number,
            'CallBackURL' => $CallBackURL,
            'AccountReference' => 'BakedCo',
            'TransactionDesc' => 'Payment for goods',
        ];
        $data2_string = json_encode($ch2_post_data);
        curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch2, CURLOPT_POST, true);
        curl_setopt($ch2, CURLOPT_POSTFIELDS, $data2_string);
        curl_setopt($ch2, CURLOPT_HEADER, false);
        curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch2, CURLOPT_SSL_VERIFYHOST, 0);
        $ch2_response = json_decode(curl_exec($curl_Tranfer2));
        response($ch2_response, JSON_PRETTY_PRINT);
//echo $curl_Tranfer2_response->Check_request_ID 
    }
    public function stripe() {
    }
}
?>