'use client';

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  return <p>{`Could not fetch post details. ${error.message}`}</p>;
}
