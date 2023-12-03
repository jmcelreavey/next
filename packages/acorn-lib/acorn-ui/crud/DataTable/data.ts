export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastLoggedIn?: Date;
}
export const user1: User = {
  firstName: "John",
  id: "1",
  lastName: "Sopel",
  email: "jsopel@gcdtech.com",
  lastLoggedIn: new Date(),
};

export const user2: User = {
  firstName: "Catherine",
  id: "2",
  lastName: "MacDonald",
  email: "cmacdonald@gcdtech.com",
};

export const user3: User = {
  firstName: "Kirsty",
  id: "3",
  lastName: "Smyth",
  email: "ksmyth@gcdtech.com",
};

export const users = [user1, user2, user3];
