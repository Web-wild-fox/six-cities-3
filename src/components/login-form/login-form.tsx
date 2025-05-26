import {FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAuthStatus} from '@/store/user/user.selectors';
import {loginAction} from '@/store/user/user.api';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {AppRoute, AuthorizationStatus} from '@/constants';

const enum TextButtonSubmit {
  LOGIN = 'Sign in',
  IN_PROGRESS = 'Loading…',
}

const enum FormValidMessage {
  LOGIN_VALID_ERR = 'Введен не корректный e-mail',
  PASSWORD_VALID_ERR = 'Пароль должен состоять минимум из одной буквы и цифры',
}

export default function LoginForm () {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const authStatus = useAppSelector(getAuthStatus);

  const isAuth = authStatus === String(AuthorizationStatus.Auth);
  const isAuthSubmitted = authStatus === String(AuthorizationStatus.InProgress);
  const isLoginValid = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(login));
  const isPasswordValid = (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/.test(password));
  const isValidForm = isLoginValid && isPasswordValid;
  const isLogPassEmpty = login === '' && password === '';

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChangeAction = (
    evt: FormEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    evt.preventDefault();

    setValue(evt.currentTarget.value);
  };

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isValidForm) {
      dispatch(loginAction({
        login,
        password,
      }));

      if (isAuth) {
        navigate(AppRoute.Root);
      }
    }
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form
        className="login__form form"
        action="#"
        method="post"
        onSubmit={onFormSubmit}
      >
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={login}
            onChange={(evt) => onChangeAction(evt, setLogin)}
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(evt) => onChangeAction(evt, setPassword)}
          />
        </div>
        <button
          className="login__submit form__submit button"
          type="submit"
          disabled={!isValidForm || isAuthSubmitted}
        >
          {
            isAuthSubmitted ?
              TextButtonSubmit.IN_PROGRESS :
              TextButtonSubmit.LOGIN
          }
        </button>
        {
          !isValidForm &&
          !isLogPassEmpty && (
            <div
              style={{
                paddingTop: '10px',
                color: 'red',
              }}
            >
              {!isLoginValid && FormValidMessage.LOGIN_VALID_ERR}
              <br />
              {!isPasswordValid && FormValidMessage.PASSWORD_VALID_ERR}
            </div>
          )
        }
      </form>
    </section>
  );
}
