import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import { fetchPosts } from "../../services/postService";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import { Post } from "../../types/post.ts";
import EditPostForm from "../EditPostForm/EditPostForm.tsx";

import css from "./App.module.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ["posts", debouncedSearchQuery, currentPage],
    queryFn: () => fetchPosts(debouncedSearchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleCreatePost = () => {
    setIsCreatePost(!isCreatePost);
  };

  const toggleEditPost = (postToEdit?: Post) => {
    if (postToEdit) {
      setEditedPost(postToEdit);
    }
    setIsEditPost(!isEditPost);
  };

  const changeSearchQuery = (newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
  };

  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / 8) : 0;
  const posts = data?.posts ?? [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={changeSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => {
            toggleModal();
            toggleCreatePost();
          }}
        >
          Create post
        </button>
      </header>

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          {isCreatePost && (
            <CreatePostForm
              onClose={() => {
                toggleModal();
                toggleCreatePost();
              }}
            />
          )}{" "}
          {isEditPost && editedPost && (
            <EditPostForm
              initialValues={editedPost}
              onClose={() => {
                toggleModal();
                toggleEditPost();
                setEditedPost(null);
              }}
            />
          )}
        </Modal>
      )}

      {posts.length > 0 && (
        <PostList posts={posts} toggleModal={toggleModal} toggleEditPost={toggleEditPost} />
      )}
    </div>
  );
}
