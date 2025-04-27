import axios from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
};

const logThreePosts = async () => {
  const posts = await fetchPosts();
  posts.slice(0, 3).forEach((post, index) => {
    console.log(`Post ${index + 1}: Title: ${post.title}; Body: ${post.body}`);
    console.log("===================================");
  });
};

logThreePosts();
