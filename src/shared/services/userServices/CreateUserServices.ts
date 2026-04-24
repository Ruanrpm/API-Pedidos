import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import User from "@shared/typeorm/entities/User";

interface IRequest {
    nome: string;
    email: string;
    senha: number;
    telefone: number;
    endereco: string;
}

export default class CreateUserService {
    public async execute({ nome, email, senha, telefone, endereco }: IRequest): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);

        const userExists = await userRepository.findOne({
            where: { email }
        });

        if (userExists) {
            throw new AppError("There is already one user with this email.");
        }

        const user = userRepository.create({
            nome,
            email,
            senha,
            telefone,
            endereco,
        });

        await userRepository.save(user);
        return user;
    }
}
