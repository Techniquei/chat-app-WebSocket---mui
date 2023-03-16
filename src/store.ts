import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { userAPI } from "./api/axios"

export interface Contacts {
  facebook?: string
  website?: string
  vk?: string
  twitter?: string
  instagram?: string
  youtube?: string
  github?: string
  mainLink?: string
}

export interface Photos {
  small?: string
  large?: string
}

export interface ProfileInterface {
  aboutMe?: string
  contacts?: Contacts
  lookingForAJob?: boolean
  lookingForAJobDescription?: string
  fullName?: string
  userId?: number
  photos?: Photos
}

const initialState : ProfileInterface = {

}

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchById",
  async function (id: string) {
    const result = await userAPI.getProfile(id)
    return result.data
  }
)

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      // state.profile = action.payload
      for(let i in action.payload){
        state[i as keyof ProfileInterface] = action.payload[i]
      }
      console.log(state)
    })
  },
})

export const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
