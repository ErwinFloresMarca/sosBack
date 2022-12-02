import Excel, { Column } from 'exceljs';
export declare class ExcelService {
    constructor();
    generateExcel(columns: Partial<Column>[], data: Array<any>): Promise<Excel.Workbook>;
    generateDocColumns(campos: any[]): Array<Partial<Column>>;
    generateDocRows(rows: Array<any>): Array<any>;
}
