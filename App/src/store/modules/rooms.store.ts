import { RoomI } from '../../interfaces';

export interface RoomsStore {
  data: RoomI[];
  updateRooms(rooms: RoomI[]): void;
}

export const createRoomsStore = () => {
  const store: RoomsStore = {
    data: [],
    updateRooms(rooms: RoomI[]): void {
      this.data = rooms;
    },
  };

  return store;
};
