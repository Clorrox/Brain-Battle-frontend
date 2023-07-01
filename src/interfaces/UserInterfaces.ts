
export interface UserEndpoint {
    id:             string;
    name:           string;
    imgUrl:         string;
    level:          number;
    expToNextLevel: number;
    exp:            number;
    gamesPlayed:    number;
    gameswon:       number;
    lostGames:      number;
    country?:       string;
}

export interface User {
    id:             string;
    name:           string;
    imgUrl:         string;
    level:          number;
    expToNextLevel: number;
    exp:            number;
    gamesPlayed:    number;
    gameswon:       number;
    lostGames:      number;
    country?:       string;
}

export type LoginPlatforms = 'google' | 'facebook';

export const UserEmptyState: User = {
    id: '',
    name: '',
    imgUrl: '',
    level: 0,
    expToNextLevel: 0,
    exp: 0,
    gamesPlayed: 0,
    gameswon: 0,
    lostGames: 0,
    country: undefined,
};
