const router = require('express').Router();
const dao = require('./dao'); //데이터 모듈 호출
const AuthMiddlewars = require('../middleWare/AuthMiddlewars')

router.post("/loginCheck", dao.loginCheck); //로그인 패스워드 체크

router.get('/voteCheck',dao.voteCheck); //중복투표 못하게 막는 모듈
// router.post('/verify', dao.verify);
router.post('/',AuthMiddlewars.check,dao.add);

router.post("/user", dao.userAdd);
router.get("/idcheck", dao.idcheck);
router.get("/newlist", dao.newlist);
// router.post("/login", dao.login);

//router.get('/', AuthMiddlewars.check,dao.list); // GET방식으로 접근 시 dao.list 모듈 실행
router.get('/',AuthMiddlewars.check,dao.list); // GET방식으로 접근 시 dao.list 모듈 실행
router.get('/:num', dao.view); //상세페이지 추가
router.put('/', dao.mod);
router.post('/save',AuthMiddlewars.check,dao.saveVote); //병수선임님이 추가해준 모듈
router.post('/voteYN', AuthMiddlewars.check,dao.voteYN); // tb_cote 테이블에 데이터 insert하는 모듈
router.post("/passwordCheck",dao.passwordCheck); //로그인 패스워드 체크

router.post("/user", dao.userAdd);

router.all('*', (req, res) => {
  res
    .status(404)
    .send({ success: false, msg: 'board unknown uri ${req.path}' });
});

module.exports = router;
