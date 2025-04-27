interface User {
  id: number;
  name: string;
}

function toUserObjects(users: string[]): User[] {
  return users.map((name, index) => ({
    id: index + 1,
    name,
  }));
}

const users = ["alice", "bob", "charlie"];

console.log(toUserObjects(users));
