import { CustomError } from '../errors/custom.error';

const enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UserEntity {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public createdAt: Date,
    public updatedAt: Date,
    public isVerified: boolean,
    public emailValidated: boolean,
    public role: Role,
    public firstName?: string,
    public lastName?: string,
    public username?: string,
    public avatar?: string,
    public phone?: string,
    public biography?: string,
    public birthday?: Date,
    public lastLogin?: Date,
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const {
      id,
      first_name,
      last_name,
      username,
      email,
      password,
      avatar,
      phone,
      biography,
      birthday,
      createdAt,
      updatedAt,
      lastLogin,
      isVerified,
      emailValidated,
      role
    } = object;

    if (!id) {
      throw CustomError.badRequest('Missing id');
    }

    if (!email) throw CustomError.badRequest('Missing email');
    if (!password) throw CustomError.badRequest('Missing password');

    return new UserEntity(
      id,
      email,
      password,
      createdAt,
      updatedAt,
      isVerified,
      emailValidated,
      role,
      first_name,
      last_name,
      username,
      avatar,
      phone,
      biography,
      birthday,
      lastLogin,
    );
  }
}
