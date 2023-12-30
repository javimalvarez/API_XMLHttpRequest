const patronDatos=/^(?!\s)[A-Z a-z \s]{2,}$/;//Limita el tipo de información a introducir en los campos nombre y apellido del formulario
/*(?!\s) no permite espacios en blanco
[A-Z a-z \s] cualquier letra y se permiten espacios en blanco
{2,} número mínimo de caracteres de la cadena*/
const patronCorreo=/^([a-z])[\w\.]*@\w+\.[a-z]{2,}$/;//Se define el formato correo valido
/*([a-z]) inicio de cadena con minúsculas
[\w\.] se permite solo carácteres alfanuméricos incluido _ y punto
@\w debe incluir arroba y cualquier caracter alfanumérico a continuación incluido _
\.[a-z]{2,} incluye punto y a continuación del punto minúsculas por número mayor o igual de 2*/
let nombre;
let apellido;
let correo;
let contraseña;
let confirmPass;
let error;

function erroresFormulario(){
    error=0;//Cada vez que se llama a la función el contador de errores se pone a 0
    //Recuperación de información desde el formulario
    nombre=document.getElementById('nombre').value;
    apellido=document.getElementById('apellido').value;
    correo=document.getElementById('correo').value;
    contraseña=document.getElementById('contraseña').value;
    confirmPass=document.getElementById('confirmar').value;
    //Validación del formulario realizando conteo de errores y almacenando número de errores en la variable error
    if(!patronDatos.test(nombre)){
        document.getElementById('info_nombre').innerHTML="*El formato de los datos es incorrectos<br/>";
        error++;
    }
    if(!patronDatos.test(apellido)){
        document.getElementById('info_apellido').innerHTML="*El formato de los datos es incorrecto<br/>";
        error++;
    }
    if(!patronCorreo.test(correo)){
        document.getElementById('info_correo').innerHTML="*El formato del correo no es válido<br/>";   
        error++;
    }
    if(contraseña!=confirmPass||confirmPass==""){/*Comprueba que la contraseña y su confirmación son iguales 
    La validación del formato de la contraseña se realiza en el servidor*/
        document.getElementById('info_confirmacion').innerHTML="*La contraseña y su confirmación no coinciden<br/>";
        error++;
    }
    return error;
}
//var formulario=document.getElementById('registro');
var boton=document.getElementById('enviar');
boton.addEventListener("click", function (event) {
    let errores=erroresFormulario();
    //Si hay errores no se envían los datos y se borra la información transcurridos 3 segundos
    if (errores>0){
        event.preventDefault();
        setTimeout(borrarErrores, 3000);  
    }else{
        enviarAJAX();
        //Se encarga de borrar el error en caso de que la validación de la contraseña por parte del servidor nos devuelva un error de formato
        setTimeout(borrarErrores, 3000);
    }
});

//Función encarga de borrar la información de los errores en la vista
function borrarErrores(){
    document.getElementById('info_nombre').innerHTML="";
    document.getElementById('info_apellido').innerHTML="";
    document.getElementById('info_correo').innerHTML="";
    document.getElementById('info_confirmacion').innerHTML="";
    document.getElementById('info_contraseña').innerHTML="";
}

//Envío de datos al servidor utilizando API XMLHttpRequest de AJAX
function enviarAJAX(){
    //Nuevo objeto xhttp
    let xhttp = new XMLHttpRequest();
    //Creación de un objeto tipo JSON con la información recuperada del formulario
    let datosEnviados = {'nombre': nombre,'apellido': apellido,'correo':correo,'contraseña':contraseña,'confirm':confirmPass};
    //Envío JSON como cadena
    let datos=JSON.stringify(datosEnviados);
    let url="server.php"
    xhttp.open("POST",url,false);
    //Se informa del tipo de información enviada en la cabecera
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            //Respuesta recibida del servidor
            let respuesta=JSON.parse(this.responseText);
            //Se muestra respuesta recibida del servidor en vista
            document.getElementById('info_contraseña').innerHTML=respuesta.error;
        }
    };
    xhttp.send(datos);
}