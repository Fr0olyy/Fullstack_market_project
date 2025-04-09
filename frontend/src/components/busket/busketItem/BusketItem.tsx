// components/BusketItem.tsx
import React from 'react';
import styles from './BusketItem.module.scss';
import { BasketItem } from '../types/types';

interface BusketItemProps {
    item: BasketItem;
    isSelected: boolean;
    onToggleSelection: (id: string) => void;
}

const BusketItem: React.FC<BusketItemProps> = ({
    item,
    isSelected,
    onToggleSelection
}) => (
    <li className={styles.item}>
        <div className={styles.itemMain}>
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleSelection(item.id)}
                className={styles.checkbox}
            />
            <img src={item.image} alt={item.name} className={styles.itemImage} />
            <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <div className={styles.priceContainer}>
                    <span className={styles.currentPrice}>
                        {item.price.toLocaleString()} ₽
                    </span>
                    {item.discount > 0 && (
                        <span className={styles.originalPrice}>
                            {item.originalPrice.toLocaleString()} ₽
                        </span>
                    )}
                </div>
                {item.bonuses > 0 && (
                    <div className={styles.bonuses}>+ {item.bonuses} бонусов</div>
                )}
            </div>
        </div>
        <div className={styles.itemActions}>
            <button className={styles.buyButton}>Купить</button>
        </div>
    </li>
);

export default BusketItem;