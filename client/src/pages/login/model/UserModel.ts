export class UserModel {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  isAdmin: boolean;
  isStaff: boolean;

  constructor(
    userID: number,
    userName: string,
    email: string,
    phoneNumber: string,
    password: string,
    isAdmin: boolean,
    isStaff: boolean
  ) {
    this.id = userID;
    this.userName = userName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.isAdmin = isAdmin;
    this.isStaff = isStaff;
  }

  static fromJson(json: any): UserModel {
    return new UserModel(
      json.id,
      json.userName,
      json.email,
      json.phoneNumber,
      json.password,
      json.isAdmin,
      json.isStaff
    );
  }
}
