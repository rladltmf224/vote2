




this.$axios.interceptors.request.use(
    function (config) {
      // 요청을 보내기 전 수행할 작업
      return config;
    },
    function (error) {
      // 오류 요청 가공
      return Promise.reject(error);
    }
  );
  
  this.$axios.interceptors.response.use(
    // (response) => {
    //   return response;
    // },
    // async (error) => {
    //   const {
    //     config,
    //     response: { status },
    //   } = error;
    //   if (status === 401) {
    //     if (error.response.data.num ===1) {
    //       const originalRequest = config;
    //       console.log('둘다만료')
    //       return this.$axios(originalRequest);
    //     }
    //   }
    //   return Promise.reject(error);
    // }
  );