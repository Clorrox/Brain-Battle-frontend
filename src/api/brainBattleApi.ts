import axios from 'axios';
import {User} from '../interfaces';

export const brainBattleApi = axios.create({
  baseURL: 'http://172.26.16.1:3000',
});

export const login = async (token: string, provider: 'google' | 'facebook') => {
  try {
    const {data} = await brainBattleApi.post<User>('/api/auth', {
      token,
      provider,
    });
    return data;
  } catch (error: any) {
    console.log({error});
    throw new Error('Error al obtener sus datos');
  }
};