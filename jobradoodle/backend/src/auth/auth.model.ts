import UserBoardJoinTable from 'src/join_tables/user-board-join-table.model';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  googleUserId: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  username: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column('text', { array: true, nullable: true })
  jobPreferences: string[];

  @Column({ nullable: true })
  dateOfBirth: Date;

  @OneToMany(() => UserBoardJoinTable, (jt) => jt.user)
  boards: UserBoardJoinTable[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export interface UserDto {
  email?: string;
  username?: string;
  googleUserId?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  refreshToken?: string;
  accessToken?: string;
  jobPreferences?: string[];
}

export interface UsernameEmailDto {
  email?: string;
  username?: string;
}

export interface UserJoPrefebrencesDto {
  jobPreferences: string[];
}
