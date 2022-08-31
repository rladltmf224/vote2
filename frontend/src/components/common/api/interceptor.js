

import Vue from 'vue'
import axios from 'axios'
import router from '@/router/index'
import { store } from "@/store";

const instance = axios.create({
 // baseURL: import.meta.env.VITE_BASE_URL,
  // headers: {
  //   "Content-Type":"application/json"
  // }
})

instance.interceptors.request.use(
  (config) => {
    console.log('리퀘스트')
    const userId = localStorage.getItem('email')
    const accessToken = Vue.$cookies.get('accessToken',accessToken)
    const refreshToken = Vue.$cookies.get('refreshToken',refreshToken)
    config.headers.authorization = `Bearer ${accessToken}`;
    config.headers.refresh = `Bearer ${refreshToken}`;
    config.headers.userId = userId

    return config
  }, 
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    console.log('axios.js response : ' , res);
      
      // localStorage.removeItem('email'),
      // localStorage.removeItem('password')
      // localStorage.removeItem('voteYN')
      // localStorage.removeItem('accessToken')
      // localStorage.removeItem('refreshToken')
      // localStorage.removeItem('userId')
      // store.commit('currentUser',null)
      // store.commit('currentToken',null)
      // store.commit('currentRefresh',null)
      // Vue.$cookies.remove("accessToken");
      // Vue.$cookies.remove("refreshToken");
      // Vue.$cookies.remove("userId");
      // alert('세션이 만료되어 로그아웃합니다.')
 
    return res
  },
  
  async(error) => {
    const {
      config,
      response:{status}, 
    } =error;
    console.log('오류난상태',status)
    

    console.log('에러메세지는?',error.response.data.message)
    if(error.response.data.message==='access'){
      console.log('액세스토큰만료')      
      const originalRequest  = config;
      console.log('다시리퀘스트요청')
      const newAccessToken = error.response.data.newAccessToken;
      const newRefreshToken = error.response.data.newRefreshToken;
      
      console.log('newAccessToken',newAccessToken)
      Vue.$cookies.set('accessToken',`${newAccessToken}`,60*30)
      Vue.$cookies.set('refreshToken',`${newRefreshToken}`,'7d')


      return instance(originalRequest); 
      
        
    } else if (error.response.data.message=='both'){
      console.log('리프레쉬토큰만료')
      alert('세션이 만료되어 로그아웃합니다.')
         localStorage.removeItem('email'),
      localStorage.removeItem('password')
      localStorage.removeItem('voteYN')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userId')
      store.commit('currentUser',null)
      store.commit('currentToken',null)
      store.commit('currentRefresh',null)
      Vue.$cookies.remove("accessToken");
      Vue.$cookies.remove("refreshToken");
      Vue.$cookies.remove("userId");
      router.push('/')
    }


    return Promise.reject(error);
    } 
)
export default instance;








// import Vue from 'vue'
// import axios from 'axios'
// import router from '@/router/index'
// import { store } from "@/store";

// const instance = axios.create({
//  // baseURL: import.meta.env.VITE_BASE_URL,
//   // headers: {
//   //   "Content-Type":"application/json"
//   // }
// })

// instance.interceptors.request.use(
//   (config) => {
//     console.log('리퀘스트')
//     const userId = localStorage.getItem('email')
//     const accessToken = Vue.$cookies.get('accessToken',accessToken)
//     const refreshToken = Vue.$cookies.get('refreshToken',refreshToken)
//     config.headers.authorization = `Bearer ${accessToken}`;
//     config.headers.refresh = `Bearer ${refreshToken}`;
//     config.headers.userId = userId

//     return config
//   }, 
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// instance.interceptors.response.use(
//   (res) => {
//     console.log('axios.js response : ' , res);
      
//       // localStorage.removeItem('email'),
//       // localStorage.removeItem('password')
//       // localStorage.removeItem('voteYN')
//       // localStorage.removeItem('accessToken')
//       // localStorage.removeItem('refreshToken')
//       // localStorage.removeItem('userId')
//       // store.commit('currentUser',null)
//       // store.commit('currentToken',null)
//       // store.commit('currentRefresh',null)
//       // Vue.$cookies.remove("accessToken");
//       // Vue.$cookies.remove("refreshToken");
//       // Vue.$cookies.remove("userId");
//       // alert('세션이 만료되어 로그아웃합니다.')
 
//     return res
//   },
  
//   async(error) => {
//     const {
//       config,
//       response:{status}, 
//     } =error;
//     console.log('오류난상태',status)
    

//     console.log('에러메세지는?',error.response.data.message)
//     if(error.response.data.message==='access'){
//       console.log('액세스토큰만료')      
//       const originalRequest  = config;
//       console.log('다시리퀘스트요청')
//       const newAccessToken = error.response.data.newAccessToken;
//       const newRefreshToken = error.response.data.newRefreshToken;
      
//       console.log('newAccessToken',newAccessToken)
//       Vue.$cookies.set('accessToken',`${newAccessToken}`,5)
//       Vue.$cookies.set('refreshToken',`${newRefreshToken}`,10)


//       return instance(originalRequest); 
      
        
//     } else if (error.response.data.message=='both'){
//       console.log('리프레쉬토큰만료')
//       alert('세션이 만료되어 로그아웃합니다.')
//          localStorage.removeItem('email'),
//       localStorage.removeItem('password')
//       localStorage.removeItem('voteYN')
//       localStorage.removeItem('accessToken')
//       localStorage.removeItem('refreshToken')
//       localStorage.removeItem('userId')
//       store.commit('currentUser',null)
//       store.commit('currentToken',null)
//       store.commit('currentRefresh',null)
//       Vue.$cookies.remove("accessToken");
//       Vue.$cookies.remove("refreshToken");
//       Vue.$cookies.remove("userId");
//       router.push('/common/AppLogin')
//     }


//     return Promise.reject(error);
//     } 
// )
// export default instance;

