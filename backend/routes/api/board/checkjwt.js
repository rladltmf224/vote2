const jwt = require('./jwt');


exports.verifyToken = (req, res, next) => {
	try
	{   

        const accessToken = req.headers.authorization.split('Bearer ') [1];//헤더에서 가져온 엑세스
        const refreshToken = req.refresh.authorization.split('Bearer ') [1];//헤더에서 가져온 엑세스
		
        console.log('백엔드미들웨어')
		return next();
	}
	catch (error) {
		if (accessToken=='null') {
	  		return res.status(419).json({
	    		code: 419,
	    		message: '토큰만료'
	  		});
		}

		return res.status(401).json({
			code: 401,
	  		message: '유효하지 않은 토큰'
		});
	}
};
