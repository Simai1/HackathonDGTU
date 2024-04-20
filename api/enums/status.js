import { mapObjectKeys } from '../utils/map.js';

const status = {
    'В ожидании перевозчика': 0,
    Доставляется: 1,
    Доставлен: 2,
    Украден: 3,
};

export default status;

export const map = mapObjectKeys(status);
