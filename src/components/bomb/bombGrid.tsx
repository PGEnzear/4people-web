import { NextPage } from "next"

import Image from 'next/image';

import styles from "./bombGrid.module.scss"

import BombItem from "./bomb"
import { GameApiService } from "@/bot-api/GameApiService"
import { IOpenCell } from "@/pages/game/[id]";

import gridLockIcon from "@/../public/resources/svg/grid-lock.svg";
import { useEffect } from "react";

let gameApiService: GameApiService;

export interface IBombGridProps {
    showCells: boolean,
    onClick: Function,
    openCells: IOpenCell[]
}

const bombGrid: NextPage<IBombGridProps> = ({
    openCells: p_openCells,
    showCells: p_showCells,
    onClick: p_onClick
}: IBombGridProps) => {

    const clickEventHandler = async (id: number) => {
        
        if(!gameApiService) {
            return;
        }

        const result = await gameApiService.makeStep(id);

        if(result.ok) {
            p_onClick(result);
        }

        console.log(result);

    }

    const renderBomb = (index: number, cell?: IOpenCell) => {

        if(cell) {
            return (
                <BombItem
                    onTap={clickEventHandler}
                    id = {index}
                    key = {index}
                    amount={cell.amount}
                    isOpen={true}
                ></BombItem>
            )
        } else {
            return (
                <BombItem
                    onTap={clickEventHandler}
                    id = {index}
                    key = {index}
                ></BombItem>
            )
        }

    }

    useEffect(() => {
        const initData = window.Telegram.WebApp.initData

		gameApiService = new GameApiService(initData);
    }, [])

    const renderRow = (from: number) => {

        console.log(p_openCells)

        const bombs = [];

        for(let i = 0;i<4;i++) {

            const index = from + i
            const cell = p_openCells.find((val) => val.index==index)

            bombs.push(renderBomb(index, cell))

        }

        return (
            <div className={styles.row}>
                {...bombs}
            </div>
        )

    }
    
    const renderBombGrid = () => {

        return (
            <div className={styles.bombGrid}>
                {[
                    renderRow(1),
                    renderRow(5),
                    renderRow(9),
                    renderRow(13)
                ]}
            </div>
        )
    }

    const renderWaitingGrid = () => {
        return (
            <div className={styles.waiting}>
                <div className={styles.waitingInfo}> 
                    <Image
                        priority
                        src={gridLockIcon}
                        alt=""
                    />
                    <p>Ожидаем остальных</p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.bombGrid}>
            {p_showCells ? renderBombGrid() : renderWaitingGrid()}
        </div>
    )

}

export default bombGrid;