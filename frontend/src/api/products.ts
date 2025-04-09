
// data/products.ts
export interface Product {
    id: number;
    imageUrl: string;
    discount?: string;
    discountLabel?: string;
    currentPrice: string;
    bonus?: string;
    priceNote: string;
    brand: string;
    description: string;
    rating: string;
    reviewsCount: string;
    deliveryDate: string;
}

export const products: Product[] = [
    {
        id: 1,
        imageUrl: '/public/woman.webp',
        discount: "4.8%",
        discountLabel: "Выгодил",
        currentPrice: "759 ₽",
        bonus: "500 ₽",
        priceNote: "С картой Маркет",
        brand: "YouSelfLove",
        description: "Серьги каффы белые",
        rating: "4,9",
        reviewsCount: "438 оценок",
        deliveryDate: "Завтра"
    },
    {
        id: 1,
        imageUrl: '/public/woman.webp',
        discount: "4.8%",
        discountLabel: "Выгодил",
        currentPrice: "759 ₽",
        bonus: "500 ₽",
        priceNote: "С картой Маркет",
        brand: "YouSelfLove",
        description: "Серьги каффы белые",
        rating: "4,9",
        reviewsCount: "438 оценок",
        deliveryDate: "Завтра"
    },
    {
        id: 1,
        imageUrl: '/public/woman.webp',
        discount: "4.8%",
        discountLabel: "Выгодил",
        currentPrice: "759 ₽",
        bonus: "500 ₽",
        priceNote: "С картой Маркет",
        brand: "YouSelfLove",
        description: "Серьги каффы белые",
        rating: "4,9",
        reviewsCount: "438 оценок",
        deliveryDate: "Завтра"
    },
    {
        id: 1,
        imageUrl: '/public/woman.webp',
        discount: "4.8%",
        discountLabel: "Выгодил",
        currentPrice: "759 ₽",
        bonus: "500 ₽",
        priceNote: "С картой Маркет",
        brand: "YouSelfLove",
        description: "Серьги каффы белые",
        rating: "4,9",
        reviewsCount: "438 оценок",
        deliveryDate: "Завтра"
    },
];