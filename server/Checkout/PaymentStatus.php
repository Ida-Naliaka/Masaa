<?php 
include_once 'env.php'; 
include_once 'DbConnect.php'; 
class PaymentStatus
{ 

 public function __construct() {
    $this->payment_ref_id='';
    $this->status='error';
 }

 public function getPayment() {
    // Check whether the payment ID is not empty 
    if(!empty($_GET['pid'])) { 
        $payment_txn_id  = base64_decode($_GET['pid']);
        // Fetch transaction data from the database
        $statement = (new Operations("transactions"))->find(
            ['id','txn_id','paid_amount','paid_amount_currency','payment_status','customer_name','customer_email'],
            $payment_txn_id,
            "txn_id"
        );
        //$sqlQ = "SELECT id,txn_id,paid_amount,paid_amount_currency,payment_status,customer_name,customer_email FROM transactions WHERE txn_id = ?"; 
        // $stmt = $db->prepare($sqlQ);
        // $stmt->bind_param("s", $payment_txn_id); 
        // $stmt->execute(); 
        // $stmt->store_result(); 
        if($statement->num_rows > 0){ 
        // Get transaction details 
        $statement->bind_result($payment_ref_id, $txn_id, $paid_amount, $paid_amount_currency, $payment_status, $customer_name, $customer_email); 
        $statement->fetch();
        $status = 'success'; 
        $statusMsg = 'Your Payment has been Successful!'; 
        $output=['status'=>$status,
         'statusMsg'=> $statusMsg,
        'payment_ref_id'=>$payment_ref_id,
        'txn_id'=>$txn_id,
        'paid_amount'=>$paid_amount, 
        'paid_amount_currency'=>$paid_amount_currency,
        'payment_status'=>$payment_status,
    ];
    }else{ 
        $status = 'failed'; 
        $statusMsg = "Transaction has failed!";
        $output=['status'=>$status,
        'statusMsg'=> $statusMsg,];
    } 
   response($output);
}//else{ 
   // header("Location: index.php"); 
  //  exit; 
//}
}
}
?>