import { observable } from 'mobx';
import { UserI } from '../../interfaces';

export interface UserStore {
  data: UserI | null;
  updateUser(user: UserI | null): void;
}

export const createUserStore = () => {
  const store: UserStore = observable({
    data: null,
    updateUser(user: UserI | null): void {
      store.data = user;
    },
  });

  return store;
};
