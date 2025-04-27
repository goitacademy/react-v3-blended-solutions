type Product = {
  id: number;
  title: string;
  price: number;
};

function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Laptop", price: 1000 },
        { id: 2, title: "Phone", price: 500 },
      ]);
    }, 1000);
  });
}

fetchProducts().then((products) => console.log(products));
