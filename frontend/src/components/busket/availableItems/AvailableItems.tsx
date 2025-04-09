// components/AvailableItems.tsx
import React from 'react';
import BusketItem from '../busketItem/BusketItem';
import styles from './AvailableItems.module.scss';
import { BasketItem } from '../types/types';

interface AvailableItemsProps {
    items: BasketItem[];
    selectedItems: string[];
    onToggleSelection: (id: string) => void;
}

const AvailableItems: React.FC<AvailableItemsProps> = ({
    items,
    selectedItems,
    onToggleSelection
}) => (
    <div className={styles.section}>
        <h2>Доступны для заказа</h2>
        {items.length === 0 ? (
            <p className={styles.empty}>Нет доступных товаров</p>
        ) : (
            <ul className={styles.itemsList}>
                {items.map(item => (
                    <BusketItem
                        key={item.id}
                        item={item}
                        isSelected={selectedItems.includes(item.id)}
                        onToggleSelection={onToggleSelection}
                    />
                ))}
            </ul>
        )}
    </div>
);

export default AvailableItems;