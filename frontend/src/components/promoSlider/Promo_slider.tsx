// components/NewsSlider.tsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import styles from './Promo_slider.module.scss';

interface Slide {
    id: number;
    imageUrl: string;
    title: string;
    link: string;
}

export function Promo_slider() {
    const slides: Slide[] = [
        {
            id: 1,
            imageUrl: 'https://via.placeholder.com/800x400?text=Новость+1',
            title: 'Акция недели',
            link: '/news/1'
        },
        {
            id: 2,
            imageUrl: 'https://via.placeholder.com/800x400?text=Новость+2',
            title: 'Новые поступления',
            link: '/news/2'
        },
        {
            id: 3,
            imageUrl: 'https://via.placeholder.com/800x400?text=Новость+3',
            title: 'Специальные предложения',
            link: '/news/3'
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const timerRef = useRef<NodeJS.Timeout>();

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        resetTimer();
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        resetTimer();
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        resetTimer();
    };

    const resetTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (isAutoPlay) {
            timerRef.current = setTimeout(goToNextSlide, 5000);
        }
    };

    useEffect(() => {
        if (isAutoPlay) {
            timerRef.current = setTimeout(goToNextSlide, 5000);
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [currentSlide, isAutoPlay]);

    return (
        <div className={styles.sliderContainer}>
            <div className={styles.slider}>
                {slides.map((slide, index) => (
                    <Link
                        to={slide.link}
                        key={slide.id}
                        className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                        style={{ backgroundImage: `url(${slide.imageUrl})` }}
                        aria-hidden={index !== currentSlide}
                    >
                        <div className={styles.slideContent}>
                            <h3 className={styles.slideTitle}>{slide.title}</h3>
                        </div>
                    </Link>
                ))}

                <button className={`${styles.controlButton} ${styles.prev}`} onClick={goToPrevSlide}>
                    &lt;
                </button>
                <button className={`${styles.controlButton} ${styles.next}`} onClick={goToNextSlide}>
                    &gt;
                </button>

                <div className={styles.dots}>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Перейти к слайду ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
