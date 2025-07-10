import { ReactNode } from 'react';

import style from './Grid.module.css';

interface GridProps {
  children: ReactNode;
}

export default function Grid({ children }: GridProps) {
  return <ul className={style.list}>{children}</ul>;
}
