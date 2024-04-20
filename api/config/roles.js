import { mapObjectKeys } from '../utils/map.js';

const roles = {
    Администратор: 1,
    Магазин: 2,
    Склад: 3,
    Поставщик: 4
};

export default roles;

export const map = mapObjectKeys(roles);
