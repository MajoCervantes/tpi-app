import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Icon, Label } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './LoginForm.form';
import userStore from '@/store/user.store';

export const LoginForm = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const { setEmail, setPassword, loginWithEmailAndPassword, error, setError } =
		userStore();
	const router = useRouter();


	const handleLogin = async () => {
		const { email, password } = formik.values;
		setEmail(email);
		setPassword(password);
		try {
			await loginWithEmailAndPassword();
			if (!userStore.getState().error) {
				router.push('./home');
			} else {
				return;
			}
		} catch (error) {
			console.error(error);
		}
	};

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: validationSchema(),
		validateOnChange: false,
		onSubmit: handleLogin,
	});

	useEffect(() => {
		setError(null);
	}, []);

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<Form onSubmit={formik.handleSubmit}>
			<Form.Group widths={'equal'}>
				<Form.Input
					name='email'
					type='text'
					label='EMAIL'
					placeholder='Email'
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.errors.email}
					icon={<Icon name='envelope open' />}
				/>

				<Form.Input
					name='password'
					type={showPassword ? 'text' : 'password'}
					label='CONTRASEÑA'
					placeholder='Contraseña'
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

				<Label basic>¿Olvidaste tu contraseña?</Label>
			</Form.Group>

			<Form.Button type='submit' fluid>
				Iniciar sesión
			</Form.Button>
		</Form>
	);
};
