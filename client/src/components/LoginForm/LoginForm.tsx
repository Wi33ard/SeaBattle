import { FormEvent } from "react";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { login } from "../../store/authSlice";


export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const elements = new FormData(event.currentTarget)
    const username = elements.get("username")
    const password = elements.get("password")
    console.log('username: ', username);
    console.log('password: ', password);

    dispatch(login({
      username,
    }));
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" name="username" placeholder="username" />
      <input type="password" name="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  );
}