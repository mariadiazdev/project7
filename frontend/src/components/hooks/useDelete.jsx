
import { useState } from 'react';

export function useDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteResource = async (url, token) => {
    try {
      setLoading(true);
      setError(null);

      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(url, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to delete. Status: ${response.status}`);
      }
      // If the response has a body, parse it, otherwise just return
      return response.json().catch(() => ({}));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteResource, loading, error };
}