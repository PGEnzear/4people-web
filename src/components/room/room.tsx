import styles from "./room.module.scss"

import Image from 'next/image';

import joinIcon from "@/../public/resources/svg/join.svg";

import type { NextPage } from 'next';

interface IRoomItem {
    amount: number;
    players: number;
    available: boolean | undefined;
    onClick: Function;
}

const RoomItem: NextPage<IRoomItem> = ({
    amount: p_amount,
    players: p_players,
    onClick: p_onClick,
    available: p_available = false,
}: IRoomItem) => {

	return (
		<main className={styles.room} onClick={e => p_onClick(e)}>
            <div className={styles.roomContent}>
                <p className={styles.roomInfo}>{p_amount}₽<span>x{p_players}</span></p>
                <div className={styles.roomJoin}>
                    <div className={styles.roomJoinItems}>
                        <p>{ p_available ? "Войти" : "Нет средств" }</p>
                        <Image
                            priority
                            src={joinIcon}
                            alt=">"
                        />
                    </div>
                </div>
            </div>
        </main>
	);

};

export default RoomItem;