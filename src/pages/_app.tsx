import 'semantic-ui-css/semantic.min.css';
import '@/scss/global.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
