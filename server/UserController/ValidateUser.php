<?php
include_once "env.php";
class ValidateUser
{
    function base64url_encode($str) {
    return rtrim(strtr(base64_encode($str), '+/', '-_'), '=');
}
    function generate_jwt($payload ) {
        $secret=getenv("jwtsecret");
        $headers = array('alg'=>'HS256','typ'=>'JWT');
        $headers_encoded = $this->base64url_encode(json_encode($headers));
        $payload_encoded = $this->base64url_encode(json_encode($payload));
        $signature = hash_hmac('SHA256', "$headers_encoded.$payload_encoded", $secret, true);
        $signature_encoded = $this->base64url_encode($signature);
        $jwt = "$headers_encoded.$payload_encoded.$signature_encoded";
	return $jwt;
}

}
?>