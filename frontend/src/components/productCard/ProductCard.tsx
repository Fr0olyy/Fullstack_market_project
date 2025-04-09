// components/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
    product: {
        id: number;
        imageUrl: string;
        discount?: string;
        originalPrice?: string;
        currentPrice: string;
        priceNote?: string;
        brand: string;
        description: string;
        rating: string;
        reviewsCount: string;
    };
    onAddToCart: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        onAddToCart(product.id);
    };

    return (
        <Link to={`/product/${product.id}`} className={styles.cardLink}>
            <div className={styles.card}>
                {/* Изображение товара */}
                <div className={styles.imageContainer}>
                    <img src={product.imageUrl} alt={product.description} className={styles.productImage} />
                    {product.discount && (
                        <div className={styles.discountBadge}>
                            <span className={styles.discountValue}>-{product.discount}</span>
                        </div>
                    )}
                </div>

                {/* Информация о товаре */}
                <div className={styles.productInfo}>
                    <div className={styles.prices}>
                        <span className={styles.currentPrice}>{product.currentPrice}</span>
                        {product.originalPrice && (
                            <span className={styles.originalPrice}>{product.originalPrice}</span>
                        )}
                    </div>

                    {product.priceNote && (
                        <div className={styles.priceNote}>{product.priceNote}</div>
                    )}

                    <div className={styles.brand}>{product.brand}</div>
                    <div className={styles.description}>{product.description}</div>

                    <div className={styles.rating}>
                        <span className={styles.stars}>★ {product.rating}</span>
                        <span className={styles.reviews}>({product.reviewsCount})</span>
                    </div>
                </div>

                {/* Кнопка добавления в корзину */}
                <button
                    className={styles.addToCartButton}
                    onClick={handleAddToCart}
                >
                    Добавить в корзину
                </button>
            </div>
        </Link>
    );
};

export default ProductCard;