const db = require('../../../config/db'); //db설정 호출
const conn = db.init(); //db 연결
var AES = require("crypto-js/aes");
let cr = require('./crypto')
const jwt = require('./jwt');
const { ref } = require('vue');
const { refresh } = require('./jwt');


exports.newlist = (req,res) => { //리스트 모듈 router 에서 호출
	conn.query("select * from tb_board",(err,row) => { //쿼리 실행
		if(err) throw err;
		res.send({success:true,data:row})
	})
}

exports.list = (req, res) => {
  //리스트 모듈
  let ipp = 10;
  let totalCount = 0;
  let block = 10;
  let total_page = 0;
  let page = 1;
  let start = 0;
  let end = ipp;
  let start_page = 1;
  let end_page = block;
  let where = '';

  body = req.query; //get

  if (body.keyword) where += ` AND subject like '%${body.keyword}%' `;
  sql = ` SELECT  count(*) cnt FROM tb_board WHERE board_code = ? ${where} `;
  conn.query(sql, [body.board_code], (err, data) => {
    if (err) throw err;
    totalCount = data[0].cnt;

    total_page = Math.ceil(totalCount / ipp);

    if (body.page) page = body.page;
    start = (page - 1) * 10;
    start_page = Math.ceil(page / block);
    end_page = start_page * block;

    if (total_page < end_page) end_page = total_page;

    let paging = {
      totalCount: totalCount,
      total_page: total_page,
      page: page,
      start_page: start_page,
      end_page: end_page,
      ipp: ipp,
    };

    sql = ` SELECT * FROM tb_board WHERE board_code = ? ${where} ORDER BY num DESC LIMIT ?, ? `;
    conn.query(sql, [body.board_code, start, end], (err, list) => {
      if (err) throw err;

      res.send({ success: true, list: list, paging: paging });
    });
  });
};

exports.add = (req, res) => {
  body = req.body; //전송된 데이터를 받는다.
  sql =
    ' INSERT INTO  tb_board (board_code, subject, cont, id, regdate, checkyn) values (?, ?, ?, ?,now(), ? ) ';
  conn.query(
    sql,
    [body.board_code, body.subject, body.cont, body.id, body.checkyn],
    (err, result) => {
      if (err) throw err;

      res.send({ success: true });
    }
  );
};
exports.saveVote = (req, res) => {
  //병수선임님이 추가해주신 모듈
  body = req.body;
  num = body.num;
  cont = body.cont;
  //cont='{'+JSON.parse(cont)+'}'
  sql = ' update tb_board set cont = ?, count=count+1  WHERE num = ?';

  conn.query(sql, [cont, num], (err, view) => {
    if (err) throw err;

    res.send({ success: true, view: view });
  });
};

exports.mod = (req, res) => {
  //수정 모듈
  body = req.body; //post
  sql = ' UPDATE tb_board SET cont = ? WHERE num = ? ';
  conn.query(sql, [body.cont, body.num], (err, result) => {
    if (err) throw err;
    res.send({ success: true });
  });
};

exports.userAdd = (req, res) => {
  body = req.body;
  console.log(body.email, body.password);
  
  sql = " INSERT INTO  tb_member (id, email, password) values ('admin', ?, ?) ";
  conn.query(sql, [body.email, body.password], (err, result) => {
    if (err) throw err;
  
    let loginYN = false;
    let msg = "";
    console.log("result", result);
    if (result.affectedRows > 0) {
    loginYN = true;
    msg = "회원가입 성공";
    } else {
    loginYN = false;
    msg = "회원가입 실패";
    }
    res.send({ result: loginYN, msg: msg });
  });
  };

exports.view = (req, res) => {
  body = req.query;
  num = req.params.num;
  sql = ' SELECT * FROM tb_board WHERE board_code = ? AND num = ?';

  conn.query(sql, [body.board_code, num], (err, view) => {
    if (err) throw err;

    res.send({ success: true, view: view });
  });
};

exports.delete = (req, res) => {
  body = req.query;
  sql = ' DELETE FROM tb_board WHERE num = ? ';
  conn.query(sql, [body.num], (err, result) => {
    if (err) throw err;
    res.send({ success: true, result: result });
  });
};



exports.idcheck = (req, res) => {
  body = req.query;
  console.log("idcheck", body);
  
  sql = " select count(*) as cnt FROM tb_member WHERE email = ?";
  conn.query(sql, [body.email], (err, result) => {
    if (err) throw err;
  
    let loginYN = false;
    let msg = "";
    console.log("result", result[0].cnt);
    if (result[0].cnt == 0) {
    loginYN = true;
    msg = "중복없음";
    } else if(result[0].cnt > 0){
    loginYN = false;
    msg = "중복있음";
    }else{
    loginYN = false;
    msg = "서버에 이상이 있습니다";
    }
    res.send({ result: loginYN, msg: msg });
  });
  };

 
  exports.voteYN = (req,res) => { //tb_vote 테이블에 데이터 insert하는부분
    body = req.body;
    sql = " INSERT INTO  tb_vote (boardPK, memberPK,voteYN) values (?, ?,'admin') ";
    conn.query(sql,
      [body.boardPK
      , body.memberPK
      ,body.voteYN]
      ,(err,result)=>{
      if(err) throw err;
  
      res.send({success:true});
    })
  }


  exports.voteCheck = (req, res) => {
    body = req.query;
    // console.log("idcheck", body);
    
    sql = " select count(*) as cnt FROM tb_vote WHERE boardPK = ? and memberPK = ?"
    conn.query(sql, [body.boardPK,body.memberPK], (err, result) => {
      if (err) throw err;
    
      let voteYN = false;
      let msg = "";
      console.log("result", result[0].cnt);
      if (result[0].cnt == 0) {
      voteYN = true;
      msg = "투표할수있음";
      } else if(result[0].cnt > 0){
      voteYN = false;
      msg = "투표할수없음";
      }else{
      voteYN = false;
      msg = "서버에 이상이 있습니다";
      }
      res.send({ result: voteYN, msg: msg });
    });
    };

    // 1. boardPK 에 memberPK가 있으면 백에서 false값을 리턴해준다.
    // (select count(*) from 구문이용해서 count값을 조회한다.)
        // ( 값이 0이면 true 1이면 false/리턴을 불린으로 받으면 0과1)
    // 2.프론트에서 back에서 데이터 받고 투표하기 버튼 비활성화.

    // ? 쿼리에서 물음표는 값을 받겠다는 뜻.안정해져있는거
    // 두개받을라면 물음표 두개. body.boardPK,body.memberPK,

    //조회하고싶은 count가 정해져있으면 ?안쓰고 그 count를 쓰면됌.



    exports.passwordCheck = (req, res) => { //비밀번호체크 기능

      body = req.body;
      sql = " select * FROM tb_member WHERE email = ? ";
      conn.query(sql, [body.email], (err, result) => {
      if (err) throw err;
      let object = result[0].password  //암호화됀 password
      let realPw = cr.decrypt(object, "secret-key-1"); // 복호화됀 password
      let loginYN = false;
      let msg = "";
      if (body.password==realPw&&result.length>0 ) {
      loginYN = true;
      msg = "로그인 성공" ;
      } 
      else {
          loginYN=false;
          msg="로그인 실패"
      }
   
      res.send({ result: loginYN, msg: msg}); //<-- 근데 이부분을 어떻게 써야할지모르겠음 ㅠ..
  });
  };
  // exports.login = (req, res) => {
  //   body = req.body;
  //   console.log(body.email, body.password);
  //   sql = " select * FROM tb_member WHERE email = ?  ";
  //   conn.query(sql, [body.email], (err, result) => {
  //   if (err) throw err;
  //   let userId = body.email
  //   // let userId = body.email  <-- 유저 email을 프론트쪽에다가 보내고싶음.
  //   let loginYN = false;
  //   let msg = "";
  //   console.log("result", result.length);
  //   if (result.length > 0) {
  //   loginYN = true;
   
  //   msg = "로그인 성공" ;
  //   } else {
  //   loginYN = false;
  //   msg = "로그인 실패";
  //   }
  
  //   res.send({ result: loginYN, msg: msg, userId:userId}); //<-- 근데 이부분을 어떻게 써야할지모르겠음 ㅠ..
  // });
  // };


  //1.this.email과 같은 테이블count를 찾아서 count가 0이면 false 1이면 trun
  //2.this.email과 같은 테이블count를 찾아서 this.password가 해당 테이블의 복호화된 password와 같으면 true
exports.loginCheck=(req,res)=>{
    body=req.body;
    console.log('사용자 입력값',body.email,body.password);
    sql = "select * FROM tb_member WHERE email = ?";
    conn.query(sql,[body.email],(err,result)=>{
      if(err)throw err;
      console.log('result')
      console.log(result)

      let userId= body.email;
      let loginYN =false;
      let msg= '';
      let num = 1
      // let object = result[0].password; //기존 테이블에 있는 암호화 pw
//      let realPw = cr.decrypt(object,'secret-key-1'); //복호화된 기존암호화pw
      // console.log('userId',userId,'loginYN',loginYN,'realPw',realPw)
      if(result.length==0){
        console.log('111111111111111111111111111')
        loginYN=false
        msg="해당 아이디가 없습니다."
        num=1
        res.send({num:num})

      } else {
        console.log('22222222222222222222')
        let object = result[0].password;
        let realPw = cr.decrypt(object,'secret-key-1')
        if(body.password!=realPw){
          console.log('3333333333333333333333333333')
          loginYN=false
          msg='비밀번호가 일치하지 않습니다.'
          num=2
          res.send({num:num})

        }
        else{
          console.log('4444444444444444444')
          loginYN=true;
          msg="로그인 성공"
          num=3
          const payload={
            id:body.email
          }
          const userId=body.email
          const accessToken = jwt.sign(payload,'secret',{
            algorithm:'HS256',
            expiresIn:'1h'
          })
          const refreshToken=jwt.sign({},'secret',{
            algorithm:'HS256',
            expiresIn:'14d'
          })
          res.send({result:result,loginYN:loginYN,num:num,userId:userId,accessToken:accessToken,refreshToken:refreshToken})
        }       

      } 





    })
}

exports.verify=(req,res)=>{
  const accessToken = req.headers.authorization.split('Bearer ') [1];//헤더에서 가져온 엑세스
  const refreshToken = req.headers.refresh.split('Bearer ') [1];//헤더에서 가져온 엑세스
  const userId = req.get('userId')//유저아이디
  const a = jwt.verify(accessToken);//엑세스값디코딩해서 아이디만추출함
  console.log('추출된아이디값',a.id) //이거 검증해야되는데 귀찮다.


  

  let num = 0; //num으로 상태를 정한다

  if(accessToken=='null'&& refreshToken=='null'){
    num=1
    console.log('둘다만료')
    res.send({num:num})
  } else if ( accessToken == 'null' && refreshToken !== 'null'){
    num=2
    console.log('액세스토큰만 만료')
    const payload = {
      id:userId
    }
    const newAccessToken=jwt.sign(payload,'secret',{
      algorithm: 'HS256', 
      expiresIn: '14d'
    })

    res.send({num:num,newAccessToken:newAccessToken})
  } else if ( accessToken !=='null'&& refreshToken=='null'){
    num=3
    console.log('리프레쉬토큰만 만료')
    const newRefreshToken = jwt.sign({},'secret',{
      algorithm:'HS256',
      expiresIn:'14d'
    })
    res.send({num:num,newRefreshToken:newRefreshToken})
  } else {
    num=4
    console.log('둘다유효')
    res.send({num:num})
  }
  // next();



}