import { Link } from "react-router";

export function Register() {
    return (
        <div className="wrapper">
            <form action="">
                <h1>Регистрация</h1>
                <div className="input-box">
                    <input type="text" placeholder="Почта" required />
                    <i className='bx bx-user'></i>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Пароль" required />
                    <i className='bx bxs-lock-alt' ></i>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Повторите пароль" required />
                    <i className='bx bxs-lock-alt' ></i>
                </div>

                <div className="remember">
                    <label form=""> <input type="checkbox" />Запомнить меня </label>
                    <a href="#">Забыли пароль?</a>
                </div>

                <button type="submit" className="btn">Зарегестрироватьсяи</button>

                <div className="register-link">
                    <p>У вас уже есть аккаунт? <Link to="/Login">Войти</Link></p>
                </div>

            </form>
        </div>
    )
}