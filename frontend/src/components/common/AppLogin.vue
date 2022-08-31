<template>
     <div class="wrap">
        <div class="login">
            <h2>로그인</h2>
            <div class="login_id">
                <h4>아이디</h4>
                <input type="email"  placeholder="아이디를 입력해주세요." v-model="email">
            </div>
            <div class="login_pw">
                <h4>비밀번호</h4>
                <input type="password" placeholder="비밀번호를 입력해주세요."
                minlength="8" maxlength="16" v-model="password" @keyup.enter="fnIdCheck()">
            </div>
            <div class="submit" @click="fnIdCheck()" >
                <input type="submit" value="로그인"  >
                
            </div>
                  <div class="clock"><a class="nowtime">현재시간</a><h1 class = "h1-clock"></h1></div>

        </div>
    </div>
</template>

<script>

export default {
    name: 'AppLogin',

    data() {
        return {
            email:'',
            password:'',
            passwordValidFlag: true,
            passwordConfirm:false,
            repassword:'',
            loginYN:false,
            
        };
    },

    mounted() {
        
    },

    methods: {
      fnIdCheck(){
            this.form={
                email:this.email,
                password:this.password
            }
      if(this.email.length==0||this.password.length==0){
        alert('아이디 또는 비밀번호를 입력해주세요.')
        return;
      }  
      this.$axios.post('http://192.168.0.89:3000/api/board/loginCheck',this.form)
			.then((res)=>{
                
                console.log(res)
                this.num=res.data.num;
                this.userId=this.email;
                this.accessToken=res.data.accessToken;
                this.refreshToken=res.data.refreshToken;

                if(this.num==1){
                  alert('해당 아이디가 없습니다.')
                } else if ( this.num==2){
                  alert('비밀번호가 일치하지 않습니다.')
                } else if(this.num==3){
                   alert('로그인 성공')
                    localStorage.setItem("email", this.email);
                    localStorage.setItem("password", this.password);
                    this.$store.commit('currentUser',this.email)
                    this.$store.commit('currentToken',this.accessToken)
                    this.$store.commit('currentRefresh',this.refreshToken)
                    this.$cookies.set('accessToken',`${this.accessToken}`,60*30) //30분
                    this.$cookies.set('refreshToken',`${this.refreshToken}`,'7d') //7일
                    this.$cookies.set('userId',`${this.userId}`,'7d')
                    localStorage.setItem('accessToken',this.accessToken)
                    localStorage.setItem('refreshToken',this.refreshToken)
                    this.$router.push('../common/AppMake')

                } 
                
               
                // this.userId=res.data.userId;
                // console.log(this.userId)
                // if(!this.loginYN){
                //     alert('아이디 또는 비밀번호를 확인해주세요.')
                // }else{
                //     alert('로그인 성공')
                //     localStorage.setItem("email", this.email);
                //     localStorage.setItem("password", this.password);
                //     console.log(res.data)
                //     this.$store.commit('currentUser',this.email)
                //     this.$router.push('./AppMake')
                // }
			})
			.catch((err)=>{
				console.log(err);
			})
      },
    
    },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Noto Sans KR", sans-serif;
}

a {
  text-decoration: none;
  color: black;
}

li {
  list-style: none;
}

.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login {
  width: 30%;
  height: 600px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h2 {
  font-size: 2em;
}
.login_sns {
  padding: 20px;
  display: flex;
}

.login_sns li {
  padding: 0px 15px;
}

.login_sns a {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 50px;
  background: white;
  font-size: 20px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(0, 0, 0, 0.1);
}

.login_id {
  margin-top: 20px;
  width: 80%;
}

.login_id input {
  width: 100%;
  height: 50px;
  border-radius: 30px;
  margin-top: 10px;
  padding: 0px 20px;
  border: 1px solid lightgray;
  outline: none;
}

.login_pw {
  margin-top: 20px;
  width: 80%;
}

.login_pw input {
  width: 100%;
  height: 50px;
  border-radius: 30px;
  margin-top: 10px;
  padding: 0px 20px;
  border: 1px solid lightgray;
  outline: none;
}

.login_etc {
  padding: 10px;
  width: 80%;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.submit {
  margin-top: 50px;
  width: 80%;
}
.submit input {
  width: 100%;
  height: 50px;
  border: 0;
  outline: none;
  border-radius: 40px;
  background: rgb(255, 169, 183);
  color: white;
  font-size: 1.2em;
  letter-spacing: 2px;
}
.nowtime{
  display: none;
}
.h1-clock{
  display: none;
}
</style>