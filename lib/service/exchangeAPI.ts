import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_LAYER_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apikey: apiKey ?? '' },
});

export interface ExchangeCredentials {
  from: string;
  to: string;
  amount: string;
}

interface ExchangeQuery {
  from: string;
  to: string;
  amount: string;
}

interface ExchangeInfo {
  rate: number;
}

interface ExchangeResponse {
  query: ExchangeQuery;
  info: ExchangeInfo;
  result: number;
}

export const exchangeCurrency = async (
  credentials: ExchangeCredentials
): Promise<{ from: string; to: string; amount: string; rate: number; result: number }> => {
  const {
    data: { query, info, result },
  }: { data: ExchangeResponse } = await instance.get('/convert', {
    params: credentials,
  });

  return { ...query, rate: info.rate, result };
};

export const latestRates = async (baseCurrency: string): Promise<[string, number][]> => {
  const { data }: { data: { rates: Record<string, number> } } = await instance.get(
    `/latest?symbols&base=${baseCurrency}`
  );

  return Object.entries(data.rates);
};
