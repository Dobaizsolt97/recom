import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Not Admin",
    email: "notadmin@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Dobai Zsolt",
    email: "dobaizsolt97@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
