<template>
    <div class="logout">
        <p>로그아웃 하시겠습니까?</p>
        <button @click="logOut()" class="votebtn">확인</button>
        <div class="clock"><a class="nowtime">현재시간</a><h1 class = "h1-clock"></h1></div>

    </div>
</template>

<script>
export default {
    name: 'AppLogout',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        logOut(){ //로그아웃하면 로컬스토리지/쿠키/스토어에 있는 값을 다 초기화한다.
            localStorage.removeItem('email'),
            localStorage.removeItem('password')
            localStorage.removeItem('voteYN')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('userId')
            this.$store.commit('currentUser',null)
            this.$store.commit('currentToken',null)
            this.$store.commit('currentRefresh',null)

            this.$cookies.remove("accessToken");
            this.$cookies.remove("refreshToken");
            this.$cookies.remove("userId");
            alert('로그아웃 하시겠습니까?')
            this.$router.push('./AppLogin')
        }
    },
};
</script>

<style lang="scss" scoped>
.logout{

}
.nowtime{
    display: none;
}
.h1-clock{
    display: none;
}

.votebtn {
  background-color: rgb(255, 118, 141);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;

  cursor: pointer;
}
</style>