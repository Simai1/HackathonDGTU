import XLSX from "xlsx";
import { sequelize } from "../models/index.js";
import map from "../enums/measure.js"
import Warehouse from "../models/warehouse.js";
import Product from "../models/product.js";
import mapProduct from "../enums/product.js"
import fs from "fs"
import ProductDto from "../dtos/product-dto.js";

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
            const worksheet = workbook.addWorksheet('Cities');

            // "id": "882b80d1-fce6-4f60-bc24-829412104d1e", 
            // "name": "Сливочное масло", наименование товара
            // "cost": 655.2, - стоимость покупки со склада
            // "manufactureDate": "1970-01-01T00:00:45.398Z", дата изготовления продукта
            // "expiryDate": "1970-01-01T00:00:45.404Z", дата, когда продукт испортится
            // "sku": 1039, обозначающий идентификатор товарной позиции (артикул)
            // "region": "Санкт-Петербург", регион, где товар производится
            // "amount": 600, - вес (литры, граммы,) (зависити от measure) в 1 единице продукта
            // "measure": "г", - мера измерения продукта
            // "volume": 0.0006, - (пока неиспользуемое поле) - скоко в процентах занимает склад 
            // "manufacturer": "Маслозавод \"Сливка\"", - производитель
            // "quantity": 100, - количетсво позиций на складе
            // "orderId": null - привязка к ордеру
            // Добавление заголовков столбцов
            // Product_Name	Product_Cost	Manufacture_Date	Expiry_Date	SKU	Region	Product_Amount	Product_Measure	Product_Volume	Manufacturer	Product_Quantity	Name_Warehouse

            worksheet.columns = [
                { header: 'Product_Name', key: 'name', },
                { header: 'Product_Cost', key: '', },
                { header: 'Manufacture_Date', key: '', },
                { header: 'Expiry_Date', key: '', },
                { header: 'SKU', key: '', },
                { header: 'Region', key: '', },
                { header: 'Product_Amount', key: '', },
                { header: 'Product_Measure', key: '', },
                { header: 'Product_Volume', key: '', },
                { header: 'Manufacturer', key: '', },
                { header: 'Product_Quantity', key: '', },
                { header: 'Name_Warehouse', key: '', },
            ];

            // Добавление данных в таблицу
            products.forEach(product => {
                const productDto = new ProductDto(product);
                console.log(productDto);
                const { city_id, ...cityData } = city.dataValues;
                worksheet.addRow(cityData);
            });

            // Сохранение файла и отправка его пользователю
            const buffer = await workbook.xlsx.writeBuffer();
            res.setHeader('Content-Disposition', 'attachment; filename=cities.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.send(buffer);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error exporting data to Excel');
        }
    }
}

