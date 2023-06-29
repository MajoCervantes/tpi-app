import * as Yup from 'yup';

export function initialValues() {
	return {
		email: '',
		password: '',
	};
}

export function validationSchema() {
	return Yup.object({
		email: Yup.string()
			.email('Ingrese un correo electrónico válido')
			.required('El correo es un campo obligatorio'),
		password: Yup.string().required('Ingrese una contraseña válida'),
	});
}
