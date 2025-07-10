import { ChangeEvent } from 'react';

import styles from './Filter.module.css';

// import { setFilter } from 'reduxState/filter/filterSlice';

export default function Filter() {
  // const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // dispatch(setFilter(event.target.value.toLowerCase()));
  };

  return (
    <input
      type="text"
      onChange={handleChange}
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
    />
  );
}
