import { Request, Response } from 'express';
import { GET, route } from 'awilix-express';

@route('/')
export class DefaulController {



    @GET()
    public index(req: Request, res: Response): void {
        res.send('Runing ..')

    }

}