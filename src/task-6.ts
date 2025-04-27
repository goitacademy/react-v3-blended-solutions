type User = {
  name: string;
  address?: {
    city: string;
  };
};

const user: User = {
  name: "Alice",
  address: {
    city: "Kyiv",
  },
};

console.log(user.address?.city);
