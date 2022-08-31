<template>
  <div class="all">
        <div class="allwrap">
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
          <div v-for="(row, idx) in list" :key="idx" class="card">
            <br />
            <div class="category">
              <span class="num">{{ row.num}}</span> <!--숫자인덱스 부분 no:가 24고 idx가 0,1,2,3...임.--> 
            </div>
            <div class="txt_left"><!--인덱스 테스트부분 no-idx를 거꾸로 하면? --> 
              <a
                href="javascript:;"
                class="titlebox"
                @click="fnView(`${row.num}`)"
                >{{ row.subject }}</a
              >
            </div>
            <p class="date">투표일:{{ row.regdate.substring(0, 10) }}</p>
            <p class="desc-vote">
              <span class="ng-binding">{{ row.count }}</span
              >명이 투표에 참여했습니다.
            </p>
            <button class="votebtn" @click="fnView(`${row.num}`)"> <!-- 자식한테받은 고유넘버로 api요청 -->
              <a href="javascript:;" class="voteText">투표하기</a>
            </button>
          </div>
        </div>

        <tr v-if="list.length == 0">
          <td colspan="4">데이터가 없습니다.</td>
        </tr>
      
        <div class="clock">현재시간<h1 class = "h1-clock"></h1></div>
        <div class="pagination" v-if="paging.totalCount > 0">
        <a href="javascript:;" @click="fnPage(1)" class="first">&lt;&lt;</a>
        <a
          href="javascript:;"
          v-if="paging.start_page > 10"
          @click="fnPage(`${paging.start_page - 1}`)"
          class="prev"
          >&lt;</a
        >
        <template v-for="(n, index) in paginavigation()">
          <template v-if="paging.page == n">
            <strong :key="index">{{ n }}</strong>
          </template>
          <template v-else>
            <a href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{
              n
            }}</a>
          </template>
        </template>
        <a
          href="javascript:;"

          v-if="paging.total_page > paging.end_page"
          @click="fnPage(`${paging.end_page + 1}`)"
          class="next"
          >&gt;</a
        >
        <a
          href="javascript:;"
          @click="fnPage(`${paging.total_page}`)"
          class="last"
          >&gt;&gt;</a
        >
        </div>
        </div>
  </div>

</template>

<script>
import instance  from './api/interceptor'
import Vue from 'vue'

export default {
  data() {
    //변수생성
    return {
      body: '', //리스트 페이지 데이터전송
      board_code: 'news', //게시판코드
      list: '', //리스트 데이터
      no: '', //게시판 숫자처리
      paging: '', //페이징 데이터
      start_page: '', //시작페이지
      page: this.$route.query.page ? this.$route.query.page : 1,
      keyword: this.$route.query.keyword,
      paginavigation: function () {
        //페이징 처리 for문 커스텀
        var pageNumber = [];
        var start_page = this.paging.start_page;
        var end_page = this.paging.end_page;
        for (var i = start_page; i <= end_page; i++) pageNumber.push(i);
        return pageNumber;
      },
      Newval: false,
      arrValues:[],
      newData:[]
    };
  },

  mounted() {
    //페이지 시작하면은 자동 함수 실행
    this.fnGetList();
  },
  methods: {
    testBtn(){
      var arrValues = new Array();
      for(var i = 0 ; i < this. no ; i ++){
        arrValues.push(i)
      }
      console.log('this no')
      console.log(this.no)
      console.log('0부터 this.no의 최고값까지 arrValues')
      console.log(arrValues) //0,1,2,3 ... 배열
      var arrNumbers = new Array();
      for(var a  = 0 ; a < this.no;a++){
        console.log('this.no의 최고값으로만 이루어진 어레이 arrNumbers')
        arrNumbers.push(i)
      } console.log(arrNumbers) //this.no의값으로만 이루어진 배열 25,25,25,25...
       var lastValues = new Array ();


      for(var b = 0; b < arrNumbers.length; b++){
        // for(var c=0;c<arrValues.length;c++){
          console.log('성공2')
          lastValues.push(this.no-arrValues[b])
        // }
      
      }
      console.log('lastValues')
      console.log(lastValues)
      console.log('객체로만든lastValues')
      const lastData=Object.assign({},lastValues)
      console.log(lastData)
      console.log('키밸루값추가된lastValues')
      var newData = new Array();
      for(var item in lastData){
        console.log(lastData[item]);
        newData.push({item:item,value:lastData[item]});
      }
      console.log('newData')
      console.log(newData)
    },     
    

     


    buttonVote() {
      var t = document.getElementById('myButton2');
      if (t.value == '투표수 많은순 정렬') {
        this.testCount();
        t.value = '투표수 적은순 정렬';
      } else if (t.value == '투표수 적은순 정렬') {
        this.testCount2();
        t.value = '투표수 많은순 정렬';
      }
    },
    buttonToggle() {
      //오름차/내림차순 정렬
      var t = document.getElementById('myButton');
      if (t.value == '오래된 순 정렬') {
        this.testView();
        t.value = '최근순 정렬';
      } else if (t.value == '최근순 정렬') {
        this.testView2();
        t.value = '오래된 순 정렬';
      }
    },

    testCount() {
      this.list.sort(function (b, a) {
        return a.count < b.count ? -1 : a.count > b.count ? 1 : 0;
      });
      console.log(this.list);
    },
    testCount2() {
      this.list.sort(function (a, b) {
        return a.count < b.count ? -1 : a.count > b.count ? 1 : 0;
      });
      console.log(this.list);
    },
    testView() {
      //오래된순 정렬

      this.list.sort(function (a, b) {
        if (a['regdate'] > b['regdate']) return 1;
        if (a['regdate'] === b['regdate']) return 0;
        if (a['regdate'] < b['regdate']) return -1;
      });
      console.log(this.list);
    },
    testView2() {
      //최근순 정렬
      this.list.sort(function (b, a) {
        if (a['regdate'] > b['regdate']) return 1;
        if (a['regdate'] === b['regdate']) return 0;
        if (a['regdate'] < b['regdate']) return -1;
      });
      console.log(this.list);
    },
    noView() {
      if (this.testView) {
        return false;
      }
    },

    fnView(num) {
      this.body.num = num;
      this.$router.push({ path: './AppVote', query: this.body }); //추가한 상세페이지 라우터
    },
    fnGetList() {
            var arrValues = new Array();
            for(var i = 0 ; i < this. no ; i ++){
              arrValues.push(i)
            }
            console.log('this no')
            console.log(this.no)
            console.log('0부터 this.no의 최고값까지 arrValues')
            console.log(arrValues) //0,1,2,3 ... 배열
            var arrNumbers = new Array();
            for(var a  = 0 ; a < this.no;a++){
              console.log('this.no의 최고값으로만 이루어진 어레이 arrNumbers')
              arrNumbers.push(i)
            } console.log(arrNumbers) //this.no의값으로만 이루어진 배열 25,25,25,25...
            var lastValues = new Array ();


            for(var b = 0; b < arrNumbers.length; b++){
              // for(var c=0;c<arrValues.length;c++){
                console.log('성공2')
                lastValues.push(this.no-arrValues[b])
              // }
            
            }
            console.log('lastValues')
            console.log(lastValues)
            console.log('객체로만든lastValues')
            const lastData=Object.assign({},lastValues)
            console.log(lastData)
            console.log('키밸루값추가된lastValues')
            var newData = new Array();
            for(var item in lastData){
              console.log(lastData[item]);
              newData.push({item:item,value:lastData[item]});
            }
            console.log('newData')
            console.log(newData)
            //데이터 가져오기 함수
      this.body = {
        // 데이터 전송
        board_code: this.board_code,
        keyword: this.keyword,
        page: this.page,
      };
      instance
        .get('http://192.168.0.89:3000/api/board', { params: this.body })
        .then((res) => {
          if (res.data.success) {
            this.list = res.data.list;
            this.paging = res.data.paging;
            this.no =
            this.paging.totalCount - (this.paging.page - 1) * this.paging.ipp;
            this.num = res.data.num;
        
          } 
            else {
            // alert('실행중 실패했습니다.\n다시 이용해 주세요.');
          }  
        })
        
        .catch((err) => {
          console.log(err);
        });
        console.log('으아아')
        const accessToken = Vue.$cookies.get('accessToken',accessToken)
      const refreshToken = Vue.$cookies.get('refreshToken',refreshToken)

      console.log('accessToken',accessToken)
      console.log('refreshToken',refreshToken)
      if(refreshToken==null){
        //alert('세션이 만료되어 로그아웃합니다.')
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
    fnSearch() {
      //검색
      this.paging.page = 1;
      this.fnGetList();
    },
    fnPage(n) {
      //페이징 이
      if (this.page != n) {
        this.page = n;
        this.fnGetList();
      }
    },
    fnMounted(){
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
