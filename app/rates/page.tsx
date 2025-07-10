'use client';

import { useEffect, useMemo, useState } from 'react';
import { Wave } from 'react-animated-text';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';
import RatesList from '@/components/RatesList/RatesList';
import Filter from '@/components/Filter/Filter';
import Loader from '@/components/Loader/Loader';

import { useCurrencyStore } from '@/lib/stores/currencyStore';
import { latestRates } from '@/lib/service/exchangeAPI';

import css from './RatesPage.module.css';

function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false);
  useEffect(() => setHasHydrated(true), []);
  return hasHydrated;
}

export default function RatesPage() {
  const hasHydrated = useHasHydrated();

  const { baseCurrency, rates, filter, setRates, isLoading, isError, setIsLoading, setIsError } =
    useCurrencyStore((state) => ({
      baseCurrency: state.baseCurrency,
      rates: state.rates,
      filter: state.filter,
      isLoading: state.isLoading,
      isError: state.isError,
      setRates: state.setRates,
      setIsLoading: state.setIsLoading,
      setIsError: state.setIsError,
    }));

  const filteredRates = useMemo(() => {
    return rates
      .filter(([key]) => key !== baseCurrency && key.toLowerCase().includes(filter))
      .map(([key, value]) => ({ key, value: Number((1 / value).toFixed(2)) }));
  }, [rates, baseCurrency, filter]);

  useEffect(() => {
    if (!baseCurrency || !hasHydrated) return;

    setIsLoading(true);

    latestRates(baseCurrency)
      .then((data) => {
        setRates(data);
      })
      .catch((err) => {
        console.error(err);
        setIsError('Failed to fetch rates.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [baseCurrency, hasHydrated, setRates, setIsLoading, setIsError]);

  if (!hasHydrated) return <Loader />;
  if (!baseCurrency) return <Loader />;

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />
          {/* {rates.length > 0 && <Filter />} */}
          {filteredRates.length > 0 && <RatesList rates={filteredRates} />}
          {isLoading && <Loader />}
          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}
        </Container>
      </Section>
    </main>
  );
}
