

<template>
        <div class="wrap">
            <div class="login">
                <h2>회원가입</h2>
            <div class="login_id">
            <label for="">아이디
                <input type="text" placeholder="아이디를 입력해주세요."
                minlength="5" v-model="email" maxlength="20" @keyup="idCheck()">
            </label><br>
            <!-- <div><span class="confirmInfo" v-if="email.length!=0 ? !idValid : false">5~20자의 영문 소문자, 숫자만 사용 가능합니다.</span><br> -->
            <div><span class="confirmInfo" v-if="!idValid">5~20자의 영문 소문자, 숫자만 사용 가능합니다.</span><br>
            <span class="confirmInfo" v-if="!loginYN">중복 아이디입니다.</span></div></div>
            

            <div class="login_pw">
            <label for="">비밀번호
            <input type="password" placeholder="비밀번호를 입력해주세요."
            minlength="8" v-model="password" maxlength="16"  @keyup="passwordValid">
            </label><br>
            <span class="confirmInfo" v-if="!passwordValidFlag">8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span>
            <br>
            </div>
            <div class="login_pw">
            <label for="">비밀번호 재확인
                <input type="password" placeholder="비밀번호를 입력해주세요." 
                minlength="8" v-model="repassword" maxlength="16"  @keyup="confirmPW" @keyup.enter="confirm()">
            </label><br>
            <span class="confirmInfo" v-if="!passwordConfirm">비밀번호가 일치하지 않습니다.</span>
            <br>
            </div>
             <!-- <div class="submit" @click="confirm()">
                <input type="" value="로그인">
            </div> -->
             <div class="submit"  @click="confirm()">
                <input type="submit" value="회원가입">
            </div>
        </div>
        </div>
    
</template>

<script>
import {encrypt,decrypt} from './crypto'

export default {
   
    name: 'AppRegister',

    data() {
        return {
            email:'',
            password:'',
            passwordValidFlag: true,
            passwordConfirm:true,
            repassword:'',
            loginYN:true,
            confirmSubmit:false

        };
    },


    computed:{
        
        idValid(){
              if(this.email.length===0){ //아무것도안쳤을땐 경고문이 안뜨게하는 함수
                return true;
            } else{
            return /^[A-Za-z0-9]+$/.test(this.email)}
        }
    },

    methods: {
        fnLength(){
            if(this.email.length==0||this.password.length==0||this.repassword.length==0){
                return false
            }
        },
    

        confirm(){ //유효성검사 후 최종제출
            if( !this.idValid||!this.loginYN||!this.passwordValidFlag||!this.passwordConfirm||this.fnLength()){
                alert('아이디 또는 비밀번호를 확인해주세요.')
            }else{
                this.submitForm();
            }
            // console.log(this.idValid)
            // console.log(this.loginYN)
            // console.log(this.passwordValidFlag)
            // console.log(this.passwordConfirm)
            // console.log(!this.fnLength())
        },
        idCheck(){ //아이디 중복체크
            this.$axios.get(`http://192.168.0.89:3000/api/board/idcheck?email=${this.email}`) 
            .then((res)=>{
                console.log('여기')
                console.log(res.data)
                
                this.loginYN = res.data.result
                console.log(this.loginYN)
            })
        },
        submitForm(){ //회원가입 
			this.form = { //유저정보를 db에 보낸다.
                email:this.email,
                password:encrypt(this.password,'secret-key-1')
                } 

			this.$axios.post('http://192.168.0.89:3000/api/board/user',this.form)
			.then((res)=>{
                alert('가입이 완료되었습니다.')
                console.log(res)
                this.$router.push('./AppLogin')
			})
			.catch((err)=>{
				console.log(err);
			})
			
        },
        passwordValid () { //비밀번호 유효성 검사
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$/.test(this.password)) {
        this.passwordValidFlag = true
        } else {
        this.passwordValidFlag = false
        }
        },
        confirmPW(){ //비밀번호 재확인 함수
            if(this.password===this.repassword ){
                this.passwordConfirm = true;
            } else {
                this.passwordConfirm = false;
            }
        },
         test4(){
            const data = {
                name:'김이슬',
                age:30,
                phone:'12345678',
                id:'yiseulkim'
            };

            const text = encrypt(data,'secret-key-1'); //암호화 
            console.log('암호화됀 text')
            console.log(text)
            const decryptedData=decrypt(text,'secret-key-1'); //복호화
            console.log('복호화됀 text')
            console.log(decryptedData); 
        }
    }}
</script>

<style scoped>
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
/* .submitspan{
    margin-top: 50px;
    width: 100%;
  height: 50px;
  border: 0;
  outline: none;
  color: white;
  font-size: 1.2em;
  letter-spacing: 2px;
} */
.confirmInfo{
    color: red;
    font-size: 10px;
}
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


</style>