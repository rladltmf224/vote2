<template>
  <div class="mdl-layout_header-row">
    <div class="left">
      <span class="headersubject" v-if="userId"
        >환영합니다.{{ this.$store.state.userId }}님.</span
      >
      <span class="headersubject" v-if="!userId"
        >아직 서비스를 이용할 수 없ㅇㅇ습니다. 로그인 먼저해주세요.</span
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  created() {
    this.getToken();
  },
  computed: {
    ...mapGetters({
      userId: 'GET_USERID',
    }),
  },
  methods: {
    logout() {
      alert('로그아웃 하시겠습니까?');
    },
    getToken() {
      var accessToken = localStorage.getItem('accessToken');
      var refreshToken = localStorage.getItem('refreshToken');
      this.$store.commit('currentToken', accessToken);
      this.$store.commit('currentRefresh', refreshToken);
    },
  },
};
</script>

<style scoped>
.logoutBtn {
  background-color: black;
  color: white;
  border-radius: 20px;
}
.mdl-layout_header-row {
  background-color: rgb(255, 190, 202);
  height: 10vh;
  /* padding-left: 260px; */
  width: 85vw;
  position: relative;
  display: flex;
  align-items: center;
}

.left {
  width: 70vw;
}
.right {
  width: 15vw;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
span {
  font-size: 16px;
  color: white;
}
a {
  text-decoration: none;
  color: #333;
}
.headersubject {
  padding-left: 50px;
}

.token {
  font-size: 2px;
}
</style>
