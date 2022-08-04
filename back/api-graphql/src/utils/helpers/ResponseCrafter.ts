import { Request, Response, NextFunction } from 'express';
import path from 'path';

export default class ResponseCrafter {
  public static AuthEnd(res: Response): void {
    return res.sendFile(path.resolve(__dirname, '../../data/ssr/close_popup.html'));
  }

  public static AuthFailure(res: Response): void {
    return res.sendFile(path.resolve(__dirname, '../../data/ssr/close_popup_failure.html'));
  }

  public static Data(res: Response, data?: any): any {
    return res.status(200).send({
      success: true,
      err: null,
      data,
    }).end();
  }

  public static DataCORS(res: Response, data?: any): any {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).send({
      err: null,
      data,
    }).end();
  }

  public static Error(res: Response, code: number, err?: any): any {
    return res.status(code).send({
      err,
    }).end();
  }

  public static ErrorMiddleware(err: any, req: Request, res: Response, next: NextFunction)
    : void {
    if (err && process.env.MODE !== 'development') return ResponseCrafter.Error(res, 500);
    return next();
  }
}
