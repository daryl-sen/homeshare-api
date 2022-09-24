import { User } from "./user";
import { BaseService } from "../common/baseService";
import setupDb from "../db/setup";

// A post request should not contain an id.
export type UserCreationParams = Pick<User, "email" | "name" | "phoneNumbers">;

export class UsersService extends BaseService {
  constructor() {
    console.log("setting up service");
    super();
    setupDb();
  }

  public get(id: number, name?: string): User {
    return {
      id,
      email: "jane@doe.com",
      name: name ?? "Jane Doe",
      status: "Happy",
      phoneNumbers: [],
    };
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      status: "Happy",
      ...userCreationParams,
    };
  }
}
