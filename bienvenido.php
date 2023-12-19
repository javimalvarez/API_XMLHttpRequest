<?php
session_start();
if (isset($_SESSION['nombre'])&&isset($_SESSION['correo'])){
    echo "Bienvenido ".$_SESSION['nombre']."<br>Tu correo es ".$_SESSION['correo'];
}
?>