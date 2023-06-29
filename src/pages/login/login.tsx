import LoginLayout from '@/layouts/LoginLayout/LoginLayout';
import { LoginForm } from '@/components/Auth/LoginForm';
import { Seo } from '@/components/Shared/Seo';

const LoginPage = () => {
	return (
		<>
			<Seo title='Inicio de sesión' />
			<LoginLayout>
				<LoginForm />
			</LoginLayout>
		</>
	);
};

export default LoginPage;
