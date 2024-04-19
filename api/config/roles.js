import { mapObjectKeys } from '../utils/map.js';

const roles = {
    ADMIN: 1,
    SHOP: 2,
    WAREHOUSE: 3,
    SUPPLY: 4
};

export default roles;

export const map = mapObjectKeys(roles);
