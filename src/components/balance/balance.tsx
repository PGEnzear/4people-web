import styles from "./balance.module.scss"

import Image from 'next/image';

import balanceIcon from "@/../public/resources/svg/balance.svg";

import type { NextPage } from 'next';

interface IBalanceProps {
    amount: number;
}

const Balance: NextPage<IBalanceProps> = (props) => {

	return (
		<div className={styles.balance}>
           <Image
                priority
                src={balanceIcon}
                alt=" "
            />
            <p>{props.amount}₽</p>
        </div>
	);

};

export default Balance;