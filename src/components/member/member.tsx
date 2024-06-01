import styles from "./member.module.scss"

import Image from 'next/image';

import userOctagonIcon from "@/../public/resources/svg/user-octagon.svg";

import type { NextPage } from 'next';

interface IRoomItem {
    id: number,
    you: boolean,
    ready: boolean;
}

const MemberItem: NextPage<IRoomItem> = ({
    id: p_id,
    ready: p_ready,
    you: p_you
}: IRoomItem) => {

    {console.log(p_ready, p_you, p_id)}

	return (

		<main className={`${styles.member} ${p_ready || p_you ? styles.isActive : "" }`}>
            <div className={styles.left}>
                <div className={styles.img}>
                    <Image
                        priority
                        src={userOctagonIcon}
                        alt=""
                    />
                </div>
                <p>Игрок {p_id}</p>
            </div>
            <p>{
                p_you ? "Вы" : (p_ready ? "Место занято" : "Место свободно")
            }</p>
        </main>
	);

};

export default MemberItem;