// components/Busket.tsx
import React, { useState, useEffect } from 'react';
import BusketHeader from '../components/busket/busketHeader/BusketHeader';
import AvailableItems from '../components/busket/availableItems/AvailableItems';
import UnavailableItems from '../components/busket/unavailableItems/UnavailableItems';
import BusketSummary from '../components/busket/busketSummary/BusketSummary';
import styles from '../components/busket/Busket.module.scss';
import { BasketItem } from '../types/types';

const Busket: React.FC = () => {
    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Загрузка данных...
    }, []);

    const removeSelectedItems = async () => {
        // Логика удаления...
    };

    const toggleItemSelection = (id: string) => {
        // Логика выбора...
    };

    const selectAllAvailable = () => {
        // Логика выбора всех...
    };

    const availableItems = basketItems.filter(item => item.available);
    const unavailableItems = basketItems.filter(item => !item.available);

    if (isLoading) return <div className={styles.loading}>Загрузка корзины...</div>;

    return (
        <div className={styles.busket}>
            <BusketHeader
                itemCount={basketItems.length}
                onSelectAll={selectAllAvailable}
                onRemoveSelected={removeSelectedItems}
                hasSelectedItems={selectedItems.length > 0}
            />

            <AvailableItems
                items={availableItems}
                selectedItems={selectedItems}
                onToggleSelection={toggleItemSelection}
            />

            <BusketSummary
                items={availableItems}
                selectedItems={selectedItems}
            />

            {unavailableItems.length > 0 && (
                <UnavailableItems items={unavailableItems} />
            )}
        </div>
    );
};

export default Busket;