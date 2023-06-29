import { Modal } from 'semantic-ui-react';
import moment from 'moment';
import 'moment/locale/es';
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';
import userStore from '@/store/user.store';
import styles from './BasicModal.module.scss';

type Props = {
	show: boolean;
	onClose: () => void;
	isOpen: boolean;
	isClosing: boolean;
};

const BasicModal = ({ show, onClose, isOpen, isClosing }: Props) => {
	const { name, lastName, loginDate } = userStore();

	//Format the last login date received from the database with moment library
	moment.locale('es');
	const date = moment(loginDate);
	const formattedDate = date.format('DD [de] MMMM [del] YYYY [a las] HH:mm:ss');

	return (
		<Modal
			open={show}
			onClose={() => onClose}
			className={classNames(styles.modal, {
				[styles.slideIn]: isOpen,
				[styles.slideOut]: isClosing,
			})}>
			<Modal.Header className={styles.header}>
				<Icon name='close' onClick={onClose} />
				<h2>Bienvenido,</h2>
				<h2>
					{name} {lastName}
				</h2>
				<span>Último acceso, {formattedDate}</span>
			</Modal.Header>

			<Modal.Content className={styles.content}>
				<div>
					<Icon name='user circle outline' />
					<p>Mis datos</p>
				</div>

				<div>
					<Icon name='warehouse' />
					<p>Mis inversiones</p>
				</div>

				<div>
					<Icon name='chess knight' />
					<p>Movimientos</p>
				</div>

				<div>
					<Icon name='tag' />
					<p>Oportunidades</p>
				</div>

				<div>
					<Icon name='cog' />
					<p>Configuración</p>
				</div>
			</Modal.Content>

			<div className={styles.footer}>
				<p>PTI es una marca registrada</p>
				<p>Términos y condiciones & Aviso de Privacidad</p>
			</div>
		</Modal>
	);
};

export default BasicModal;
