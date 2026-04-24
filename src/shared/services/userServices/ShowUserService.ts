import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import User from "@shared/typeorm/entities/User";

interface IRequest {
  id: string;
}

export default class ShowUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new AppError("User not found.");
    }

    return user;
  }
}