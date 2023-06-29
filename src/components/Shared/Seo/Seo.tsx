import Head from 'next/head';

type Props = {
	title: string;
};

export function Seo({ title }: Props) {
	return (
		<Head>
			<title>{title}</title>
			<meta name='description' content='PROMOTORA TECNOLÓGICA DE INVERSIONES' />
		</Head>
	);
}
