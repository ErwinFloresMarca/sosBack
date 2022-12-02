"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelService = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const core_1 = require("@loopback/core");
const exceljs_1 = tslib_1.__importDefault(require("exceljs"));
const luxon_1 = require("luxon");
let ExcelService = class ExcelService {
    constructor( /* Add @inject to inject parameters */) { }
    /*
     * Add service methods here
     */
    async generateExcel(columns, data) {
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet('report');
        worksheet.columns = columns;
        data.forEach(row => {
            worksheet.addRow(row);
        });
        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true, name: 'Calibri' };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
        });
        // save under export.xlsx
        // const fileResp = workbook.xlsx.writeBuffer({
        //   filename: fileName
        //     ? fileName
        //     : `report-${DateTime.now().toFormat('yyyy-LL-dd')}.xlsx`,
        // });
        return workbook;
    }
    generateDocColumns(campos) {
        const cols = [];
        cols.push({
            header: 'No. Doc',
            key: 'numDoc',
            width: 12,
            alignment: { horizontal: 'center', vertical: 'middle' },
            font: { bold: true },
        });
        cols.push({
            header: 'FECHA RECEPCIÓN',
            key: 'fechaRecepcion',
            width: 18,
            alignment: { horizontal: 'center', vertical: 'middle' },
            font: { bold: true },
        });
        campos.forEach(col => {
            cols.push({
                header: col.nombre,
                key: col.key,
                width: 26,
                alignment: {
                    horizontal: 'center',
                    vertical: 'middle',
                },
                font: { bold: true },
            });
        });
        cols.push({
            header: 'TÉCNICO DESIGNADO',
            key: 'tecnicoDesignado',
            width: 24,
            alignment: { horizontal: 'center', vertical: 'middle' },
            font: { bold: true },
        });
        cols.push({
            header: 'FECHA DESIGNACIÓN',
            key: 'fechaDesignacion',
            width: 20,
            alignment: { horizontal: 'center', vertical: 'middle' },
            font: { bold: true },
        });
        return cols;
    }
    generateDocRows(rows) {
        const data = [];
        rows.forEach((doc) => {
            data.push({
                numDoc: doc.numDoc,
                fechaRecepcion: doc.fechaRecepcion,
                ...doc.campos,
                fechaDesignacion: doc.documentoEventos[0].createdAt
                    ? luxon_1.DateTime.fromJSDate(new Date(doc.documentoEventos[0].createdAt)).toFormat('yyyy/LL/dd')
                    : undefined,
            });
        });
        return data;
    }
};
ExcelService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], ExcelService);
exports.ExcelService = ExcelService;
//# sourceMappingURL=excel.service.js.map