<?php

$name = "Undefined name";

if(isset($_POST['cart'])){
    $cart = $_POST['cart'];
}

$message = "<p>Hi!</p>";
$message .= "<p>Wazaaaaa $cart</p>";

$to_email = 'matiaxlanus@gmail.com';
$subject = 'LUDETEX - Pedido';
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Biloo <noreply@ydomain.com>';

mail($to_email, $subject, $message, implode("\r\n", $headers));

?>