import axios from 'axios';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

import "../styles/global.css"

import { store } from '@/redux/store';

import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {

	const [isHashValid, setIsHashValid] = useState(false);

	useEffect(() => {

		axios
			.post('/api/validate-hash', { hash: window.Telegram.WebApp.initData })
			.then((response) => setIsHashValid(response.status === 200))
			.catch((err) => {
				console.log("[APP] Unknown platform")
			})

	}, []);

	/*
	if (!isHashValid) {
		return (
			<h1>Unknown platform. Access denied</h1>
		)
	}
	*/

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	)
}

export default MyApp;