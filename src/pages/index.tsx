import type { NextPage } from 'next';

import GameLayout from './layout';

import styles from "@/styles/index.module.scss"

import Image from 'next/image';

import EventNotification from '@/components/event/event';

import roomsIcon from "@/../public/resources/svg/rooms.svg";
import RoomItem from '@/components/room/room';
import { useEffect, useState } from 'react';
import { GameApiService } from '@/bot-api/GameApiService';
import { ResponseResult } from '@/bot-api/types';
import { Room } from '@/ts/room/room';
import { useAppSelector } from '@/redux/store';
import swal from 'sweetalert';
import { UserApiService } from '@/bot-api/UserApiService';
import { useRouter } from 'next/navigation';

const Home: NextPage = () => {

	const [filter, setFilter] = useState<boolean>(true);

	const [rooms, setRooms] = useState<Room[]>([])

	const [displayRooms, setDisplayRooms] = useState<Room[]>([]);
	
	const balance = useAppSelector(state => state.user.balance)

	const router = useRouter()

	useEffect(() => {
		if(!balance) return;
		if(!filter) {
			const result: Room[] = rooms.filter((room: Room) => (room.amount <= balance))
			const roomResult: Room[] = result.map((room: Room) => {
				return {...room, avaliable: true}
			})
			setDisplayRooms(roomResult)
		} else {
			setDisplayRooms(rooms)
			filterRooms()
		}
	}, [filter])
	
	const processGame = (amount: number) => {

		const initData = window.Telegram.WebApp.initData

		const gameApiService = new GameApiService(initData);

		const game = gameApiService.createGame(amount);

		game.then((r: ResponseResult) => {
			
			console.log(r)

			if(!r.ok) {
				return swal("Ошибка", "Что-то пошло не так, попробуйте позже", "warning")
			}
			
			//@ts-ignore
			return router.push(`/game/${r.result.roomId}`)

		})
	}

	const createGame = () => {

		const initData = window.Telegram.WebApp.initData

		swal("Выберите сумму ставки", {
			//@ts-ignore
			buttons: {
				25: "25",
				50: "50",
				100: "100",
				500: "500"
			},
		})
		.then((value) => {
			switch (value) {

				case "25": {
					if(balance < 25) return swal("Ошибка", "Недостаточно средств", "warning")
					processGame(25)
					break;
				}

				case "50": {
					if(balance < 50) return swal("Ошибка", "Недостаточно средств", "warning")
					processGame(50)
					break;
				}

				case "100": {
					if(balance < 100) return swal("Ошибка", "Недостаточно средств", "warning")
					processGame(100)
					break;
				}

				case "500": {
					if(balance < 500) return swal("Ошибка", "Недостаточно средств", "warning")
					processGame(500)
					break;
				}
			}
		});
	}

	const joinGame = (id: number) => {
		return router.push(`/game/${id}`)
	}
	
	const filterRooms = () => {
		if(!balance) return;
		const result = rooms.map((room) => {
			console.log(room.amount <= balance)
			return {
				...room,
				avaliable: (room.amount <= balance)
			}
		})
		setDisplayRooms(result)
	}

	useEffect(() => {
		filterRooms()
	}, [balance, rooms])
	
	useEffect(() => {

		const initData = window.Telegram.WebApp.initData

		const userApiService = new UserApiService(initData);

		const gameApiService = new GameApiService(initData);
		
		const fetchActiveGame = () => {
			return userApiService.getMyActiveRoom();
		}

		try {

			fetchActiveGame().then((r: ResponseResult) => {
			
				//@ts-ignore
				if(!r.ok || !r.result.room.hasOwnProperty("id")) {
					return;
				}

				//@ts-ignore
				const roomId = r.result.room.id

				console.log(roomId)

				return router.push(`/game/${roomId}`)

			})

		} catch(e) {
			console.log(e)
		}

		const fetchGameData = () => {
			return gameApiService.getAllGames();
		}
		
		try {

			fetchGameData().then((r: ResponseResult) => {

				if(!r.ok) {
					return
				}
				
				//@ts-ignore
				const rooms = r.result.rooms as Room[]

				setRooms(rooms);

			})

		} catch(e) {

		}
	}, [])

	const selectAvaliableRooms = (e: any) => {
		setFilter(false)
	}

	const selectAllRooms = (e: any) => {
		setFilter(true);
	}

	return (
		<main>
			<GameLayout>
				<div className={styles.mainPage}>
					<EventNotification />
					<div className={styles.roomsLabel}>
						<Image
							priority
							src={roomsIcon}
							alt="4People"
						/>
						<p>Список комнат</p>
					</div>
					<button className={styles.createRoomButton} onClick={e => createGame()}>
						<p>Создать комнату</p>
					</button>
					<div className={styles.roomSelector}>
						<div className={`${styles.roomsAvaliable} ${filter && styles.isActive}`} onClick={e => selectAllRooms(e)}>
							<p>Все</p>
						</div>
						<div className={`${styles.roomsUnavaliable} ${!filter && styles.isActive}`}  onClick={e => selectAvaliableRooms(e)}>
							<p>Доступные мне</p>
						</div>
					</div>
					<ul>
						{
							displayRooms.map((room) => {
								return(
									<li>
										<RoomItem
											key = {room.id}
											amount={room.amount}
											available={room.avaliable}
											players={room.members}
											onClick={() => joinGame(room.id)}
										></RoomItem>
									</li>
								)
							})
						}
					</ul>
				</div>
			</GameLayout>
		</main>
	);

};

export default Home;