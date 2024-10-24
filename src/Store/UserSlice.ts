import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../Types/TUser";
import { string } from "joi";

const initialUserState = {
    isLogged: false,
    user: null as TUser | null,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        login: (state: TUserState, data: PayloadAction<TUser>) => {
            state.isLogged = true;
            state.user = data.payload;
        },
        logout: (state: TUserState) => {
            state.isLogged = false;
            state.user = null;
        },
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;
export const TUserPayload = { userName: string };
export type TUserState = typeof initialUserState;