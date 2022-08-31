<template>
  <main class="all">
    <div v-if="cont != ''" class="page-content">
      <div class="questions">
        <p class="subject">{{ subject }}</p>

        <br />
      </div>
      <!-- 단일투표일때 결과창 --> 
     <div class="questions" v-if="this.picked==1" >
        <p v-for="(item,index) in resultArr" :key="index">
         <span id="orderText"><span v-if="item.overlap==1">공동 </span>{{item.order}}위:</span>
         {{item.item}}
         
         <progress :value="item.value" min="0" :max="sum"></progress> {{item.value}}표 ({{
            ((item.value / sum) * 100).toFixed(1)
       
          }}%)
          

          
        </p>
      </div>
      

        <!-- 중복 투표일때 결과창 -->
         <div class="questions" v-if="this.picked==2" >
        <p v-for="(item,index) in resultArr" :key="index">
         <span id="orderText"><span v-if="item.overlap==1">공동 </span>{{item.order}}위:</span>
         {{item.item}}
         
         <progress :value="item.value" min="0" :max="sum"></progress> {{item.value}}표 ({{
            ((item.value / sum) * 100).toFixed(1)
       
          }}%)
          

          
        </p>
      </div>
      

      <button class="common-button" @click="fnHome()">
        홈으로가기
      </button>
       <button class="common-button" @click="fnBefore()">
        이전페이지
      </button>
      <div class="clock"><a class="nowtime">현재시간</a><h1 class = "h1-clock"></h1></div>

     

      
      
    </div>
  </main>
</template>

<script>
import instance  from './api/interceptor'
import Vue from 'vue'

/* eslint-disable */
import _ from 'lodash'; // < script단에 이거 써야 lodash관련함수 쓸수있음

export default {
  data() {
    return {
      body: this.$route.query,
      subject: '',
      cont: '',
      view: '',
      num: this.$route.query.num,
      picked: '',
      newpicked: [],
      totalCount: 0,
      resultArr: [],
      resultArr2: [],
      count:'',
      sum:0,
      obj:'',
      newobj:[],
      order:''
    };
  },
  mounted() {
    this.fnGetView();
  },

 methods: {
    testRan(){

          this.resultArr.forEach((el,index) => {
            if(_.filter(this.resultArr,{order:el.order}).length>1){
              _.filter(this.resultArr,{order:el.order}).forEach((subel,subindex) => {
                if(subindex==0) return (el.text=subel.item);
                el.text+=","+subel.item;
              })
              el.overlap=1;
            }else{
              el.text=el.item;
              el.overlap=0
            }
          })


          let resultArr2=_.uniqBy(this.resultArr,order)


    },



    testRank(){ //order값이 같으면 "공동"[i]위 텍스트추가하는 함수
      for(var i = 0; i < this.resultArr.length;i++){
        if(this.resultArr[i]['order']==this.resultArr[i]['order']){
      
          
          // var textOrder = document.getElementById("orderText");
          // document.getElementById("orderText").innerHTML =" 변경하고 싶은 내용"


        }
      } var arrValues =  new Array();  // 어레이를 선언한다 
      for(var i = 0; i < this.resultArr.length;i++){ //각 투표항목의 결과값을 어레이로 나열한다.
        arrValues.push(this.resultArr[i].value); //arrayValues가 그냥 값만있는 array임.
      } 
        const findDuplicates = arrValues => arrValues.filter((item, index) => arrValues.indexOf(item) !== index)
        const duplicates = findDuplicates(arrValues); 
        console.log('array에서 값이 두개이상 겹치는 value 만 뽑아낸 array')
        console.log(duplicates);  //array에서 값이 두개이상 겹치는 value만 뽑아낸 array
        console.log('arrValues');
        console.log(arrValues) 
        //이제 이 겹치는value를 가진 index의 앞부분을 filter로 찾아서 html을 변경해줘야됌. 19:31 pm
        this.resultArr.forEach((el,index) => {
            if(_.filter(this.resultArr,{value:el.value}).length>1){
              _.filter(this.resultArr,{value:el.value}).forEach((subel,subindex) => {
                if(subindex==0) return (el.text=subel.item);
                el.text+=","+subel.item;
              })
              el.overlap=1;
            }else{
              el.text=el.item;
              el.overlap=0
            }
          })


          //let resultArr2=_.uniqBy(this.resultArr,value)
          console.log('resultArr2')
         // console.log(resultArr2)
        
    },





  //1.value값만으로 배열만들기 2.set하기(중복제거) 3.sort(오름차순) 4.resultArr 객체에 order라는 key값추가.5.indexOf써서 order값을 1씩더하기 ,5.v-for은index로돌리되,화면에보여주는건order로
    jointRank2(){ //공동1위 만드는함수 (어려움^^)
            var valueSet= new Array(); //value로 이루어진 array 선언
          for(var i = 0; i < this.resultArr.length;i++){
            valueSet.push(this.resultArr[i].value);}
          const set = new Set(valueSet) //중복값 제거한 객체를 어레이화시켜야함.
       const uniqueArr = [...set]; //중복값 제거된 어레이
       const obj =Object.assign({},uniqueArr); //key,value없는 단순한객체
       var newobj = new Array(); //newobj를 배열로 만들거라고 선언하고,
        for (var item in obj) { //key,value값이 예쁜객체로만들어준다.
            console.log(obj[item]);
            newobj.push({ item: item, value: obj[item] });
          }

     
       console.log('기존객체')
       console.log(this.resultArr) //이제 resultArr에서 중복값제거해야함.
        console.log('셋 객체')
        console.log(set); 
        const newSet = Array.from(set); //set --> array 로 변환
        console.log(newSet) //newSet 이 중복값뺀 최종 어레이임!
        for(var i = 0; i < this.resultArr.length;i++){  //소영선임님이 알려주신 for문.
          let dung= this.resultArr[i]
          dung['order']=newSet.indexOf(dung['value'])+1
        }console.log('결과 resultArr')
        console.log(this.resultArr)




        for(var i=0;i<this.resultArr.length;i++){
    for(var j=0;j<this.resultArr.length;j++){
        if(test[i].item==this.resultArr[j].item) continue;
        if(test[i].order==this.resultArr[j].order){
            test[i].text=this.resultArr[i].item+','+this.resultArr[j].item
        }else{
            test[i].text=this.resultArr[i].item
        }
    }
}
 
// const findDuplicates = newSet => newSet.filter((item, index) => newSet.indexOf(item) !== index)
// const duplicates = findDuplicates(newSet);
// console.log('duplicates')
// console.log(duplicates);
// console.log('newSet')
// console.log(this.resultArr)    //2개이상의 중복된값만 array에담는함수
 
       
        
        

    },
    
 
    checkVal(){ 
      
      var arrValues =  new Array();  // 어레이를 선언한다 
      for(var i = 0; i < this.resultArr.length;i++){ //각 투표항목의 결과값을 어레이로 나열한다.
        arrValues.push(this.resultArr[i].value);
      } 
      console.log('arrValues')
      console.log(arrValues)
      this.sum = 0;                                 //어레이의 값을 모두더한다. (총투표수)
      for(var i =0; i <arrValues.length;i++){
        this.sum+=arrValues[i];
      }
      console.log('합계')
      console.log(this.sum);
    },
  
    fnBefore(){
            this.$router.push({ path: '/common/AppVote', query: this.body });

    },
    fnGetView() {
      instance.get('http://192.168.0.89:3000/api/board/' + this.body.num, {
          params: this.body,
        })
        .then((res) => {
          this.view = res.data.view[0];
          this.subject = this.view.subject;
          this.temp = this.view.cont.replace();
          this.cont = this.temp.split(',');
          this.picked = this.view.checkyn;
          this.totalCount = this.view.count;
          let arr = JSON.parse(this.view.cont);
      
          for (var item in arr) {
            //정상적으로 키:값 으로 세팅된 객체가 아니기에 사용하기 편하게 재배치해준다.
            console.log(arr[item]);
            this.resultArr.push({ item: item, value: arr[item],order:0 });
          }
          this.resultArr = _.sortBy(this.resultArr, 'value').reverse(); //lodash 이용하여 value기준으로 오름차순으로 정렬후 reverse()시켜 내림차순으로 정렬
           this.resultArr.forEach((el,index) => { ///병수선임님이 알려주신 공동1위만드는 함수
            if(_.filter(this.resultArr,{value:el.value}).length>1){
              _.filter(this.resultArr,{value:el.value}).forEach((subel,subindex) => {
                if(subindex==0) return (el.text=subel.item);
                el.text+=","+subel.item;       
              })
              el.overlap=1;
            }else{
              el.text=el.item;
              el.overlap=0
            }
          })
          this.checkVal();
          this.jointRank2();
         
        })
        .catch((err) => {
          console.log(err);
        });
        console.log('여기밑에 마운티드')
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
        
    },
    fnCheck() {
      if (this.newpicked == 0) {
        alert('체크를 해주세요.');
      }
      console.log(this.newpicked);

      // this.newpicked.push(null);
      // console.log(this.newpicked);
    },
    fnResult() {
      this.$router.push({ path: '/common/AppResult', query: this.body });
    },
    fnHome() {
      this.$router.push({ path: '/common/AppMake', query: this.body });
    },
  
  },
};
</script>

<style scoped>
@charset "UTF-8";
.nowtime{

  font-size: 14px;
  font-weight: bold;

}

.clock {
  color:var(--color-header);
  font-size: 10px;
  padding-top: 30px;
  
}
.checkyn {
  color: grey;
  font-size: 12px;
}
.subject {
  padding-top: 20px;
  font-size: 20px;
    word-break: break-word;
        word-wrap: normal;
}
.mdl-button__ripple-container {
  background: rgba(158, 158, 158, 0.2);
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  background-color: rgb(255, 135, 155);
  padding: 10px 30px;
  margin: 20px;
}

a {
  text-decoration: none;
}

.mdl-layout_content {
  position: relative;
  display: inline-block;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  z-index: 1;
}
.page-content {
  text-align: center;
  padding: 16px;
}
.mdl-textfield {
  position: relative;
  font-size: 16px;
  display: inline-block;
  box-sizing: border-box;
  width: 300px;
  max-width: 100%;
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
  margin: 16px auto;
  padding: 0 16px;
  max-width: 400px;
  background-color: #fff;
}
/* div {
  display: block;
} */
.mdl-textfield__input {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  display: block;
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
  margin: 0;
  height: 100%;
  overflow: hidden;
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
