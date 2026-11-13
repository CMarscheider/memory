export type PlayerId = 'blue' | 'orange';

export const PLAYER_IDS: readonly PlayerId[] = ['blue', 'orange'];

/**
 * Checks whether a value is a known player.
 * @param value - Value read from the page, or `null`.
 * @returns `true` if the value is a known player id, otherwise `false`.
 */
export function isPlayerId(value: string | null): value is PlayerId {
  return PLAYER_IDS.some((playerId: PlayerId): boolean => playerId === value);
}

/**
 * Returns the opponent of a player.
 * @param player - One of the two players.
 * @returns The other player.
 */
export function getOtherPlayer(player: PlayerId): PlayerId {
  return player === 'blue' ? 'orange' : 'blue';
}
