import styles from "./event-notification.module.scss"

import Image from 'next/image';

import bonusIcon from "@/../public/resources/svg/bonus.svg";
import backgroundImage from "@/../public/resources/svg/render.png";
import thunderImage from "@/../public/resources/svg/thunder.svg";

import type { NextPage } from 'next';

const EventFrame: NextPage = () => {

    const getMore = (e: any) => {

        console.log("more")

    }

	return (
		<div className={styles.eventFrame}>
            <Image
                className={styles.backgroundImage}
                priority
                src={backgroundImage}
                alt=""
            />
            <div className={styles.mainInfo}>
                <div className={styles.mainInfoItems}>
                    <div className={styles.bonus}>
                        <Image
                            priority
                            src={bonusIcon}
                            alt=" "
                        />
                        <p>бонус</p>
                    </div>
                    <p className={styles.bonusValue}>40₽</p>
                    <div className={styles.timer}>
                        <p className={styles.timeLeftLabel}>До конца акции</p>
                        <div className={styles.timerItems}>
                            <p>2<span>д</span></p>
                            <p>2<span>ч</span></p>
                            <p>42<span>м</span></p>
                            <p>43<span>с</span></p>
                        </div>
                    </div>
                    <button onClick={e => getMore(e)} className={styles.moreButton}>
                        <div>
                            <Image
                                priority
                                src={thunderImage}
                                alt=" "
                            />
                            <p>Узнать больше</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
	);

};

export default EventFrame;