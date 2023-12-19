const patronDatos=/^[A-Z a-z]{2,}$/;
const patronCorreo=/^([a-z])[\w\.]*@\w+\.[a-z]{2,}$/;
let nombre;
let contraseña;
let error;

function erroresFormulario(){
    nombre=document.getElementById('nombre').value;
    correo=document.getElementById('correo').value;
    error=0;
    if (!patronDatos.test(nombre)){
        document.getElementById('error').innerHTML+="*Formato datos incorrecto<br/>";
        error++;
    }
    if(!patronCorreo.test(correo)){
        document.getElementById('error').innerHTML+="*Formato correo incorrecto</br>";
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
        //event.preventDefault();
        enviarAJAX();
    }
});

function borrarErrores(){
    document.getElementById('error').innerHTML="";
}

function enviarAJAX(){
    //Nuevo objeto xhttp
    let xhttp = new XMLHttpRequest();
    let datosEnviados = {'nombre': nombre,'correo': correo};
    let datosJSON=JSON.stringify(datosEnviados);
    let url="server.php"
    xhttp.open("POST",url,true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            //Respuesta recibida del servidor
            let respuesta=JSON.parse(this.responseText);
            document.getElementById('respuesta').innerHTML+=respuesta;
        }
    };
    xhttp.send(datosJSON);
}
