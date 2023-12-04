const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	Usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	Nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    Apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	Contrasena: /^.{4,12}$/, // 4 a 12 digitos.
	correoElectronico: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	Telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	Usuario: false,
	Nombre: false,
    Apellido: false,
	Contrasena: false,
	correoElectronico: false,
	Telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "Usuario":
			validarCampo(expresiones.Usuario, e.target, 'Usuario');
		break;

		case "Nombre":
			validarCampo(expresiones.Nombre, e.target, 'Nombre');
		break;

        case "Apellido":
            validarCampo(expresiones.Apellido, e.target, 'Apellido');
        break;

		case "Contrasena":
			validarCampo(expresiones.Contrasena, e.target, 'Contrasena');
			validarContrasena2();
		break;

		case "Contrasena2":
			validarContrasena2();
		break;

		case "correoElectronico":
			validarCampo(expresiones.correoElectronico, e.target, 'correoElectronico');
		break;

		case "Telefono":
			validarCampo(expresiones.Telefono, e.target, 'Telefono');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarContrasena2 = () => {
	const inputContrasena1 = document.getElementById('Contrasena');
	const inputContrasena2 = document.getElementById('Contrasena2');

	if(inputContrasena1.value !== inputContrasena2.value){
		document.getElementById(`grupo__Contrasena2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__Contrasena2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__Contrasena2 i`).classList.add('fa-circle-xmark');
		document.querySelector(`#grupo__Contrasena2 i`).classList.remove('fa-circle-check');
		document.querySelector(`#grupo__Contrasena2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['Contrasena'] = false;
	} else {
		document.getElementById(`grupo__Contrasena2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__Contrasena2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__Contrasena2 i`).classList.remove('fa-circle-xmark');
		document.querySelector(`#grupo__Contrasena2 i`).classList.add('fa-circle-check');
		document.querySelector(`#grupo__Contrasena2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['Contrasena'] = true;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if(campos.Usuario && campos.Nombre &&campos.Apellido && campos.Contrasena && campos.correoElectronico && campos.Telefono){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});