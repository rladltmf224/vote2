<template>
  <div class="all">
     <div class="buttonWrap">
            <input
              type="button"
              class="ShowNum"
              id="myButton"
              value="오래된 순 정렬"
              @click="buttonToggle()"
            />
            <input
              type="button"
              class="ShowNum"
              id="myButton2"
              value="투표수 많은순 정렬"
              @click="buttonVote()"
            />
        </div>
        <div class="cardwrap">
    <AppCard  v-for='result in resultArr'  
    :key="result['num']"
    :num="result['num']"
    :date="result['regdate']"
    :count="result['count']"
    :subject="result['subject']"
    @throwIndex='(num) => {fnView(num); }'
    ></AppCard></div>      <div class="clock">현재시간<h1 class = "h1-clock"></h1></div>

  </div>
  
</template>

<script>
import AppCard from './AppCard.vue'
import instance  from './api/interceptor'

export default {
  components:{AppCard},
  data() {
    //변수생성
    return {
      num:'',
      date:null,
      count:'',
      subject:'',
      length:'',
      resultArr:{}
    };
  },

  mounted() {
    this.newList();
  },
  methods: {
    goVote(value){ //자식으로부터 에밋으로 받은 함수 
      var newNum = value;
      console.log('부모가 에밋받음')
      console.log('자식한테받은num',newNum)
      
    },
    fnView(num) { //고유넘버를 이용해서 해당투표로 이동
      console.log('부모가 받았습니다 : ', num)
      this.body = {board_code:'news', page:1, num: num}
      
      this.$router.push({ path: './AppVote', query: this.body }); //추가한 상세페이지 라우터
    },
    newList(){
      instance.get('http://192.168.0.89:3000/api/board/newlist')
      .then((res)=>{
        console.log('new리스트')
        console.log(res)
        this.num=res.data.data[0].num; //고유넘버
        this.subject=res.data.data[0].subject; //제목
        this.count=res.data.data[0].count; //투표인원
        var originalDate=res.data.data[0].regdate;
        var tostringDate=originalDate.toString();
        var jsonDate=JSON.stringify(originalDate)
        console.log('그냥그대로빼온값',originalDate)
        console.log('toString쓴값',tostringDate)
        console.log('json쓴값',jsonDate)
        this.date=originalDate
        this.length=res.data.data.length; //투표갯수
        this.resultArr=res.data.data; //데이터를 어레이화

      })
    }
  
    // getList() {
    //   this.$axios
    //     .get('http://localhost:3000/api/board')
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .then((err) => {
    //       console.log(err);
    //     });
    // },
  ,

  },
};
</script>

<style scoped>
.clock{
  display: none;
}
a {
  text-decoration: none;
  color: black;
}
.date {
  color: rgb(165, 165, 165);
}
.card {
  margin: 5px;
text-align: center;
  border: 1px solid #aaa;
  border-radius: 8px;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  padding: 0 16px;
  background-color: #fff;
  width: 400px;
  height: 200px;
  
}
.pagination {
  margin: 20px 0 0 0;
  text-align: center;
      padding-bottom: 40px;
      justify-items: center;

}
.first,
.prev,
.next,
.last {
  border: 1px solid #666;
  margin: 0 5px;
}
.pagination span {
  display: inline-block;
  color: #333;

}
.pagination a {
  text-decoration: none;
  display: inline-blcok;
  color: #666;
  
}

.cardwrap{
  padding-top: 20px;
  width:100%;
  display: flex;
  flex-flow: row wrap ;
  justify-content: center;
  align-items: stretch;
  
}
.mdl-grid {
  width: 87vw;
  
}

.tbList {
  border: 1px solid #aaa;
  border-radius: 8px;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  padding: 0 16px;
  margin: 10px;
  display: flex;


  width: 200px;
  height: 200px;
}
.miniwrap{
  width: 82vw;
  height: 100vh;
  align-items: center;
  flex-flow: row wrap;
}
.listwrap {
  display: flex;
  -webkit-flex-flow: row wrap;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  margin: 0 auto;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
}

.searchWrap {
  border: 1px solid #888;
  border-radius: 5px;
  text-align: center;
  padding: 20px 0;
  margin-bottom: 40px;
}
.searchWrap input {
  width: 60%;
  height: 36px;
  border-radius: 3px;
  padding: 0 10px;
  border: 1px solid #888;
}

.searchWrap .btnSearch {
  display: inline-block;
  margin-left: 10px;
}
.tbList th {
  border-top: 1px solid #888;
}
.tbList th,
.tbList td {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.tbList td.txt_left {
  text-align: left;
}
.btnRightWrap {
  text-align: right;
  margin: 10px 0 0 0;
}

.first,
.prev,
.next,
.last {
  border: 1px solid #666;
  margin: 0 5px;
}
.pagination span {
  display: inline-block;
  padding: 0 5px;
  color: #333;
}
.pagination a {
  text-decoration: none;
  display: inline-blcok;
  padding: 0 5px;
  color: #666;
}
.desc-vote {
  color: #555;
  font-size: 12px;
}

.ng-binding {
  color: rgb(255, 118, 141);
  font-weight: bold;
  font-size: 14px;
}
.category {
  background-color: rgb(200, 200, 200);

  font-size: 14px;
  float: left;
  border-radius: 75px;
  width: 30px;
  height: 20px;
}
.num {
  color: white;
}

.txt_left {
  width: 357px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* .txt_left:before {
  content: '...';
  position: absolute;
  right: 0;
  bottom: 0;
    overflow: hidden;
  text-overflow: ellipsis;
}
.txt_left:after {
  content: '';
  position: absolute;
  right: 0;
  width: 1em;
  height: 1em;
  margin-top: 0.2em;
  background: white;
    overflow: hidden;
  text-overflow: ellipsis;
} */
.votebtn {
  background-color:var(--color-sideTop);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;

  cursor: pointer;
}
.voteText {
  color: white;
}
.ShowNum {
  left: 140px;
  font-size: 13px;
  color: rgb(255, 118, 141);
  border: none;
  text-decoration: none;
  cursor: pointer;
  background-color: rgb(224, 224, 224);
    transition: background-color .5s;

  

  
}
.ShowNum:hover{
  color: aquamarine;
      background-color: rgb(192, 86, 86);

}
.buttonWrap {
  padding-top: 31px;
  
  
}
.titlebox{
  width: 360px;
  word-break: break-word;
}
.clock{
  display: none;
}
.allwrap{
  height: 90vh;
  width: 85vw;
  position: absolute;
  overflow-y: auto;
  overflow-x:hidden;
  justify-content: center;
}
</style>
