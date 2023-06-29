import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Icon, Label, Checkbox } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './SignUpForm.form';
import userStore from '@/store/user.store';
import styles from './SignUpForm.module.scss';

export const SignUpForm = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setConfirmShowPassword] =
		useState<boolean>(false);

	const router = useRouter();

	const {
		setName,
		setLastName,
		setEmail,
		setPassword,
		setConfirmPassword,
		createUserWithEmailAndPassword,
	} = userStore();

	const handleSubmit = () => {
		const { name, lastName, email, password, confirmPassword } = formik.values;
		setName(name);
		setLastName(lastName);
		setEmail(email);
		setPassword(password);
		setConfirmPassword(confirmPassword);
		createUserWithEmailAndPassword();
		router.push('/login');
	};
	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: validationSchema(),
		validateOnChange: true,
		onSubmit: handleSubmit,
	});

	return (
		<Form onSubmit={formik.handleSubmit}>
			<Form.Group widths={'equal'}>
				<Form.Input
					name='name'
					type='text'
					placeholder='Nombre (s)'
					value={formik.values.name}
					onChange={formik.handleChange}
					error={formik.errors.name}
					icon={<Icon name='user' />}
				/>
				<Form.Input
					name='lastName'
					type='text'
					placeholder='Apellidos'
					value={formik.values.lastName}
					onChange={formik.handleChange}
					error={formik.errors.lastName}
					icon={<Icon name='user' />}
				/>
				<Form.Input
					name='rfc'
					type='text'
					placeholder='RFC'
					value={formik.values.rfc}
					onChange={formik.handleChange}
					error={formik.errors.rfc}
					icon={<Icon name='address card' />}
				/>
			</Form.Group>
			<Label basic className={styles.label}>
				No sabes cual es tu RFC, consúltalo
				<Link
					href={
						'https://www.sat.gob.mx/aplicacion/31274/consulta-tu-clave-de-rfc-mediante-curp'
					}>
					aquí
				</Link>
			</Label>

			<div className={styles.nationalityContainer}>
				<label>Nacionalidad</label>
				<Form.Group className={styles.nationality}>
					<Checkbox label='Mexicana' />
					<Checkbox label='Extranjera' />
				</Form.Group>
			</div>

			<Form.Group widths={'equal'}>
				<Form.Input
					name='email'
					type='text'
					placeholder='Correo electrónico'
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.errors.email}
					icon={<Icon name='envelope open' />}
				/>

				<Form.Input
					name='password'
					type={showPassword ? 'text' : 'password'}
					placeholder='Cambiar contraseña'
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.errors.password}
					icon={
						<Icon
							onClick={() => {
								setShowPassword(!showPassword);
							}}
							name={showPassword ? 'eye' : 'eye slash'}
						/>
					}
				/>
				<Form.Input
					name='confirmPassword'
					type={showConfirmPassword ? 'text' : 'password'}
					placeholder='Confirmar contraseña'
					value={formik.values.confirmPassword}
					onChange={formik.handleChange}
					error={formik.errors.confirmPassword}
					icon={
						<Icon
							onClick={() => {
								setConfirmShowPassword(!showConfirmPassword);
							}}
							name={showPassword ? 'eye' : 'eye slash'}
						/>
					}
				/>
			</Form.Group>

			<div className={styles.checkboxContainer}>
				<Checkbox id='checkbox' />
				<hr /> <hr /> <hr />
				<label htmlFor='checkbox' className={styles.label}>
					Estoy de acuerdo con los
					<Link href='#'>Términos y condiciones</Link> y con el tratamiento de
					mis datos personales, según el{' '}
					<Link href='#'>Aviso de Privacidad</Link>
				</label>
			</div>
			<Form.Button type='submit' fluid>
				Registrarme
			</Form.Button>
		</Form>
	);
};
