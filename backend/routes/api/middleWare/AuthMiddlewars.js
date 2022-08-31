const { refresh } = require('../board/jwt');
const jwt = require('../board/jwt');




module.exports.check = async (req, res, next) => {
const accessToken = req.headers.authorization.split('Bearer ') [1];//헤더에서 가져온 엑세스
const refreshToken = req.headers.refresh.split('Bearer ') [1];//헤더에서 가져온 페이로드없는 리프레쉬
const userId = req.get('userId')//유저아이디
let num = 0;
console.log('액세스토큰',accessToken)
console.log('리프레쉬토큰',refreshToken)
console.log('사용자아이디',userId)
 if(accessToken=='null'&&refreshToken!='null'){
    num=1
    console.log('액세스토큰만만료')
    payload={         //엑세스만료되면 데이터날라가니까 사용자이메일을 페이로드에넣음
      id:userId
      }
      const newAccessToken= jwt.sign(payload,'secret',{
      algorithm: 'HS256', 
      expiresIn: '14d', 
      });
      const newRefreshToken= jwt.sign({},'secret',{
      algorithm: 'HS256', 
      expiresIn: '14d', 
      });
      console.log('방금만든새액세스토큰',newAccessToken)
      res.status(404).json({message: "access",newRefreshToken:newRefreshToken,newAccessToken:newAccessToken})

  }else if(accessToken!='null'&&refreshToken=='null'){
    num=2
    console.log('리프레쉬토큰만만료') //리프레쉬토큰이없으면 로그아웃시킴 <이케바꿔야댐
    const newRefreshToken= jwt.sign({},'secret',{
      algorithm: 'HS256', 
      expiresIn: '14d', 
      });
      res.status(404).json({message: "refresh"})
    } else if(accessToken=='null'&&refreshToken=='null'){
    console.log('둘다만료')
    res.status(404).json({message: "both"})

  }
  else {
    console.log('둘다유효')
    next();
  }
} 


// module.exports.check2 = async (err,req, res, next) => {
//   const accessToken = req.headers.authorization.split('Bearer ') [1];//헤더에서 가져온 엑세스
//   const refreshToken = req.headers.refresh.split('Bearer ') [1];//헤더에서 가져온 페이로드없는 리프레쉬
//   const userId = req.get('userId')//유저아이디
//   let num = 0;
//   console.log('액세스토큰',accessToken)
//   console.log('리프레쉬토큰',refreshToken)
//   console.log('사용자아이디',userId)
//   if(accessToken=='null'){
//       num=1
//       console.log('엑세스토큰만 만료,리프레쉬이용해서 재발급')
//       payload={         //엑세스만료되면 데이터날라가니까 사용자이메일을 페이로드에넣음
//         id:body.email
//         }
//         const newAccessToken= jwt.sign(payload,'secret',{
//         algorithm: 'HS256', 
//         expiresIn: '14d', 
//         });
//         res.status(404).send('Something broke!');
        
//     }
//     else if(refreshToken=='null'){
//       num=2
//       console.log('리프레쉬토큰만료,로그아웃시킴.')
//         res.status(500).send('Something broke!');
  
//     }
      
//     else{
//       num=3
//       console.log('둘다유효')
//       next();
//     }
// }