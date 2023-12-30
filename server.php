<?php
session_start();
//Se decodifica el JSON recibido en servidor y se genera un array
$datos=json_decode(file_get_contents("php://input"), true);
    //Variables sesión generadas a partir de los datos obtenidos del JSON enviado al servidor
    if (isset($datos['nombre'])){
        $_SESSION['nombre']=$datos['nombre'];
    }
    if (isset($datos['apellido'])){
        $_SESSION['apellido']=$datos['apellido'];
    }
    if (isset($datos['correo'])){
        $_SESSION['correo']=$datos['correo'];
    }
    /*La validación de los datos nombre, apellido, correo y confirmación contraseña se realiza del lado cliente
    de la parte del servidor se valida que la contraseña enviada por el usuario cumpla con los requisitos establecidos de seguridad*/
    /*$patronContraseña='/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[\w\W]{6,}$/';/*Patrón para validar contraseña
    *?=.*[A-Z] debe incluir al menos una mayúscula
    ?=.*[a-z] debe incluir al menos una minúscula
    ?=.*[0-9] de incluir al menos un número
    [\w\W] se permite carácteres alfanuméricos y carácteres especiales
    {6,} longitud mínima de 6 carácteres*/
    if(isset($datos['contraseña'])){
        //Se pasa el patrón de comparación y se comprueba con la información recuperada del JSON
        if (preg_match('/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[\w\W]{6,}$/', $datos['contraseña'])){
            $_SESSION['contraseña']=$datos['contraseña'];
        }else{
            $respuesta= array('error'=>"La contraseña no cumple con los requisitos especificados<br>(ERROR SERVER VALIDATION)");
            //Se devuelve la información en un JSON
            echo json_encode($respuesta);
        }
    }
    
    //En caso de que tengamos definidas las variables de sesión redirigimos a la página registro_exitoso.php
    if (isset($_SESSION['nombre'])&&isset($_SESSION['apellido'])&&isset($_SESSION['correo'])&&isset($_SESSION['contraseña'])){
        header("Location: registro_exitoso.php");
    }
?>