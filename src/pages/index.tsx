import Head from 'next/head';
import LoginPage from './login/login';

export default function Home() {
	return (
		<>
			<Head>
				<title>TPI</title>
				<meta name='PTI' content='PROMOTORA TECNOLÓGICA DE INVERSIONES' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />

				<title>My Website</title>
			</Head>
			<main>
				<LoginPage />
			</main>
		</>
	);
}
