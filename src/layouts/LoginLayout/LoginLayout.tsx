import { ReactElement } from 'react';
import Link from 'next/link';
import { Image, Button, Divider, Checkbox } from 'semantic-ui-react';
import userStore from '@/store/user.store';
import styles from './LoginLayout.module.scss';

type Props = {
	children: ReactElement | ReactElement[];
};

const LoginLayout = ({ children }: Props) => {
	const { error } = userStore();

	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<Image src={'/images/logo-com.png'} alt='pti' />
			</div>

			<div className={styles.form}> {children} </div>

			<div className={styles.actions}>
				<Link href={'/sign-up'}>CREAR CUENTA</Link>
				{!error && <Checkbox label='Mantener sesión iniciada' />}
			</div>

			<Divider className={styles.divider} horizontal>
				Ó regístrate con
			</Divider>

			<div className={styles.socialMedia}>
				<Button circular>
					<Image src='/images/google.png' alt='google' />
				</Button>
				<Button circular>
					<Image src='/images/facebook.png' alt='facebook' />
				</Button>
			</div>
		</div>
	);
};

export default LoginLayout;
