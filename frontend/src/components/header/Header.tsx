// components/OzonHeader.tsx
import { Link } from 'react-router';
import styles from './Header.module.scss';
// components/OzonHeader.tsx
// components/OzonHeader.tsx

export function Header() {
    return (
        <div className={styles.outerContainer}>
            <header className={styles.header}>
                <div className={styles.title}>Маркет</div>
                <button className={styles.catalogButton}>Каталог</button>

                <div className={styles.search}>
                    <input
                        type="text"
                        placeholder="Подгузники..."
                        className={styles.searchInput}
                    />
                    <span className={styles.searchIcon}>🔍</span>
                </div>

                <nav className={styles.nav}>
                    <Link to="/login" className={styles.navLink}>Войти</Link>
                    <Link to="/orders" className={styles.navLink}>Заказы</Link>
                    <Link to="/favorites" className={styles.navLink}>Избранное</Link>
                    <Link to="/Busket" className={styles.navLink}>Корзина</Link>
                </nav>
            </header>
        </div>
    );
};