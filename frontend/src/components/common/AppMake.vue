<template>
    <div class="mdl-layout_content">
      <div class="page-content">
        <div class="questions">
          <br />
          <div class="mdl-textfield">
            <div
              class="mdl-textfield mdl-js-textfield is-upgraded"
              data-upgraded=",MaterialTextfield"
            >
              <textarea
                class="mdl-textfield__input"
                type="text"
                v-model="subject" @keyup="fnSubject"
                ref="subject"
                placeholder="질문을 입력해주세요.(최대200자)"
              ></textarea>
            </div>
          </div>
        </div>
        <br />
        <div id="type_single" class="getUnselected">
          <label
            ><input
              type="radio"
              v-model="picked"
              value="1"
              ref="1"
              @click="CheckTest"
            />
            하나만 선택
          </label>
        </div>
        <div id="type_multi" class="getUnselected">
          <input
            type="radio"
            v-model="picked"
            value="2"
            ref="2"
            @click="CheckTest"
          />
          중복 선택 가능
        </div>
        <br />

        <div v-for="(value, index) in count" v-bind:key="index" class="count">
          <div
            class="mdl-textfield mdl-js-textfield is-upgraded"
            data-upgraded=",MaterialTextfield"
          >
            <input
              type="text"
              class="mdl-textfield__input"
              :placeholder="index + 1 + '. 입력하세요'"
              ref="cont"
              v-model="contList[index]"
            />
          </div>
        </div>

        <span>선택지 개수는 {{ count }} 입니다.</span>
        <div class="answers addOption">
          <button
            class="mdl-button mdl-js-button mdl-js-ripple-effect"
            data-upgraded=",MaterialButton,MaterialRipple"
            @click="countDown"
          >
            - 선택지 줄이기
            <span class="mdl-button__ripple-container"
              ><span class="mdl-ripple"></span
            ></span>
          </button>
          <button
            class="mdl-button mdl-js-button mdl-js-ripple-effect"
            @click="countUp"
            v-bind:disabled="count > 5"
            data-upgraded=",MaterialButton,MaterialRipple"
          >
            + 선택지 추가
            <span class="mdl-button__ripple-container"
              ><span class="mdl-ripple"></span
            ></span>
          </button>
        </div>
        <br />

        <button class="mdl-button__ripple-container" @click="fnAddProc">
          만들기
        </button>
        <!-- <button @click="fnMounted()">토큰가져오기</button> -->
        <!-- <button @click="verify()">검증하기</button> -->
        
      </div>
        <div class="clock">현재시간<h1 class = "h1-clock"></h1></div>

    </div>
</template>

<script>
import Vue from 'vue'

import instance  from './api/interceptor'
export default {
  name: 'AppMake',

  data() {
    return {
      count: 2,
      board_code: 'news',
      subject: '',
      cont: '',
      id: 'admin',
      form: '', //form 전송 데이터
      picked: '1',
      contList: [null, null],
    };
  },

  mounted() {
    this.fnMounted();
  },

  methods: {
    // verify(){
    //   let data={
    //     userId:this.$store.state.userId,
    //     accessToken:this.$store.state.accessToken,
    //     refreshToken:this.$store.state.refreshToken
    //   }
    //   instance.post('http://192.168.0.89:3000/api/board/verify',data)
    //   .then((res)=>{
    //     console.log(res)
    //     this.newAccessToken=res.data.newAccessToken;
    //     this.newRefreshToken=res.data.newRefreshToken;
    //     this.num = res.data.num;

    //     if(this.num==1){
    //         alert('세션이 만료되어 로그아웃합니다.')
    //         this.$store.commit('currentUser',null)
    //         this.$store.commit('currentToken',null)
    //         this.$store.commit('currentRefresh',null)
    //         this.$router.push('/')
    //     } else if(this.num==2){
    //         console.log('액세스토큰 만료,재발급진행')
    //         this.$cookies.set('accessToken',`${this.newAccessToken}`,5)
    //     } else if(this.num==3){
    //         console.log('리프레쉬토큰만료,재발급진행')
    //         this.$cookies.set('refreshToken',`${this.newRefreshToken}`,10)
    //     } else if(this.num==4){
    //         console.log('둘다 유효하니까 하던거하삼')
    //     }
    //   })
    // },
    fnSubject(){ //제목200자 이내 함수
      if(this.subject.length>200){
        alert('200자이내로 입력해주세요.')
        return false;
      }return true;
      
    },


    dicObject() {
      var dicObject = {};
      for (var i = 0; i < this.count; i++) {
        dicObject[this.contList[i]] = 0;
      }
      console.log(dicObject);

      return dicObject;
    },
    CheckTest(event) {
      var selected = event.target.value;
      console.log('selected:', selected);
    },
    countUp() {
      if (this.count < 5) {
        this.count++;
        this.contList.push(null);
      } else {
        alert('선택지는 최대 5개입니다.');
      }
    },
    countDown() {
      if (this.count > 2) {
        this.count--;
        this.contList.pop(null);
      } else {
        alert('선택지는 최소 2개입니다.');
      }
    },
    subjectSubmit() {
      if (!this.subject) {
        alert('질문을 입력해주세요.');
        return false;
      }
    },

    contSubmit() {
      for (var i = 0; i < this.count; i++) {
        if (!this.contList[i]) {
          alert('선택지 내용을 입력해주세요.');
          break;
        }
      }
    },
    contCheck() {
      // for(var i = 0; i < this.count; i++){

      //   if(this.contList[i].value==this.contList[i].value){
      //     alert('서로다른 선택지를 입력해주세요.')
      //     console.log(this.contList[i])
      //     break;
      //   }
      // }

      let contList2 = [...new Set(this.contList)];
      if (contList2.length < this.count) {
        alert('서로다른 선택지를 입력해주세요.');
        return false;
      }
      return true;
    },

    fnVote() {
      //이전투표목록 화면으로 이동 함수
      this.$router.push({ path: '/common/AppBefore', query: this.body });
    },
    allSubmit() {
      //최종제출

      for (var i = 0; i < this.count; i++) {
        if (!this.contList[i]) {
          this.contSubmit();

          return false;
        }
      }
      if (!this.subject) {
        this.subjectSubmit();
        return false;
      }

      return true;
    },

    getList() {
      this.$axios
        .get('http://192.168.0.89:3000/api/board')
        .then((res) => {
          console.log(res);
        })
        .then((err) => {
          console.log(err);
        });
    },

    fnAddProc() {
    //   fnSubject(){
    //   console.log(this.subject)
    //   if(this.subject.length>200){
    //     alert('200자이내로 입력해주세요.')
    //   }return;
    // },
      if(!this.fnSubject()) return;
      if (!this.allSubmit()) return;
      if (!this.contCheck()) return;
      //등록 프로세스
      this.form = {
        //backend로 전송될 POST 데이터
        board_code: this.board_code,
        subject: this.subject,
        id: this.id,
        checkyn: this.picked,
        cont: JSON.stringify(this.dicObject()),
      };

      console.log(this.form);

      
      instance.post('http://192.168.0.89:3000/api/board', this.form)
      .then((res) => {
        if (res.data.success) {
          alert('등록되었습니다.');
          this.fnVote();
        }
      })
        .catch((err) => {
          console.log(err);
        });
    },
     fnMounted(){
      //const accessToken = this.$cookies.get(accessToken);
      const accessToken = Vue.$cookies.get('accessToken',accessToken)
      const refreshToken = Vue.$cookies.get('refreshToken',refreshToken)

      //const refreshToken = this.$cookies.get(refreshToken);
      console.log('accessToken',accessToken)
      console.log('refreshToken',refreshToken)
      if(refreshToken==null){
        alert('세션이 만료되어 로그아웃합니다.')
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
        this.$router.push('/')
      }
      
    }
  },
};
</script>

<style scoped>
.clock{
  display: none;
}
.mdl-button__ripple-container {
  background: rgba(158, 158, 158, 0.2);
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  background-color: rgb(255, 135, 155);
}
a {
  text-decoration: none;
}

main {
  
}
.mdl-layout_content {
 text-align: center;
     -ms-flex: 0 1 auto;
    position: relative;
    display: inline-block;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    z-index: 1;
    -webkit-overflow-scrolling: touch;
    padding-top: 40px;
 
 
}
.page-content {
max-width: 400px;
}
.mdl-textfield {
  position: relative;
  font-size: 16px;
  display: inline-block;
  box-sizing: border-box;
  width: 300px;
  max-width: 400px;
  margin: 0;
  padding: 20px 0;
}
.questions {
  border: 1px solid #aaa;
  border-radius: 8px;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
}
.answers,
.questions {
  background-color: #fff;
  max-width: 400px;
  margin: 16px auto;
    padding: 0 16px;
    max-width: 400px;

}

.mdl-textfield__input {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 16px;
  font-family: 'Helvetica', 'Arial', sans-serif;
  margin: 0;
  padding: 4px 0;
  width: 100%;
  background: 0 0;
  text-align: left;
  color: inherit;
}
/* .mdl-textfield__label {
  bottom: 0;
  color: rgba(0, 0, 0, 0.26);
  font-size: 16px;
  left: 0;
  right: 0;
  pointer-events: none;
  position: absolute;
  display: block;
  top: 24px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
} */

label {
  cursor: default;
}
.mdl-layout--fixed-drawer > .mdl-layout__content {
  margin-left: 240px;
}
html,
body {
  font-family: 'Helvetica', 'Arial', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
.mdl-layout--fixed-drawer > .mdl-layout__content {
  margin-left: 240px;
}
.getUnselected {
  color: #aaa;
}
.answers {
  border: 1px solid #ccc;
  border-radius: 8px;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
}
.mdl-button {
  background: 0 0;
  border: none;
  border-radius: 2px;
  color: #000;
  position: relative;
  height: 36px;
  margin: 0;
  min-width: 64px;
  padding: 0 16px;
  display: inline-block;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0;
  overflow: hidden;
  will-change: box-shadow;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1),
    background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  line-height: 36px;
  vertical-align: middle;
}
.mdl-button--accent.mdl-button--accent.mdl-button--raised,
.mdl-button--accent.mdl-button--accent.mdl-button--fab {
  color: rgb(66, 66, 66);
  background-color: rgb(178, 255, 89);
}
.mdl-button--accent.mdl-button--accent {
  color: rgb(178, 255, 89);
}
.mdl-button--raised {
  background: rgba(158, 158, 158, 0.2);
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
}
a,
.mdl-accordion,
.mdl-button,
.mdl-card,
.mdl-checkbox,
.mdl-dropdown-menu,
.mdl-icon-toggle,
.mdl-item,
.mdl-radio,
.mdl-slider,
.mdl-switch,
.mdl-tabs__tab {
  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
button {
  appearance: auto;
  writing-mode: horizontal-tb !important;

  text-rendering: auto;

  letter-spacing: normal;
  word-spacing: normal;
  line-height: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: center;
  align-items: flex-start;
  cursor: default;
  box-sizing: border-box;

  margin: 0em;
  padding: 1px 6px;
  border-width: 2px;
  border-style: outset;
  border-image: initial;
}
</style>
