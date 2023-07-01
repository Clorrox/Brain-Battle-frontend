import axios from 'axios';
import {User, UserEndpoint} from '../interfaces';
import { userAdapter } from '../adapters';

export const brainBattleApi = axios.create({
  baseURL: 'http://192.168.1.2:3000',
});

export const login = async (token: string, provider: 'google' | 'facebook') => {
  try {
    const {data} = await brainBattleApi.post<UserEndpoint>('/api/auth', {
      token,
      provider,
    });
    return userAdapter(data);
  } catch (error: any) {
    console.log({error});
    throw new Error('Error al obtener sus datos');
  }
};

export const updateUser = async (userId: string, body: Partial<User>) => {
  try {
    const {data} = await brainBattleApi.put<UserEndpoint>(`/api/auth/user/${userId}`, body);
    return userAdapter(data);
  } catch (error: any) {
    console.log(error);
    throw new Error('Error al actualizar');
  }
};
