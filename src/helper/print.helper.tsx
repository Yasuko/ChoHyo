import { ImageInterface } from '../reducers/_Image/_Image.Interface';
import { PDFBuilderService } from '../_lib/pdf2/pdf-builder.service';
import { PdfPrinter } from '../_lib/pdf2/printer/pdf-printer';
import { SpreadSheetPrinter } from '../_lib/spreadsheet/spreadsheet.printer';

export class PrintHelper
{
    private static instance: PrintHelper;

    public static call(): PrintHelper
    {
        if (!PrintHelper.instance) 
        {
            PrintHelper.instance = new PrintHelper();
        }
        return PrintHelper.instance;
    }

    public convImagelistToImage(img: any, imgList: ImageInterface[]): ImageInterface[]
    {

        const getImg = (id, img) => {
            for (const key in img) {
                if (Object.prototype.hasOwnProperty.call(img, key)) {
                    if (img[key]['id'] === id) {
                        return img[key]['image'];
                    }
                }
            }
        }

        const _imgs: ImageInterface[] = img.map((val: any, key) => {
            return {
                image   : getImg(val.id, imgList),
                width   : val.width,
                height  : val.height,
                x       : val.x,
                y       : val.y,
            };
        });
        return _imgs;
    }

    public convTextData(texts, data): any
    {
        for (const key in texts) {
            if (Object.prototype.hasOwnProperty.call(texts, key)) {
                if (texts[key]['name'] in data) {
                    texts[key]['text'] = data[texts[key]['name']];
                }
            }
        }
        return texts;
    }

    public getTemplateToSVG(id: number, temp: any): any
    {
        for (const key in temp) {
            if (Object.prototype.hasOwnProperty.call(temp, key)) {
                if (temp[key]['id'] === id) {
                    return temp[key]['svg'];
                }
            }
        }
    }

    public getLayout(id: number, layout: any): any
    {
        for (const key in layout) {
            if (Object.prototype.hasOwnProperty.call(layout, key)) {
                if (layout[key]['id'] === id) {
                    return layout[key];
                }
            }
        }
    }

    public async exportSpredSheet(sheet: any): Promise<any>
    {
        const ssp = new SpreadSheetPrinter();
        await ssp.printer(sheet.sheet, sheet.contents);
    }

    public async print1(print): Promise<any>
    {
        const pbs = new PDFBuilderService();
        await pbs.callSvgMaker()
                .setSheetSize(print.width, print.height)
                .setSvgTemplate(print.svg)
                .setImageData(print.images)
                .setTextData(print.texts)
                .sheetMaker();
                //.buildSVGString();
        
        await pbs.buildLayout(
                await pbs.callSvgMaker().getImage(),
                print.paper,
                (print.width > print.height) ? 'landscape' : 'portrait'
            );

        try {
            pbs.buildPDF('宇宙パワー');
           
            return true;
        } catch (error) {
            return false;
        }
    }

    public async printer(printData, texts): Promise<any>
    {
        console.log(printData);
        const pp = new PdfPrinter(printData, texts);
        await pp.print('宇宙パワー');
    }
}
