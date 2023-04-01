<?php
include_once "HelperFunctions/response.php";
include_once "UserGroups/User.php";
include_once "Operations.php";
include_once "ValidateUser.php";
class Auth
{
    private $table='users';
    public function Login($user) {
        $statement = (new Operations($this->table))->find('*', $user["email"], "email");
            if ($statement->num_rows > 0) {
                $userinfo=$statement->fetch_all(MYSQLI_ASSOC)[0];
                if (password_verify($user["password"], $userinfo["pass"])) {
                    $payload = array('userid'=>$userinfo["userid"],'name'=>$userinfo["name"], 'type'=>$userinfo["type"], 'exp'=>(time() + 60));
                    $validate =new ValidateUser();
                    $jwt=$validate->generate_jwt($payload);
                    return response(['success'=>true, 'user'=>array('userid'=>$userinfo["userid"], 'name'=>$userinfo["name"], 'email'=>$user["email"], 'status'=>$userinfo["status"], 'token'=>$jwt)]);
           } else {
            return response(['success'=>false, 'message'=>'Wrong Password']);
           }
        } else {
            return response(['success'=>false, 'message'=>'User not Found']);
           };
    }
    public function Signup($user) {
        $newUser = new User($user);
        $result = $newUser->validateData();
                if (!$result['errors']) {
                    $newUser=$result['newuser'];
                    return response(  
                        (new Operations($this->table))->save($newUser, [
                            "name",
                            "type",
                            "employeeid",
                            "email",
                            "pass",
                            "phone",
                            "city",
                            "confirmationcode",
                            "status",
                        ])
                    );
                } else {
                    return response($errors);
                }
    }
}
?>