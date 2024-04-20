import { warehouse} from '../config/test-data.js';
import Warehouse from '../models/warehouse.js';

async function fillWarehouse() {
    for (const x of warehouse) {
        const warehouse = await Warehouse.findOne({
            where: {
                name: x.name,
            },
        });
        if (!warehouse) {
            await Warehouse.create({
                name: x.name,
            });
        }
    }
}

export default {
    fillWarehouse,
};
