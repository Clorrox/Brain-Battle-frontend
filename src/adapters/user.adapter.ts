import { User, UserEndpoint } from '../interfaces';

export const userAdapter = (input: UserEndpoint): User => ({
    id: input.id,
    name: input.name,
    imgUrl: input.imgUrl,
    level: input.level,
    expToNextLevel: input.expToNextLevel,
    exp: input.exp,
    gamesPlayed: input.gamesPlayed,
    gameswon: input.gameswon,
    lostGames: input.lostGames,
    country: input.country,
});
