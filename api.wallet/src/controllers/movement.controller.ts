import { Request, Response } from 'express';
import { route, GET, POST } from "awilix-express";
import { BaseController } from '../common/controllers/base.controller';
import { MovementService } from '../services/movement.service';
import { MovementCreateDto } from '../dptos/movement.dto';



/**
* @swagger
* components:   
*   schemas:
*     Movement:
*      type: object
*      properties:
*        id:
*          type: integer
*          description: the auto-generated id of Movement
*        user_id:
*          type: integer
*          description: the Id of the User who registered the movement
*        type:
*          type: integer
*          description: the type of the Movement (0 = income, 1 = outcome)
*        amount:
*          type: number
*          description: the amount of the Movement registered
*      required:
*        - type
*        - user_id
*        - amount
*      example:
*        id: 1
*        user_id: 1
*        type: 0
*        amount: 10
*     MovementNotFound:
*      type: object
*      properties:
*        msg:
*          type: string
*          description: A message for the not found Movement
*      example:
*        msg: Movement was not found
*
*   parameters:
*    movementId:
*      in: path
*      name: id
*      required: true
*      schema:
*        type: integer
*      description: the movement id  
*
*   securitySchemes:
*       bearerAuth:           
*           type: http
*           scheme: bearer
*           bearerFormat: JWT  
*
*   responses:
*       UnauthorizedError:
*           description: Access token is missing or invalid  
*
* tags:
*  name: Movements
*  description: Movements endpoint
*
*/

@route('/movements')
export class MovementController extends BaseController {
    constructor(
        private readonly movementService: MovementService
    ) {
        super();
    }

    /**
    * @swagger
    * /movements:
    *  get:
    *   security:
    *    - bearerAuth: []
    *   summary: Return a Moments list
    *   tags: [Movements]
    *   responses:
    *       200:
    *           description: the list of Moments
    *           content: 
    *               application/json:
    *                   schema:
    *                   type: array
    *                   items:
    *                       $ref: '#/components/schemas/Movement'
    *       401:
    *          $ref: '#/components/responses/UnauthorizedError' 
    *          
    */      
    

    @GET()
    public async all(req: Request, res: Response) {
        try {
            res.send(
                await this.movementService.all()
            );
        } catch (error) {
            this.handleException(error, res);
        }
    }

    /**
    * @swagger
    * /movements/{id}:
    *  get:   
    *   security:
    *    - bearerAuth: []
    *   summary: get un movement by id
    *   tags: [Movements]
    *   parameters:
    *      - $ref: '#/components/parameters/movementId'
    *   responses:
    *      200:
    *        description: The Found Movement
    *        content:
    *          application/json:
    *            schema:
    *            $ref: '#/components/schemas/Movement'
    *      404:
    *        description: the Movement was not found
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/MovementNotFound'
    *      401:
    *          $ref: '#/components/responses/UnauthorizedError' 
    */

    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        console.log(req.params.id);
        try {
            const id = parseInt(req.params.id);
            const result = await this.movementService.find(id);
            if (result) {
                res.send(result);
            } else {
                res.status(404);
                res.send();
            }
        } catch (error) {
            this.handleException(error, res);
        }
    }
    /**
    * @swagger
    * /movements:
    *  post:
    *   security:
    *    - bearerAuth:  
    *   summary: create a new movement
    *   tags: [Movements]
    *   requestBody:
    *      required: true
    *      content:
    *        application/json:
    *          schema:
    *            $ref: '#/components/schemas/Movement'  
    *   responses:
    *      200:
    *        description: The Movement was successfully created
    *        content:
    *          application/json:
    *            schema:
    *            $ref: '#/components/schemas/Movement'
    *      401:
    *        description: Access token is missing or invalid
    *      500:
    *        description: Some server error
    */
    @POST()
    public async store(req: Request, res: Response) {
        try {
            await this.movementService.store({
                type: req.body.type,
                amount: req.body.amount,
                user_id: req.body.user_id
            } as MovementCreateDto);

            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
}