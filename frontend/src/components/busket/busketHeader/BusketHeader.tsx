// components/BusketHeader.tsx
import styles from './BusketHeader.module.scss';

interface BusketHeaderProps {
    itemCount: number;
    onSelectAll: () => void;
    onRemoveSelected: () => void;
    hasSelectedItems: boolean;
}

const BusketHeader: React.FC<BusketHeaderProps> = ({
    itemCount,
    onSelectAll,
    onRemoveSelected,
    hasSelectedItems
}) => (
    <div className={styles.header}>
        <h1>Корзина[{itemCount}]</h1>
        <div className={styles.actions}>
            <button onClick={onSelectAll} className={styles.selectAll}>
                Выбрать все
            </button>
            <button
                onClick={onRemoveSelected}
                disabled={!hasSelectedItems}
                className={styles.removeSelected}
            >
                Удалить выбранные
            </button>
        </div>
    </div>
);

export default BusketHeader;