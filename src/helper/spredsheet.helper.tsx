import { SpreadSheetService } from '../_lib/spreadsheet/spreadsheet.service';
import { CsvService } from '../_lib/spreadsheet/csv.service';
import { SpreadSheetPrinter } from '../_lib/spreadsheet/spreadsheet.printer';
export class SpredsheetHelper
{
    private static instance: SpredsheetHelper;

    public static call(): SpredsheetHelper
    {
        if (!SpredsheetHelper.instance) 
        {
            SpredsheetHelper.instance = new SpredsheetHelper();
        }
        return SpredsheetHelper.instance;
    }

    /**
     * Excellシートの変数セルに、文字列を当てはめて返す
     * @param contents any
     * @param dataset {[key: string]: contents: string }
     * @return Promise<any> ExcellSpredSheet
     */
    public async outputSpreadSheet(contents: any, dataset: object): Promise<any>
    {
        const sss = new SpreadSheetService();
        
        await sss
            .setSpreadSheet(contents.sheet)
            .setDataMap(dataset)
            .mappingDataset();
        
        sss.exportSpreadSheet();
    }

    /**
     * Excellシートの変数セルを文字列に置き換えて返す
     * @param contents any
     * @returns Promise<any> ExcellSpredSheet
     */
    public async convertSpreadSheet(contents: any): Promise<any>
    {
        const sss = new SpreadSheetService();
        
        await sss
            .setSpreadSheet(contents.sheet)
            .setDataMap(this.convExportContents(contents.contents))
            .mappingDataset();
        
        sss.exportSpreadSheet();
    }

    /**
     * Excellシートから変数セル情報を取得して返す
     * @param sheet any
     * @param initial any
     * @returns Promise<any>ExcellSpredSheet
     */
    public async getCellContents(sheet: any, initial: any): Promise<any>
    {
        const sss = new SpreadSheetService();

        await sss
            .setSpreadSheet(sheet)
            .mappingSheet();
        
        return this.convPropatieObj(sss.getSheetPropatie(), initial);
        // return sss.getSheetPropatie();
    }

    /**
     * 
     * @param sheet any
     * @param data any
     * @return Promise<any> ExcellSpredSheet
     */
    public async testPrinter(sheet: any, data: any): Promise<any>
    {
        const ssp = new SpreadSheetPrinter();
        await ssp.printer(sheet.sheet, data);
    }

    /**
     * 
     * @param contents any
     * @returns Promise<any> ExcellSpredSheet
     */
    private convExportContents(contents: any): any
    {
        const _contents = {}
        for (const key in contents) {
            if (Object.prototype.hasOwnProperty.call(contents, key)) {
                if (contents[key]['type'] === 'text') {
                    _contents[key] = contents[key]['content'];
                } else if (contents[key]['type'] === 'image') {

                }
            }
        }
        return _contents;
    }

    /**
     * 
     * @param contents 
     * @param initial 
     * @returns any
     */
    private convPropatieObj(contents: any, initial): any
    {
        let _content = {};
        for (let i = 0; i < contents.length; i++) {
            _content = {
                [contents[i]] : initial,
                ..._content
            }
        }
        return _content;
    }

    public exportCSV(data: any): any
    {
        const csv = new CsvService();
        csv.setData(data).exportCSV('unko');
    }
}
