import { FormEvent } from "react";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/mutations";
import './LoginForm.css';


export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userLogin, { data, loading, error }] = useMutation(LOGIN);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const elements = new FormData(event.currentTarget)
    const username = elements.get("username")
    const password = elements.get("password")

    const result = await userLogin({ variables: { username, password }});
    console.log('login, result: ', result);      
    console.log('login, data: ', data);

    if (result.data) {
      dispatch(login({
        username,
        id: result.data?.login?.id
      }));
      navigate('/room');
    }
  };

  return (
    <form onSubmit={handleLogin} className="loginForm">
      <input type="text" name="username" placeholder="username" />
      <input type="password" name="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  );
}