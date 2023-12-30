<link rel="stylesheet" type="text/css" href="styles/estilos.css">
<?php
session_start();
include("includes/header.html");
echo "<h2 style='text-align: center'>Congratulations! You have registered successfully</h2><br/>
<div style='margin-right:35%; margin-left:35%; margin-bottom:7%; padding:15px; border-radius:7px'>
".$_SESSION['nombre']." ". $_SESSION['apellido']." has been recruited by the S.H.I.E.L.D. agency<br/>
These are the details of the registration information:<br/><br/>
<table style='font-family:courier'><tr><td style='font-weight: bold'>name:</td><td>".$_SESSION['nombre']."</td></tr>
<tr><td style='font-weight: bold'>surname:</td><td>".$_SESSION['apellido']."</td></tr>
<tr><td style='font-weight: bold'>email:</td><td>".$_SESSION['correo']."</td></tr></table></div>";
include("includes/footer.html");
?>