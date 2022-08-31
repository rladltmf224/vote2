<template>
    <div>
        boardPK <input type="text" v-model="board"> 
        memberPK <input type="text" v-model="member"> 
        <button @click="submit">전송</button>
    </div>
</template>

<script>
export default {
    name: 'AppTest',

    data() {
        return {
            board:null,
            member:null
        };
    },

    mounted() {
        
    },

    methods: {
        submit(){
        this.form = {
        boardPK: this.board,
        memberPK: this.member,
        
      };

      console.log(this.form);

      this.$axios
        .post('http://192.168.0.89:3000/api/board/voteYN', this.form)
        .then((res) => {
          if (res.data.success) {
            alert('등록되었습니다.');
          } else {
            alert('실행중 실패했습니다.\n다시 이용해 주세요');
          }
        })
        .catch((err) => {
          console.log(err);
        });
        }
    },
};
</script>

<style lang="scss" scoped>

</style>