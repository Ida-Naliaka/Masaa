<?php
include_once "Addmpesaorder.php";
include_once "HelperFunctions/response.php";
class Callback {
    private $resultCode;
    private $callbackData;
    public function __construct()
    {
        $callbackJSONData=file_get_contents('php://input');
        $logFile = "stkPush.json";
        $log = fopen($logFile, "a");
        fwrite($log, $callbackJSONData);
        fclose($log);
        $this->callbackData=json_decode($callbackJSONData);
    }
    public function checkPayment()
    {
         $this->resultCode= $this->callbackData->Body->stkCallback->ResultCode;
         if($resultCode == 0){
            $insert=new Addmpesaorder($this->callbackData);
            $insert->Finalstmt();   
        } else {
            $output=['success'=> false, 'error'=> 'Invalid PaymentIntent status'];
            return response($output);
        }
    }
}
?>