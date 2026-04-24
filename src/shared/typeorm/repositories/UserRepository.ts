import { AppDataSource } from "@shared/typeorm/data-source";
import { Repository } from "typeorm";
import User from "../entities/User";

export default class UserRepository {
    private ormRepository: Repository<User>;
    constructor() {
        this.ormRepository = AppDataSource.getRepository(User);
    }
    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });
        return user;
    }
}