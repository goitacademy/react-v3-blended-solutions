import css from './page.module.css';

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to Postly</h1>
        <p className={css.description}>
          Postly is a simple and efficient platform for creating, editing, and browsing posts. It
          helps you organize your ideas, thoughts, and daily updates all in one place.
        </p>
        <p className={css.description}>
          With an intuitive interface and keyword search support, you can quickly find the posts you
          need. Easily edit, delete, or create new posts — everything is designed to be
          straightforward.
        </p>
        <p className={css.description}>
          Whether you use Postly for work, study, or personal notes, it adapts to your needs and
          helps you stay focused on what matters.
        </p>
      </div>
    </main>
  );
}
