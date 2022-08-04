import { Request, Response } from 'express';
import ResponseCrafter from '../../utils/helpers/ResponseCrafter';

export default class PublicController {
  public static async getTest(_req: Request, res: Response): Promise<void> {
   try {
      return ResponseCrafter.Data(res, {data: 'ok'});
    } catch (error) {
      return ResponseCrafter.Error(res, 500, error)
    }
  }
}
