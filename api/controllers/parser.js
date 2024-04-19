import XLSX from "xlsx";
import { sequelize } from "../models/index.js";


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
        // for (const element of dataProducts) {
        //     const id = element[0];
        //     if(Number(id)) {
        //         console.log(id)
        //         try {
        //             let department = element[1];
        //             //const discipline = element[2] ?? '';
 

        //         } catch (e) {
        //             console.log(e)
        //             return res.status(400).json({status: "error", message: e.message});
        //         }

        //     }
        //     else console.log(id);
        // }

        return res.json({status: "ok"});
    }
}
