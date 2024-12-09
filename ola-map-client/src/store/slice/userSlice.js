import { createSlice } from "@reduxjs/toolkit"


const initialState = { hostSocketId: null, hostConnectionId: null, userSocketId: null, userConnectionId: null }

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setHostConnectionIdAndSocketId: (state, action) => {
            state.hostSocketId = action.payload.socketId;
            state.hostConnectionId = action.payload.connectionId;
        },
        setUserConnectionIdAndSocketId: (state, action) => {
            state.userSocketId = action.payload.socketId;
            state.userConnectionId = action.payload.connectionId;
        }
    }
})

export const { setHostConnectionIdAndSocketId, setUserConnectionIdAndSocketId } = userSlice.actions;
export default userSlice.reducer;