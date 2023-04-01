<?php
include_once "HelperFunctions/Escapestr.php";
include_once "Operations.php";

class User
{
    public string $name;
    public string $email;
    public string $password;
    public string $type;
    public string $confirmationcode;
    public string $status;
    public string $phone;
    public string $city;
    public string $employeeid;
    private $table='users';

    public static array $validTypes = ["Client", "Admin"];
    public array $data;

    public function __construct($input)
    {
        $this->data = $input;
    }

    public function validateData()
    {
        $errors = [];
        if ($this->validateName()) {
            $errors[] = $this->validateName();
        }
         if ($this->validateType()) {
            $errors[] = $this->validateType();
        }
        if ($this->validateID()) {
            $errors[] = $this->validateID();
        }
        if ($this->validateEmail()) {
            $errors[] = $this->validateEmail();
        }
        if ($this->validatePassword()) {
            $errors[] = $this->validatePassword();
        }
        if ($this->validatePhone()) {
            $errors[] = $this->validatePhone();
        }
        if ($this->validateCity()) {
            $errors[] = $this->validateCity();
        }
        if ($this->validateConfirmationcode()) {
            $errors[] = $this->validateConfirmationcode();
        }
        if ($this->validateStatus()) {
            $errors[] = $this->validateStatus();
        }
        $res=['errors'=> $errors, 
        'newuser'=>['name'=>$this->name, 'type'=>$this->type, 'employeeid'=>$this->employeeid,
         'email'=>$this->email, 'password'=>$this->password, 'phone'=>$this->phone, 
         'city'=>$this->city, 'confirmationcode'=>$this->confirmationcode, 'status'=>$this->status]];
        return $res;
    }


    private function validateName()
    {
        if (!$this->data["name"]) {
            return "Name was not provided!";
        }

        if ($this->data["name"] === "") {
            return "Invalid name!";
        }
        $prodname = Escapestr($this->data["name"]); //for name entries with apostrophes etc
        $this->name = $prodname;
        return "";
    }
    private function validateType()
    {
        if (!$this->data["type"]) {
            return "Type was not provided!";
        }
        if (in_array($this->data["type"], $this::$validTypes)) {
            $this->type = $this->data["type"];
            return "";
        }
        return "Invalid type!";
    }
    private function validateID()
    {
        if ($this->data["employeeid"]==="N/A" ) {
             $this->employeeid = $this->data["employeeid"];
        } else {
            $this->employeeid = $this->data["employeeid"];
        }
        return "";
    }
    private function validateEmail()
    {
        if (!$this->data["email"]) {
            return "Email was not provided!";
        }
        if (
            !filter_var($this->data["email"], FILTER_VALIDATE_EMAIL)
        ) {
            return "Invalid email!";
        } else {
        $statement = (new Operations($this->table))->find("*",$this->data["email"],"email");
        if ($statement->num_rows > 0) {
            return "User already exists!";
        } else {
            $this->email = $this->data["email"];
            return "";
        }
    }
    }
    private function validatePassword()
    {
        if (!$this->data["password"]) {
            return "Password was not provided!";
        } else {
        $encrypted=password_hash($this->data["password"], PASSWORD_DEFAULT);
        $this->password = Escapestr($encrypted);
        return "";
    }
    }
    private function validatePhone()
    {
        if (!$this->data["phone"]) {
            return "Phone was not provided!";
        }
        $statement = (new Operations($this->table))->find('*',$this->data["phone"], "phone");
        if ($statement->num_rows > 0) {
            return "User already exists!";
        } else {
        $this->phone = $this->data["phone"];
        return "";
    }  
    }
    private function validateCity()
    {
        if (!$this->data["city"]) {
            return "City was not provided!";
        }

        $this->city = $this->data["city"];
        return "";
    }
    private function validateConfirmationcode()
    {
             $this->confirmationcode = $this->data["confirmationcode"];
             return "";
    }
    private function validateStatus()
    {
             $this->status = $this->data["status"];
             return "";
    }
}
?>
