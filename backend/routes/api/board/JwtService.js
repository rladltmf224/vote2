const jwt = require('../board/jwt');


export default class JwtService {
    static getUserIdFromRequest = (req: Request): string | null => {
      const token = this.extractTokenFromRequest(req)
      if (!token) {
        return null
      }
      const jwtPayload = this.decodeJWT(token)
      return (jwtPayload as any)?._id || null
    }
  
    static extractTokenFromRequest = (req: Request): string | undefined => {
      const TOKEN_PREFIX = 'Bearer '
      const auth = req.headers.authorization
      const token = auth?.includes(TOKEN_PREFIX)
        ? auth.split(TOKEN_PREFIX)[1]
        : auth
      return token
    }
  
    static decodeJWT = (token: string) => {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!)
        return decodedToken;
      } catch {
        return null
      }
    }
  
    static createJWT = async (user: User): Promise<string> => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET_KEY!,
      );
      return token;
    };
  }