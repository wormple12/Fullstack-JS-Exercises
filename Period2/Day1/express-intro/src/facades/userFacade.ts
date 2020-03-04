interface IGameUser {
  name: string;
  userName: string;
  password: string;
  role: string;
}

const users: Array<IGameUser> = [];
export default class UserFacade {
  static addUser(user: IGameUser): boolean {
    /*Info: Import bcrypt and (npm install bcrypt) and hash before you store */
    users.push(user);
    return true;
  }
  static deleteUser(userName: string): boolean {
    const index: number = users.findIndex(user => user.userName === userName);
    if (index === -1) throw "A user with the given username doesn't exist.";
    users.splice(index, 1);
    return true;
  }
  static getAllUsers(): Array<IGameUser> {
    return users;
  }
  static getUser(userName: string): IGameUser {
    const user = users.find(user => user.userName === userName);
    if (user === undefined) throw "A user with the given username doesn't exist.";
    return user;
  }
  static checkUser(userName: string, password: string): boolean {
    /*Use bcrypts compare method */
    const user = users.find(user => user.userName === userName && user.password === password);
    return user !== undefined;
  }
}

//module.exports = UserFacade;
