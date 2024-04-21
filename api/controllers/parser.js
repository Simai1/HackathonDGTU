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
import path from 'path';

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

    async downloadProductsFromWarehouse(req, res) {
        try {
            const products = await Product.findAll();
            const productDtos = [];
            for(const product of products) {    
                productDtos.push(new ProductDto(product)); 
            }
            res.json({ data: productDtos})
                        
        } catch (error) {
            console.error(error);
            res.status(500).send('Error exporting data to Excel');
        }
    },

    async downloadProductsFromShop({body: {id }}, res) {
        try {
            const products = await Product.findAll({
                where: {
                    shopId: id,
                }
            });
            const productDtos = [];
            for(const product of products) {    
                productDtos.push(new ProductDto(product)); 
            }
            res.json({ data: productDtos})
                        
        } catch (error) {
            console.error(error);
            res.status(500).send('Error exporting data to Excel');
        }
    }
}
