import { AppDataSource } from "@shared/typeorm/data-source";
import User from "@shared/typeorm/entities/User";

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);

    return await userRepository.find();
  }
}