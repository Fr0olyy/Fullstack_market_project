// components/UnavailableItems.tsx
import React from 'react';
import styles from './UnavailableItems.module.scss';
import { BasketItem } from '../types/types';

interface UnavailableItemsProps {
    items: BasketItem[];
}

const UnavailableItems: React.FC<UnavailableItemsProps> = ({ items }) => (
    <div className={styles.section}>
        <h2>Недоступны для заказа</h2>
        <ul className={styles.unavailableList}>
            {items.map(item => (
                <li key={item.id} className={styles.unavailableItem}>
                    <span>{item.name}</span>
                    <button className={styles.findSimilar}>Найти похожий</button>
                </li>
            ))}
        </ul>
    </div>
);

export default UnavailableItems;