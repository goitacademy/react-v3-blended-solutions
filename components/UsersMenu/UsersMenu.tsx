'use client';

import { useEffect, useRef, useState } from 'react';
import css from './UsersMenu.module.css';
import Link from 'next/link';
import DropdownPortal from '@/components/DropdownPortal/DropdownPortal';
import { fetchUsers } from '@/lib/api';
import { User } from '@/types/user';

export default function UsersMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [users, setUsers] = useState<User[] | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    setIsOpenMenu((prev) => !prev);
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX - 0,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    const fn = async () => {
      const res = await fetchUsers();
      setUsers(res);
    };

    fn();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpenMenu(false);
      }
    };

    if (isOpenMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenMenu]);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggleMenu} className={css.menuButton} ref={buttonRef}>
        Users
        <span className={css.arrow}></span>
      </button>

      {isOpenMenu && users && (
        <DropdownPortal>
          <ul
            ref={menuRef}
            className={css.menuList}
            style={{
              position: 'absolute',
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
              zIndex: 9999,
            }}
          >
            <li className={css.menuItem}>
              <Link href={`/posts/filter/All`} className={css.menuLink}>
                All users
              </Link>
            </li>
            {users.map((user) => (
              <li key={user.id} className={css.menuItem}>
                <Link
                  href={`/posts/filter/${user.id}`}
                  className={css.menuLink}
                  onClick={() => setIsOpenMenu(false)}
                >
                  {user.name}
                </Link>
              </li>
            ))}
          </ul>
        </DropdownPortal>
      )}
    </div>
  );
}
