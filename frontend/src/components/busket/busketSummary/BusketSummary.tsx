// components/BusketSummary.tsx
import React from 'react';
import styles from './BusketSummary.module.scss';
import { BasketItem } from '../types/types';

interface BusketSummaryProps {
    items: BasketItem[];
    selectedItems: string[];
}

const BusketSummary: React.FC<BusketSummaryProps> = ({
    items,
    selectedItems
}) => {
    const calculateTotal = () => {
        return items
            .filter(item => selectedItems.includes(item.id))
            .reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateDiscount = () => {
        return items
            .filter(item => selectedItems.includes(item.id))
            .reduce((total, item) => total + ((item.originalPrice - item.price) * item.quantity), 0);
    };

    return (
        <div className={styles.summary}>
            <div className={styles.summaryRow}>
                <span>Товары ({selectedItems.length})</span>
                <span>{calculateTotal().toLocaleString()} ₽</span>
            </div>
            <div className={styles.summaryRow}>
                <span>Скидка</span>
                <span className={styles.discount}>- {calculateDiscount().toLocaleString()} ₽</span>
            </div>
            <div className={styles.summaryTotal}>
                <span>Итого</span>
                <span>{(calculateTotal() - calculateDiscount()).toLocaleString()} ₽</span>
            </div>
            <button className={styles.checkoutButton}>Перейти к оформлению</button>
        </div>
    );
};

export default BusketSummary;