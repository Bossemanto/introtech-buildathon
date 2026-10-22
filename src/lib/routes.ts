/** Central place for page URLs so links never drift from file names. */
export const teamUrl = (id: string): string => `team.html?id=${encodeURIComponent(id)}`;
