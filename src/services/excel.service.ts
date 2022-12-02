/* eslint-disable @typescript-eslint/no-explicit-any */
import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import Excel, {Column} from 'exceljs';
import {DateTime} from 'luxon';

@injectable({scope: BindingScope.TRANSIENT})
export class ExcelService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  async generateExcel(columns: Partial<Column>[], data: Array<any>) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('report');
    worksheet.columns = columns;

    data.forEach(row => {
      worksheet.addRow(row);
    });

    worksheet.getRow(1).eachCell(cell => {
      cell.font = {bold: true, name: 'Calibri'};
      cell.alignment = {horizontal: 'center', vertical: 'middle'};
    });
    // save under export.xlsx
    // const fileResp = workbook.xlsx.writeBuffer({
    //   filename: fileName
    //     ? fileName
    //     : `report-${DateTime.now().toFormat('yyyy-LL-dd')}.xlsx`,
    // });
    return workbook;
  }

  generateDocColumns(campos: any[]): Array<Partial<Column>> {
    const cols: Array<Partial<Column>> = [];
    cols.push({
      header: 'No. Doc',
      key: 'numDoc',
      width: 12,
      alignment: {horizontal: 'center', vertical: 'middle'},
      font: {bold: true},
    });
    cols.push({
      header: 'FECHA RECEPCIÓN',
      key: 'fechaRecepcion',
      width: 18,
      alignment: {horizontal: 'center', vertical: 'middle'},
      font: {bold: true},
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
        font: {bold: true},
      });
    });

    cols.push({
      header: 'TÉCNICO DESIGNADO',
      key: 'tecnicoDesignado',
      width: 24,
      alignment: {horizontal: 'center', vertical: 'middle'},
      font: {bold: true},
    });

    cols.push({
      header: 'FECHA DESIGNACIÓN',
      key: 'fechaDesignacion',
      width: 20,
      alignment: {horizontal: 'center', vertical: 'middle'},
      font: {bold: true},
    });

    return cols;
  }

  generateDocRows(rows: Array<any>): Array<any> {
    const data: Array<any> = [];
    rows.forEach((doc: any) => {
      data.push({
        numDoc: doc.numDoc,
        fechaRecepcion: doc.fechaRecepcion,
        ...doc.campos,
        fechaDesignacion: doc.documentoEventos[0].createdAt
          ? DateTime.fromJSDate(
              new Date(doc.documentoEventos[0].createdAt),
            ).toFormat('yyyy/LL/dd')
          : undefined,
      });
    });
    return data;
  }
}
