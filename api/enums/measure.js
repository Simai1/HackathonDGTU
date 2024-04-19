import { mapObjectKeys } from '../utils/map.js';

const measure = {
    кг: 0,
    г: 2,
    шт: 3,
    л: 4
};

export default measure;

export const map = mapObjectKeys(measure);
