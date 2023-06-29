import * as Yup from 'yup';

export function initialValues() {
	return {
		name: '',
		lastName: '',
		rfc: '',
		email: '',
		password: '',
		confirmPassword: '',
	};
}

export function validationSchema() {
	return Yup.object({
		name: Yup.string().required('Ingrese un nombre válido'),
		lastName: Yup.string().required('Ingrese apellidos válidos'),
		rfc: Yup.string()
			.required('El RFC es obligatorio')
			.matches(
				/^^(([A-Z]|[a-z]|\s){1})(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))/,
				'El RFC debe tener un formato válido'
			),
		email: Yup.string()
			.email('Ingrese un correo electrónico válido')
			.required('El correo es un campo obligatorio'),
		password: Yup.string().required('Ingrese una contraseña válida'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
			.required('Confirme su contraseña'),
	});
}
