export function getToken() {
  const tokenString =
    localStorage.getItem(
      "token"
    ); /**This is reused in so many places make one function to make all the calls. */
  const token = tokenString ? JSON.parse(tokenString) : null;
  return token
}
