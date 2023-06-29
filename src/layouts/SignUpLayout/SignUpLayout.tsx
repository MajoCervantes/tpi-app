import Link from 'next/link';
import { Image, Icon } from 'semantic-ui-react';
import styles from './SignUpLayout.module.scss';
import { ReactElement } from 'react';

type Props = {
	children: ReactElement | ReactElement[];
};

const SignUpLayout = ({ children }: Props) => {
	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<Image src={'/images/logo-pti.png'} alt='pti' />
			</div>
			<h2>
				Registro de cuenta <Icon name='angle right' />
			</h2>

			<div className={styles.form}> {children} </div>
		</div>
	);
};

export default SignUpLayout;
