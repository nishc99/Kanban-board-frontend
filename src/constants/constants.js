const apiUrl = import.meta.env.VITE_API_URL;

export const Routes = {
  AUTH: apiUrl + "auth/",
  BOARD: apiUrl + "board/",
  LIST: apiUrl + "list/",
  CARD: apiUrl + "card/",
  USERS: apiUrl + "users/",
};
