
import { useState, useEffect } from 'react';

export function useFetch(url, token) {
  const [results, setResults] = useState(null);  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setIsLoading(true);

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await fetch(url, {
          method: 'GET',
          headers,
          signal,
        });

        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status} (${response.statusText})`
          );
        }

        // we expect an object like { data: [ ... ] }.
        const data = await response.json();
        
        setResults(data);

        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => controller.abort(); // cleanup if unmount
  }, [url, token]);

  // Return all pieces
  return { results, isLoading, error };
}
