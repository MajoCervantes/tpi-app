import { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import BasicModal from '@/components/Home/BasicModal/BasicModal';
import { Seo } from '@/components/Shared/Seo';
import styles from './home.module.scss';

const HomePage = () => {
	const [show, setShow] = useState(false);
	const [isOpen, setisOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	//Update isOpen and isClosin state to control the animation of the modal
	const onOpen = () => {
		setisOpen(true);
		setShow(true);
		setIsClosing(false);
	};

	const onClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			setShow(false);
		}, 500);
	};

	return (
		<>
			<Seo title='TPI Home Page' />
			<div className={styles.container}>
				<h2>HomePage</h2>
				<Icon name='align justify' onClick={onOpen} />
				<BasicModal
					show={show}
					onClose={onClose}
					isOpen={isOpen}
					isClosing={isClosing}
				/>
			</div>
		</>
	);
};

export default HomePage;
