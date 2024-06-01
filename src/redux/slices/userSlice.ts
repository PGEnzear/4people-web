import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
    id: number,
    chatId: number,
    balance: number,
    username: string
}

const initialState: IUserState = {
    id: 0,
    chatId: 0,
    balance: 0,
    username: ""
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIdState: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        setChatIdState: (state, action: PayloadAction<number>) => {
            state.chatId = action.payload;
        },
        setBalanceState: (state, action: PayloadAction<number>) => {
            state.balance = action.payload;
        },
        setUsernameState: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
    },
});

export const { setUsernameState, setBalanceState, setChatIdState, setIdState } = userSlice.actions;

export const userReducer = userSlice.reducer;