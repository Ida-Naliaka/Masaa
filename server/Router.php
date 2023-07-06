<?php
include_once "Methods.php";
include_once "Checkout/PaymentInit.php";
class Router {
    protected $directory;
    protected $request;
    
    public function __construct($checkout) {
        $this-> request= $checkout;
        $this-> directory= ucfirst($checkout);
}
    public function relay()
    //send request to the handling class depending on the query passed
    {
        if (!empty($this->directory)){
            if($this->directory==='Paymentstatus') {

            }else if ($this->directory==='Paymentinit'){
                $intent=new PaymentInit();
                $intent->createPaymentIntent();
            } else {
                $processes=new Methods($this->directory);
                $processes->requestMethod();
    }
    }
    }
    }
?>