// types.ts
export interface BasketItem {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    discount: number;
    available: boolean;
    image: string;
    quantity: number;
    bonuses: number;
}