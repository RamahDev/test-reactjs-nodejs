import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { COOKIE_EXP_MAX, API_KEY_JWT, COOKIE_PREFIX } from '../../data/constants';
import { GetModuleToken } from '../../utils/helpers/GlobalFunctions';
import ResponseCrafter from '../../utils/helpers/ResponseCrafter';
import { PayloadUser } from '../../data/interfaces/Twitch';

export default class AuthController {
  public static async meResObject(req: Request): Promise<any> {
    const user = <PayloadUser>req.user;
    const permissions: string[] = [];

    const result = {
      user: {
        id: user.profile.id,
        displayName: user.profile.displayName,
        profileImage: user.profile.profileImage,
        permissions,
      },
      token: await GetModuleToken(),
    };

    return result;
  }

  public static async Login(req: Request, res: Response): Promise<void> {  
    const user = <PayloadUser>req.user;
    const expiration = parseInt(COOKIE_EXP_MAX || '16000', 10) * 1000;
    const token = JWT.sign({ email: user.profile.email, realId: user.profile.realId }, API_KEY_JWT || '', { expiresIn: expiration });
    res.cookie(
      `${COOKIE_PREFIX}-token`, token, {
        expires: new Date(Date.now() + expiration),
        secure: (process.env.MODE === 'production' && parseInt(process.env.PORT || '80', 10) === 443),
        httpOnly: true,
      },
    );
    return ResponseCrafter.AuthEnd(res);
  }

  public static async Logout(req: Request, res: Response): Promise<void> {
    res.clearCookie(`${COOKIE_PREFIX}-token`);
    return ResponseCrafter.Data(res);
  }

  public static async User(req: Request, res: Response): Promise<void> {
    return ResponseCrafter.Data(res, await AuthController.meResObject(req));
  }

  public static async Unauthorized(req: Request, res: Response): Promise<void> {
    return ResponseCrafter.AuthFailure(res);
  }
}
