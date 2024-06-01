import styles from "@/styles/layout.module.scss"

import Image from 'next/image';

import logoIcon from "@/../public/resources/svg/logo.svg";

import Balance from "@/components/balance/balance";
import { useEffect } from "react";

import { UserApiService } from '@/bot-api/UserApiService';
import { setBalanceState, setChatIdState, setIdState, setUsernameState } from '@/redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from "@/redux/store";

export default function GameLayout({
	children,
	}: {
		children: React.ReactNode
	}) {

	const balance = useAppSelector(state => state.user.balance)

	const dispatch = useAppDispatch();

	useEffect(() => {

		const userApiService = new UserApiService(window.Telegram.WebApp.initData);

		const fetchUserData = () => {
			return userApiService.getMe();
		}

		fetchUserData().then((r) => {

			if(!r.ok) {
				return;
			}

			//@ts-ignore
			const user = r.result.me as User

			dispatch(setBalanceState(user.balance))
			dispatch(setIdState(user.id))
			dispatch(setChatIdState(user.chatId))
			dispatch(setUsernameState(user.username))

		})
	}, [])

	return (
		<section className={styles["layout"]}>
			<nav className={styles["layout-nav"]}>
				<Image
					priority
					src={logoIcon}
					alt="4People"
				/>
				<Balance amount={balance}/>
			</nav>
			<div className={styles["layout-content"]}>
				<div className={styles["layout-items"]}>
					{children}
				</div>
			</div>
		</section>
	)
}