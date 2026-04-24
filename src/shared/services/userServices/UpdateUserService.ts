import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import User from "@shared/typeorm/entities/User";

interface IRequest {
  id: string;
  nome: string;
  email: string;
  senha: number;
  telefone: number;
  endereco: string;
}

export default class UpdateUserService {
  public async execute({
    id,
    nome,
    email,
    senha,
    telefone,
    endereco,
  }: IRequest): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new AppError("User not found.");
    }

    const emailExists = await userRepository.findOneBy({ email });

    if (emailExists && emailExists.id !== id) {
      throw new AppError("Email already in use.");
    }

    user.nome = nome;
    user.email = email;
    user.senha = senha;
    user.telefone = telefone;
    user.endereco = endereco;

    await userRepository.save(user);

    return user;
  }
}