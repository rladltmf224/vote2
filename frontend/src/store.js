import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        count: 0,
        userId:null,
        password:null,
        accessToken:null,
        refreshToken:null
        
    },
    getters: {
        GET_USERID:(state)=>state.userId,
        GET_TOKEN:(state)=>state.accessToken

    },
    mutations:{
        currentUser(state,  userId) {
            state.userId = userId;  // state의 account변수에 넘겨 받은 account값을 입력함
        },
        currentToken(state,accessToken){
            state.accessToken=accessToken;
        },
        currentRefresh(state,refreshToken){
            state.refreshToken=refreshToken
        }
    },
    actions:{
        
    }
    
});