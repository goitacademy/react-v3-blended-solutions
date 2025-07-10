'use client';

import Link from 'next/link';
import { MdCurrencyExchange } from 'react-icons/md';

import SelectRates from '../SelectRates/SelectRates';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

import styles from './Header.module.css';

export default function Header() {
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <MdCurrencyExchange className={styles.logo} />
          <nav>
            <ul className={styles.nav}>
              <li>
                <Link href="/" className={styles.link}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rates" className={styles.link}>
                  Rates
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {baseCurrency && <SelectRates baseCurrency={baseCurrency} />}
      </header>
    </>
  );
}
