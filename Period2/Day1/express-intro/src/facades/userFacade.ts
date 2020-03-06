const bcrypt = require("bcryptjs");

interface IGameUser {
  name: string;
  userName: string;
  password: string;
  role: string;
}

const users: Array<IGameUser> = [];
export default class UserFacade {
  static addUser(user: IGameUser): boolean {
    bcrypt.genSalt(10, (err: any, salt: any) => {
      bcrypt.hash(user.password, salt, (err: any, hash: string) => {
        user.password = hash;
        users.push(user);
      });
    });
    return true;
  }

  static deleteUser(userName: string): boolean {
    const index: number = users.findIndex(user => user.userName === userName);
    if (index === -1)
      throw new Error("A user with the given username doesn't exist.");
    users.splice(index, 1);
    return true;
  }

  static getAllUsers(): Array<IGameUser> {
    return users;
  }

  static getUser(userName: string): IGameUser {
    const user = users.find(user => user.userName === userName);
    if (user === undefined)
      throw new Error("A user with the given username doesn't exist.");
    return user;
  }

  static checkUser(userName: string, password: string): boolean {
    const user = users.find(user => user.userName === userName);
    return user !== undefined && bcrypt.compareSync(password, user.password);
  }
}
