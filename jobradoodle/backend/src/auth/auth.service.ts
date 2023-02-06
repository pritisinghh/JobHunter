import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserBoardJoinTable from 'src/join_tables/user-board-join-table.model';
import { Repository, UpdateResult } from 'typeorm';
import User, { UserDto, UserJoPrefebrencesDto } from './auth.model';

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    @InjectRepository(UserBoardJoinTable)
    private readonly jtRepo: Repository<UserBoardJoinTable>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<User> {
    return this.repo.findOneBy({ id: parseInt(id, 10) });
  }

  async findByEmail(email: string): Promise<User> {
    return this.repo.findOneBy({ email: email });
  }

  async findByUsername(username: string): Promise<User> {
    return this.repo.findOneBy({ username: username });
  }

  async getJobBoards(id: string): Promise<UserBoardJoinTable[]> {
    const userId = parseInt(id, 10);
    const data = await this.jtRepo.find({
      relations: {
        board: true,
      },
      where: {
        userId: userId,
      },
    });

    return data;
  }

  async addBoard(userId: string, boardId: string): Promise<UserBoardJoinTable> {
    return await this.jtRepo
      .create({
        userId: parseInt(userId, 10),
        jobBoardId: parseInt(boardId, 10),
      })
      .save();
  }
  async validate(userDto: UserDto): Promise<User> {
    try {
      const user = await this.findByEmail(userDto.email);

      if (user) {
        user.accessToken = userDto.accessToken;
        user.refreshToken = userDto.refreshToken;
        await user.save();
        return user;
      } else {
        return await this.create(userDto);
      }
    } catch (error) {
      return await this.create(userDto);
    }
  }

  async updatePreferences(
    id: string,
    preferences: UserJoPrefebrencesDto,
  ): Promise<string[]> {
    const userId = parseInt(id, 10);
    await this.repo
      .createQueryBuilder()
      .update(User)
      .set({ jobPreferences: preferences.jobPreferences })
      .where('id = :userId', { userId: userId })
      .execute();

    return (await this.findOne(id)).jobPreferences;
  }

  async create(userDto: UserDto): Promise<User> {
    return this.repo.create({ ...userDto }).save();
  }
}
