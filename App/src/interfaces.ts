export interface BallI {
  size: number;
  color: string;
  position: number;
}

export interface FireballI extends BallI {
  damage: number;
}

export interface PlayerWithFireballI extends BallI {
  fireball: FireballI;
}

export interface UserI {
  name: string;
  id: string;
  player: PlayerWithFireballI;
}

export interface RoomI {
  name: string;
  id: string;
  users: UserI[];
}
