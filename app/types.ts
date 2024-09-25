interface User {
  role?: string;
  id?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  password?: string;
  __v?: number;
}

export const createInitials = (firstName: string, last_name:string)  => {
    let initials = firstName.charAt(0) + last_name.charAt(0)
    return initials
}
export default User
