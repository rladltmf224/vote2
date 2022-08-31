<template>
<div class="all">
  
  <div class="cardwrap">
    <div class="card">
      <div class="category">
        <span class="num">{{num}}</span>
      </div>
      <div class="txt_left"><a href="" class="titlebox">{{subject}}</a></div>
      <p class="date">투표일:{{date}}</p>

      <p class="date">{{count}}명이 투표에 참여했습니다.</p>
      <button class="votebtn" @click="goVote()">투표하기</button>
      <div class="clock">현재시간<h1 class = "h1-clock"></h1></div>

    </div>
    

  </div>
  </div>
</template>

<script>

export default {
  props:['num','date','count','subject'],
  
  name: '2AppCard',
  
  data() {
    return {
      
    };
  },

  mounted() {
    // this.$emit('send-message',this.msg)
},

  methods: {
    goVote(){
      console.log('자식이 보냅니다:',this.num)
      this.$emit('throwIndex',this.num)
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
  flex-flow: row wrap  ; 
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
