import { useState } from "react";
import styles from "./bomb.module.scss"

import type { NextPage } from 'next';

interface IBombItemProps {
    id: number,
    onTap: Function,
    isOpen?: boolean,
    amount?: number,
}

const BombItem: NextPage<IBombItemProps> = ({
    onTap,
    id,
    isOpen,
    amount,
}: IBombItemProps) => {

    const onClickEvent = (e: any) => {

        if(isOpen) {
            return;
        }

        onTap(id)

    }

	return (
		<div className={`${styles.bomb} ${isOpen ? styles.isActive : ""}`} onClick={(e) => onClickEvent(e)}>
            <p>
                {isOpen ? amount : ""}
            </p>
        </div>
	);

}; 

export default BombItem;