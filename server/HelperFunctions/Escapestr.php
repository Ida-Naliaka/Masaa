<?php
function Escapestr ($str)
{
  
        $specialchars = "#$%^&*()+=-[]';,./{}|:<>?~";
        if (strpbrk($str, $specialchars)) {
            $escaped = addslashes($str);
            return $escaped;
        } else {
            return $str;
        }
}
?>
