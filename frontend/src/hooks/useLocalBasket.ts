// hooks/useLocalBasket.ts
import { useState, useEffect } from 'react';
import { BasketItem } from '../types/types';

// Моковые данные для демонстрации
const initialItems: BasketItem[] = [
    {
        id: '1',
        name: 'Смартфон ROSSO F7 Ultra NFC Глобальная версия',
        price: 50010,
        originalPrice: 52367,
        discount: 5,
        available: true,
        image: 'https://via.placeholder.com/100',
        quantity: 1,
        bonuses: 0
    },
    {
        id: '2',
        name: 'Витамины группы B / Комплекс витаминов группы B, 60 капсул',
        price: 316,
        originalPrice: 372,
        discount: 15,
        available: true,
        image: 'https://via.placeholder.com/100',
        quantity: 1,
        bonuses: 26
    },
    {
        id: '3',
        name: '10 by Red Square Игровая мышь беспроводная Nova Pro',
        price: 4590,
        originalPrice: 4590,
        discount: 0,
        available: false,
        image: 'https://via.placeholder.com/100',
        quantity: 1,
        bonuses: 45
    }
];

const useLocalBasket = () => {
    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Имитация загрузки данных
    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                const saved = localStorage.getItem('basket');
                if (saved) {
                    setBasketItems(JSON.parse(saved));
                } else {
                    setBasketItems(initialItems);
                    localStorage.setItem('basket', JSON.stringify(initialItems));
                }
            } catch (e) {
                setError('Ошибка загрузки корзины');
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }, 500); // Имитация задержки сети

        return () => clearTimeout(timer);
    }, []);

    // Добавление товара
    const addToBasket = (item: BasketItem) => {
        const existingItem = basketItems.find(i => i.id === item.id);
        let updatedItems;

        if (existingItem) {
            updatedItems = basketItems.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
        } else {
            updatedItems = [...basketItems, { ...item, quantity: 1 }];
        }

        setBasketItems(updatedItems);
        localStorage.setItem('basket', JSON.stringify(updatedItems));
    };

    // Удаление товаров
    const removeFromBasket = (ids: string[]) => {
        const updatedItems = basketItems.filter(item => !ids.includes(item.id));
        setBasketItems(updatedItems);
        localStorage.setItem('basket', JSON.stringify(updatedItems));
    };

    // Обновление количества
    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;

        const updatedItems = basketItems.map(item =>
            item.id === id ? { ...item, quantity } : item
        );

        setBasketItems(updatedItems);
        localStorage.setItem('basket', JSON.stringify(updatedItems));
    };

    return {
        basketItems,
        isLoading,
        error,
        addToBasket,
        removeFromBasket,
        updateQuantity
    };
};

export default useLocalBasket;