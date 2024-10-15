import { createAsyncThunk } from '@reduxjs/toolkit';

// Login Thunk
export const login = createAsyncThunk(
  'auth/login',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await authAPI(credential);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message); // Menangani error secara spesifik
    }
  }
);

// Check Auth Status Thunk
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await checkAuth(credential);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message); // Menangani error secara spesifik
    }
  }
);

// Fungsi untuk mengecek status autentikasi
const checkAuth = async (credential) => {
  try {
    const response = await fetch('http://localhost:3000/api/checkAuth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Mengirimkan cookie sesi bersama request
      body: JSON.stringify(credential),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));

    if (response) {
      if (response.status === 401) {
        throw new Error('Tidak terautentikasi');
      }
      throw new Error('Gagal melakukan autentikasi');
    }

    const data = await response.json();
    return data; // Kembalikan data JSON yang sudah diparsing
  } catch (error) {
    return Promise.reject({ message: error.message || 'Autentikasi gagal' });
  }
};

// Fungsi untuk melakukan login
const authAPI = async (credential) => {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credential),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid username or password');
      } else {
        throw new Error('Login failed, please try again');
      }
    }

    const data = await response.json();
    return data; // Kembalikan data respons login
  } catch (error) {
    return Promise.reject({ message: error.message || 'Login failed' });
  }
};
