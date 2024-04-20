import XLSX from "xlsx";
import { sequelize } from "../models/index.js";
import map from "../enums/measure.js"
import Warehouse from "../models/warehouse.js";

export default {
    async parseFromXlsx(req, res){
        let workbook = XLSX.readFile(req.file.path);
        const products = [];

        Object.keys(workbook.Sheets).forEach((name) => {
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[name], {header: 1});
            products.push({ name, data: sheetData });
        });

        const dataProducts = products[0].data;
        console.log(dataProducts)
        for (const element of dataProducts) {
            const id = element[0];
            if(Number(id)) {
                try {
                    const productName = element[1];
                    const productCost = element[2];
                    const manufactureDate = new Date((element[3] - 25569) * 86400000 + 1000)
                    manufactureDate.setHours(manufactureDate.getHours() - 3);
                    const expiryDate = new Date((element[4] - 25569) * 86400000 + 1000)
                    expiryDate.setHours(expiryDate.getHours() - 3);
                    const SKU = element[5];
                    const region = element[6];
                    const productAmount = element[7];
                    const productMeasure = map[element[8]];
                    const productVolume = element[9];
                    const manufacture = element[10];
                    const productQuantity = element[11];
                    const warehouse = element[12];
                    const existWarehouse = await Warehouse.findOne({
                        where: {
                            name: warehouse,
                        }
                    });
                    if (!existWarehouse) {
                        return res.status(400).json({status: "error", message: "Warehouse not found"});
                    }

                } catch (e) {
                    console.log(e)
                    return res.status(400).json({status: "error", message: e.message});
                }

            }
            else console.log(id);
        }

        return res.json({status: "ok", rek: dataProducts[0]});
    }
}
