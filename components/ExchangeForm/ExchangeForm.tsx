'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import styles from './ExchangeForm.module.css';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';

export default function ExchangeForm() {
  const setExchangeInfo = useCurrencyStore((state) => state.setExchangeInfo);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem('currency') as HTMLInputElement;
    const value = input.value.trim();

    const [amount, from, , to] = value.split(' ');

    const data = await exchangeCurrency({ amount, from, to });
    setExchangeInfo(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
}
