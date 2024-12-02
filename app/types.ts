interface User {
  role?: string;
  id?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  password?: string;
  __v?: number;
}

export const createInitials = (firstName: string, last_name: string) => {
  let initials = firstName.charAt(0) + last_name.charAt(0);
  return initials;
};

export const getInitials = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const initials = createInitials(user.first_name, user.last_name);

  return initials
};
export default User;
