<?php
include_once "Methods.php";
include_once "Checkout/PaymentInit.php";
include_once "Checkout/Callback.php";
include_once "Checkout/Daraja.php";
class Router {
    protected $directory;
    protected $request;
    
    public function __construct($checkout) {
        $this-> request= $checkout;
        $this-> directory= ucfirst($checkout);
}
   /* private function routes()
    {
        switch ($this->request) {
            case 'products':
                echo('products route done');
                $this->directory="Product";
                echo $this->directory;
                 $this->relay();
                break;
             case 'users':
                $this->directory="User";
                 $this->relay();
                break;
            case 'orders':
                $this->directory="Order";
                 $this->relay();
                break;
            case '/reactphp/server/checkout':
                $direct=new Checkout();
                $checkout= $_GET["direct"];
                $checkout==="mpesa"? $direct->lipanampesa : $direct->stripe;
                break;
            case 'payment_init':
            new PaymentInit();
            break;
            }
        }*/
        public function relay()
        {
            if (!empty($this->directory)){
                if($this->directory==='Paymentstatus') {

                }else if ($this->directory==='Paymentinit'){
                    $intent=new PaymentInit();
                    $intent->createPaymentIntent();
                }else if ($this->directory==='Mpesa'){
                    $intent=new MpesaPaymentInit();
                    $intent->initiatePayment();
                }
                else if ($this->directory==='Callbackmpesa'){
                    $intent=new Callback();
                    $intent->checkPayment();
                } else {
            $processes=new Methods($this->directory);
            $processes->requestMethod();
        }
        }
        }
    }
?>