
import { authKey, getCookie } from '@/lib';
import { createSlice } from '@reduxjs/toolkit';



type AuthStateProps = {
  user:any;
  token: null | string;
};

const initialState:AuthStateProps = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;


export const useAuth=()=>{
  const token=getCookie(authKey)
  return !!token
}

// export const signOut = () => (dispatch: any) => {
//   localStroageRemove(authKey)
//   Cookies.remove(authKey)
//   dispatch(logout()); 
// };

export default authSlice.reducer;