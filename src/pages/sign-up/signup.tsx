import React from 'react';
import SignUpLayout from '@/layouts/SignUpLayout/SignUpLayout';
import { SignUpForm } from '@/components/Auth/SignUpForm';
import { Seo } from '@/components/Shared/Seo';

const SignUpPage = () => {
	return (
		<>
			<Seo title='Crea tu cuenta' />
			<SignUpLayout>
				<SignUpForm />
			</SignUpLayout>
		</>
	);
};

export default SignUpPage;
