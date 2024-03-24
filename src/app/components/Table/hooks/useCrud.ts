import { useState } from 'react';
import axios from 'axios';

export interface Customer  {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  occupation:string
}

const useCrud = (baseUrl: string) => {
  const [data, setData] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get<Customer[]>(baseUrl);
      setData(response.data);
    } catch (error : any) {
      setError(error.message);
    }
  };

  const handleDelete = async (itemId: number) => {
    try {
      await axios.delete(`${baseUrl}/${itemId}`);
      setData(data.filter(item => item.id !== itemId));
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleUpdate = async (itemId: number, newData: Partial<Customer>) => {
    try {
      await axios.put(`${baseUrl}/${itemId}`, newData);
      fetchData();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleCreate = async (newItem: Partial<Customer>) => {
    try {
      await axios.post(baseUrl, newItem);
      fetchData();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return {
    data,
    error,
    fetchData,
    handleDelete,
    handleUpdate,
    handleCreate
  };
};

export default useCrud;
