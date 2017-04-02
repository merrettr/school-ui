export const setToken = token => localStorage.setItem('user', JSON.stringify(token));

export const removeToken = () => localStorage.removeItem('user');

export const getToken = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    return null;
  }
};
