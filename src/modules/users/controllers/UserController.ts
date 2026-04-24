import { Request, Response, NextFunction, response } from 'express';
import CreateUserService from '@shared/services/userServices/CreateUserServices';
import DeleteUserService from '@shared/services/userServices/DeleteUserService';
import ListUserService from '@shared/services/userServices/ListUserService';
import ShowUserService from '@shared/services/userServices/ShowUserService';
import UpdateUserService from '@shared/services/userServices/UpdateUserService';

export default class UserController {

    public async index(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const listUsers = new ListUserService();
            const users = await listUsers.execute();

            return response.status(200).json(users);
        } catch (err) {
            next(err);
        }
    }

    public async show(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const showUser = new ShowUserService();
            const user = await showUser.execute({ id });
            return response.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    public async create(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const { nome, email, senha, telefone, endereco } = request.body;
            const createUser = new CreateUserService();
            const user = await createUser.execute({
                nome, email, senha, telefone, endereco
            });
            return response.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }

    public async update(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const { nome, email, senha, telefone, endereco } = request.body;
            const updateUser = new UpdateUserService();
            const user = await updateUser.execute({
                id, nome, email, senha, telefone, endereco
            });
            return response.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    public async delete(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const deleteUser = new DeleteUserService();
            await deleteUser.execute({ id });
            return response.status(204).send(); 
        } catch (err) {
            next(err);
        }
    }
}

