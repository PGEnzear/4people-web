import type { NextPage } from 'next';

import GameLayout from '../layout';

import styles from "./game.module.scss"

import Image from 'next/image';

import { useEffect, useState } from 'react';
import { GameApiService } from '@/bot-api/GameApiService';
import { ResponseResult } from '@/bot-api/types';

import { useRouter } from 'next/router';
import { Room } from '@/ts/room/room';

import BombGrid from '@/components/bomb/bombGrid';
import MemberItem from '@/components/member/member';

import chevronRightIcon from "@/../public/resources/svg/chevron-right.svg";
import { Socket, io } from 'socket.io-client';

import swal from 'sweetalert';

export interface IOpenCell {
	amount: number,
	index: number
}

let socket: Socket;

const Home: NextPage = () => {

	const [gameApiService, DefineGameApiService] = useState<GameApiService>();

	const [roomInfo, setRoomInfo] = useState<Room>();

	const [gameStarted, setGameStarted] = useState<boolean>(false);

	const [openCells, setOpenCells] = useState<IOpenCell[]>([]);

	const [isYourStep, setIsYourStep] = useState<boolean>(false);

	const router = useRouter()

	const [isMember, setIsMember] = useState<boolean>(false);

	useEffect(() => socketInitializer(), [])

	const emitMemberJoinEvent = () => {
		if(roomInfo) {
			setRoomInfo({
				...roomInfo,
				members: roomInfo.members + 1
			})
		}
	}

	const emitMemberDisconnectEvent = () => {
		if(roomInfo) {
			setRoomInfo({
				...roomInfo,
				members: roomInfo.members - 1
			})
		}
	}

	const socketInitializer = () => {

		const initData = window.Telegram.WebApp.initData

		socket = io(process.env.NEXT_PUBLIC_API_URL!, {
			closeOnBeforeunload: true,
			extraHeaders: {
				hash: initData,
				"ngrok-skip-browser-warning": "true"
			}
		})

		const _roomInfo = roomInfo

		socket.on("message", (data) => {

			const info = JSON.parse(data)

			console.log(info)

			switch(info.event) {

				case "playerDisconnected": {
					loadGame();
					break;
				}

				case "playerJoined": {
					loadGame()
					break;
				}

				case "yourTurn": {
					setIsYourStep(true) 
					break;
				}

				case "gameStarted": {
					setGameStarted(true) 
					break;
				}

				case "gameFinished": {
					swal("Игра закончилась, противник попал на мину").then(() => {
						router.push("/")
					})
					break;
				}

				case "openCell": {
					loadGame();
					/*
					console.log(openCells)
					setOpenCells([...openCells, {
						amount: info.data.amount,
						index: info.data.index
					}])
					*/
					console.log(openCells)
					break;
				}

			}

		});

	}

	const loadGame = () => {
		if(!router.query.id) {
			return;
		}

		const initData = window.Telegram.WebApp.initData

		const gameApiService = new GameApiService(initData);

		DefineGameApiService(gameApiService);

		const routerId: string = router.query.id!.toString();

		const roomId = parseInt(routerId, 10)

		const fetchGame = () => {
			return gameApiService.getRoom(roomId);
		}

		fetchGame().then((r: ResponseResult) => {

			if(!r.ok) {
				router.push("/");
				return;
			}

			//@ts-ignore
			const room = r.result.room as (Room & {member: boolean} & {openedCells: IOpenCell[]});

			if(room.status=="ingame") {

				let openedCells = room.openedCells as IOpenCell[]

				openedCells = openedCells.map((val) => {
					return {...val, index: val.index+1}
				})

				console.log(openedCells)

				setGameStarted(true);

				setOpenCells([...openedCells])
				
			}

			setIsMember(room.member)

			setRoomInfo(room);
			
		})
	}

	useEffect(() => {

		loadGame();
		
	}, [])

	useEffect(() => {
		console.log(roomInfo)
	}, [roomInfo])

	const renderUsers = () => {
		if(!roomInfo) {
			return;
		}
		console.log(roomInfo)
		console.log(roomInfo.members)
		return (
			<div className={styles.users}>
				<MemberItem you={roomInfo.member} id={1} ready={roomInfo.members>0}></MemberItem>
				<MemberItem you={false} id={2} ready={roomInfo.members>1}></MemberItem>
				<MemberItem you={false} id={3} ready={roomInfo.members>2}></MemberItem>
				<MemberItem you={false} id={4} ready={roomInfo.members>3}></MemberItem>
			</div>
		)

	}

	const joinGame = () => {

		if(!roomInfo || !gameApiService) {
			return;
		}
		
		const connectGame = () => {
			return gameApiService.joinGame(roomInfo.id)
		}

		connectGame().then(r => {

			if(r.ok) {
				
				setRoomInfo({
					...roomInfo,
					members: roomInfo.members + 1
				})

				setIsMember(true);

			}

			console.log(r)
		
		})


	}

	const disconnect = () => {

		if(!gameApiService) return;
		if(gameStarted) return;

		const result = gameApiService.disconnect();

		result.then((r: ResponseResult) => {

			if(!r.ok) {
				return;
			}
			
			return router.push(`/`)

		})

	}

	const handleClick = (result: ResponseResult) => {

		setIsYourStep(false);

		console.log(result)

		//@ts-ignore
		if(result.result.message == "You lose") {
			//@ts-ignore
			swal(`Вы наткнулись на мину, вы выйграли ${result.result.win}`).then(() => {
				router.push("/")
			});
		}

	}

	return (
		<main>
			<GameLayout>
				<div className={styles.mainPage}>
					<div className={styles.infoLabel}>
						<div className={styles.infoText}>
							<div className={styles.infoImage}>
								<Image
									priority
									src={chevronRightIcon}
									alt="<"
								/>
							</div>
							<div className = {styles.infoText}>
								<p>Назад</p>
							</div>
						</div>
						<p>Комната #{roomInfo?.id}</p>
					</div>
					<div className={styles.labelUsers}>
						<p>Список игроков</p>
						<p>{roomInfo?.amount}₽</p>
					</div>
					{renderUsers()}
					<BombGrid onClick={handleClick} openCells={openCells} showCells = {gameStarted}></BombGrid>
					{
						!gameStarted ? (
							<button
								className={`${styles.disconnect}`}
								onClick={(() => (isMember ? disconnect : joinGame)() )}
							>
								<p>
									{
										isMember ? "Выйти" : "Присоединиться"
									}
								</p>
							</button>
						) : (
							<p className={styles.actionLabel}>
								{
									isYourStep ? "Откройте ячейку" : "Ход противника"
								}
							</p>
						)
					}
					
				</div>
			</GameLayout>
		</main>
	);

};

export default Home;