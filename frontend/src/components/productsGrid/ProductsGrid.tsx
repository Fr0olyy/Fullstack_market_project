// components/ProductsGrid.tsx
import React from 'react';
import styles from './ProductsGrid.module.scss';
import ProductCard from '../productCard/ProductCard';
import { products } from '../../api/products';

const ProductsGrid: React.FC = () => {
    const handleAddToCart = (productId: number) => {
        console.log('Добавлен товар с ID:', productId);
    };

    return (
        <div className={styles.container}>
            <div className={styles.productsGrid}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsGrid;