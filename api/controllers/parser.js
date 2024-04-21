import XLSX from "xlsx";
import { sequelize } from "../models/index.js";
import map from "../enums/measure.js"
import Warehouse from "../models/warehouse.js";
import Product from "../models/product.js";
import mapProduct from "../enums/product.js"
import ExcelJS from "exceljs";
import fs from "fs"
import ProductDto from "../dtos/product-dto.js";
import { map as productNameMap } from '../enums/product.js';
import { map as measureMap } from '../enums/measure.js';

export default {
    async parseFromXlsx(req, res) {
        let workbook = XLSX.readFile(req.file.path);
        const products = [];
        //выгрузка из xlsx в json (не удалять)
        // const workbook = XLSX.readFile(req.file.path);

        // // Получаем первый лист в книге
        // const sheetName = workbook.SheetNames[0];
        // const worksheet = workbook.Sheets[sheetName];

        // // Преобразуем лист в JSON
        // const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // // Путь к файлу, в который будет сохранено JSON
        // const filePath = 'output.json';

        // // Преобразуем JSON в строку и сохраняем в файл
        // fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        //     if (err) throw err;
        //     console.log('JSON данные успешно сохранены в файл ' + filePath);
        // });

        Object.keys(workbook.Sheets).forEach((name) => {
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1 });
            products.push({ name, data: sheetData });
        });

        const dataProducts = products[0].data;
        console.log(dataProducts)
        for (const element of dataProducts) {
            const id = element[0];
            if (Number(id)) {
                try {
                    const productName = mapProduct[element[1]];
                    const productCost = element[2];
                    const manufactureDate = new Date((element[3] - 25569) * 86400000 + 1000)
                    manufactureDate.setHours(manufactureDate.getHours() - 3);
                    const expiryDate = new Date((element[4] - 25569) * 86400000 + 1000)
                    expiryDate.setHours(expiryDate.getHours() - 3);
                    const sku = element[5];
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
                        return res.status(400).json({ status: "error", message: "Warehouse not found" });
                    }
                    const warehouseId = existWarehouse.id;
                    const uploadingDate = Date.now();
                    Product.create({
                        productName,
                        productCost,
                        manufactureDate,
                        expiryDate,
                        sku,
                        region,
                        productAmount,
                        productMeasure,
                        productVolume,
                        manufacture,
                        productQuantity,
                        warehouseId,
                        uploadingDate,
                    })

                } catch (e) {
                    console.log(e)
                    return res.status(400).json({ status: "error", message: e.message });
                }
            }
            else console.log(id);
        }

        return res.json({ status: "ok", rek: dataProducts[0] });
    },

    async downloadProductsFromWarehouse({ body: { name } }, res) {
        try {
            const existWarehouse = await Warehouse.findOne({
                where: {
                    name,
                }
            });
            if (!existWarehouse) {
                return res.status(400).json({ status: "error", message: "Warehouse not found" });
            }
            const products = await Product.findAll({
                where: {
                    warehouseId: existWarehouse.id,
                }
            })

            // Создание нового XLSX файла
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Warehouse');

            worksheet.columns = [
                { Header: "S no.", key: "s_no"},
                { header: 'Product_Name', key: 'name', },
                { header: 'Product_Cost', key: 'productCost', },
                { header: 'Manufacture_Date', key: 'manufactureDate', width: 25},
                { header: 'Expiry_Date', key: 'expiryDate', width: 25},
                { header: 'SKU', key: 'sku', },
                { header: 'Region', key: 'region', },
                { header: 'Product_Amount', key: 'productAmount', },
                { header: 'Product_Measure', key: 'productMeasure', },
                { header: 'Product_Volume', key: 'productVolume', },
                { header: 'Manufacturer', key: 'manufacture', width: 35},
                { header: 'Product_Quantity', key: 'productQuantity', },
            ];
            let counter = 1;
            // Добавление данных в таблицу
            products.forEach(product => {
                product.s_no = counter;
                product.name = productNameMap[product.productName];
                product.productMeasure = measureMap[product.productMeasure];
                console.log(product);
                worksheet.addRow(product);
                counter++;
            });

            const currentDate = new Date().toISOString().slice(0, 10);

            // Создание пути к файлу с использованием текущей даты
            const filePath = `${name}_${currentDate}.xlsx`;

            workbook.xlsx.writeFile(`./download/${filePath}`)

            .then(() => {
                console.log('File saved!')
                res.json({ status: "File saved"})
            });
        

        } catch (error) {
            console.error(error);
            res.status(500).send('Error exporting data to Excel');
        }
    }
}
