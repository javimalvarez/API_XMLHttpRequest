<?php
session_start();
//Se decodifica el JSON recibido en servidor y se genera un array
$datosJSON=json_decode(file_get_contents("php://input"), true);
    if (isset($datosJSON['nombre'])){
        if (preg_match('/^[A-Z a-z]{2,}$/', $datosJSON['nombre'])){
            $_SESSION['nombre']=$datosJSON['nombre'];
        }else{
            $respuesta=array('errorNombre'=>'Los datos introducidos no son válidos');
        }
    }
    if (isset($datosJSON['correo'])){
        if(preg_match('/^([a-z])[\w\.]*@\w+\.[a-z]{2,}$/', $datosJSON['correo'])){
            $_SESSION['correo']=$datosJSON['correo'];
        }else{
            $respuesta=array('errorCorreo'=>'Los datos introducidos no son válidos');
        }
    }

    if (isset($_SESSION['nombre'])&&$_SESSION['correo']){
        header("Location: bienvenido.php");
    }

?>