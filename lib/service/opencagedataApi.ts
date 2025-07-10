import axios from 'axios';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type OpenCageCurrency = {
  iso_code: string;
  name: string;
  symbol: string;
};

type OpenCageResult = {
  annotations: {
    currency: OpenCageCurrency;
  };
};

type OpenCageResponse = {
  results: OpenCageResult[];
};

export const getUserInfo = async ({
  latitude,
  longitude,
}: Coordinates): Promise<OpenCageResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;

  const { data } = await axios.get<OpenCageResponse>(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });

  return data;
};
