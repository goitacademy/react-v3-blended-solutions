enum Role {
  Admin,
  User,
  Guest,
}

function getPermissions(role: Role): string[] {
  switch (role) {
    case Role.Admin:
      return ["create", "read", "update", "delete"];
    case Role.User:
      return ["read", "update"];
    case Role.Guest:
      return ["read"];
    default:
      return [];
  }
}

console.log(getPermissions(Role.Admin));
console.log(getPermissions(Role.User));
console.log(getPermissions(Role.Guest));
