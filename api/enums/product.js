import { mapObjectKeys } from '../utils/map.js';

const product = {
    "Сливочное масло": 0,
    "Свинина": 1,
    "Масло": 2,
    "Молоко": 3,
    "Огурцы маринованные": 4,
    "Капуста": 5,
    "Сыр": 6,
    "Рис": 7,
    "Огурцы": 8,
    "Картофель": 9,
    "Курица": 10,
    "Хлеб": 11,
    "Творог": 12,
    "Кефир": 13,
    "Куриное яйцо": 14,
    "Оливковое масло": 15,
    "Морковь": 16,
    "Яблоки": 17,
    "Свекла": 18,
    "Мед": 19
};

export default product;

export const map = mapObjectKeys(product);
