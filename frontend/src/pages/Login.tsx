import { Outlet } from 'react-router';
import { Link } from 'react-router';
import '../components/Login.scss';




export function Login() {
    return (
        <>
            <div className="wrapper">
                <form action="">
                    <h1>Логин</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Почта" required />
                        <i className='bx bx-user'></i>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Пароль" required />
                        <i className='bx bxs-lock-alt' ></i>
                    </div>

                    <div className="remember">
                        <label form=""> <input type="checkbox" />Запомнить меня </label>
                        <a href="#">Забыли пароль?</a>
                    </div>

                    <button type="submit" className="btn">Войти</button>

                    <div className="register-link">
                        <p>У вас нет аккаунта? <Link to="/register">Зарегестрироваться</Link></p>
                    </div>

                </form>
            </div>
            <Outlet />
        </>
    )
}
