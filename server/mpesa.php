<?php
/*$key=JWwKm3j6OOGfGie698LXXpGSDS5mIylW;
$consumer_secret=IUFf4inQMAPG91ky;
$ch = curl_init('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer FIKJ6B6skp81SXnv9uhBSMIOJFA3',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, {
    "BusinessShortCode": 174379,
    "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwMzEyMTk1NjIy",
    "Timestamp": "20230312195622",
    "TransactionType": "CustomerPayBillOnline",
    "Amount": 1,
    "PartyA": 254708374149,
    "PartyB": 174379,
    "PhoneNumber": 254708374149,
    "CallBackURL": "https://mydomain.com/path",
    "AccountReference": "CompanyXLTD",
    "TransactionDesc": "Payment of X" 
  });
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$response     = curl_exec($ch);
curl_close($ch);
echo $response;

//response
{
  "MerchantRequestID": "93461-72184432-1",
  "CheckoutRequestID": "ws_CO_12032023195619069708374149",
  "ResponseCode": "0",
  "ResponseDescription": "Success. Request accepted for processing",
  "CustomerMessage": "Success. Request accepted for processing"

  /*$resultDesc=$callbackData->Body->stkCallback->ResultDesc;
$merchantRequestID=$callbackData->Body->stkCallback->MerchantRequestID;
$checkoutRequestID=$callbackData->Body->stkCallback->CheckoutRequestID;
$pesa=$callbackData->stkCallback->Body->CallbackMetadata->Item[0]->Name;
$amount=$callbackData->Body->stkCallback->CallbackMetadata->Item[0]->Value;
$mpesaReceiptNumber=$callbackData->Body->stkCallback->CallbackMetadata->Item[1]->Value;
$balance=$callbackData->stkCallback->Body->CallbackMetadata->Item[2]->Value;
$b2CUtilityAccountAvailableFunds=$callbackData->Body->stkCallback->CallbackMetadata->Item[3]->Value;
$transactionDate=$callbackData->Body->stkCallback->CallbackMetadata->Item[3]->Value;
$phoneNumber= $callbackData->Body->stkCallback->CallbackMetadata->Item[4]->Value;
$amount = strval($amount);
}
{"Body":
  {"stkCallback":
    {"MerchantRequestID":"16306-4668795-1","CheckoutRequestID":"ws_CO_300420210610432822","ResultCode":1032,"ResultDesc":"Request cancelled by user"}}}
    {"Body":{"stkCallback":{"MerchantRequestID":"14342-5146745-1","CheckoutRequestID":"ws_CO_300420211403028335","ResultCode":1037,"ResultDesc":"DS timeout."}}}
    {"Body":{"stkCallback":{"MerchantRequestID":"8630-7112171-1","CheckoutRequestID":"ws_CO_300420211932483406","ResultCode":1032,"ResultDesc":"Request cancelled by user"}}}
    {"Body":{"stkCallback":{"MerchantRequestID":"14369-11468455-1","CheckoutRequestID":"ws_CO_040520211534472575","ResultCode":1031,"ResultDesc":"Request cancelled by user"}}}
    {"Body":{"stkCallback":{"MerchantRequestID":"22250-15592488-1","CheckoutRequestID":"ws_CO_070520211722413639","ResultCode":0,"ResultDesc":"The service request is processed successfully.",
      "CallbackMetadata":{"Item":[{"Name":"Amount","Value":1.00},
                                  {"Name":"MpesaReceiptNumber","Value":"PE73OJNTHB"},
                                  {"Name":"Balance"},
                                  {"Name":"TransactionDate","Value":20210507172318},
                                  {"Name":"PhoneNumber","Value":254700711233}]}
                                }
                              }}
    {"Body":{"stkCallback":{"MerchantRequestID":"14371-18050755-1","CheckoutRequestID":"ws_CO_070520211755088373","ResultCode":0,"ResultDesc":"The service request is processed successfully.",
      "CallbackMetadata":{"Item":[{"Name":"Amount","Value":1.00},
                                  {"Name":"MpesaReceiptNumber","Value":"PE72OLRHYE"},
                                  {"Name":"Balance"},
                                  {"Name":"TransactionDate","Value":20210507175536},
                                  {"Name":"PhoneNumber","Value":254700711233}]}}}}

*/
?>