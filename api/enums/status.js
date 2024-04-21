import { mapObjectKeys } from '../utils/map.js';

const status = {
    pending: 0,
    delivering: 1,
    delivered: 2,
    lost: 3,
};

export default status;

export const map = mapObjectKeys(status);
