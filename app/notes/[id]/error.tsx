'use client';
export default function Error({ error }: { error: Error }) {
  return <p> Помилка при завантаженні. {error.message}
  </p>;
}