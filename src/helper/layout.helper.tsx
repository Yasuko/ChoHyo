// import reducer
import { PaperInterface } from '../reducers/Paper';
import { LayoutImageInterface } from '../reducers/_Image/_Image.Interface';

// import helper


export class LayoutHelper
{
    private static instance: LayoutHelper;

    public static call(): LayoutHelper
    {
        if (!LayoutHelper.instance) 
        {
            LayoutHelper.instance = new LayoutHelper();
        }
        return LayoutHelper.instance;
    }

    /**
     * 用紙情報を取得
     * @param paper 
     * @param name string 用紙規格(A4、A5....)
     * @param orientation string 向き「portlate, landscape」
     * @returns PaperInterface
     */
    public getPaperState(
        paper: any, name: string, orientation: string
    ) : PaperInterface {
        for (const key in paper) {
            if (Object.prototype.hasOwnProperty.call(paper, key)) {
                if (paper[key]['name'] === name) {
                    if (orientation === 'landscape') {
                        return {
                            name    : paper[key]['name'],
                            width   : paper[key]['height'],
                            height  : paper[key]['width'],
                        }
                    }
                    return paper[key];
                }
            }
        }
        return {width: 0, height:0, name:'A4'};
    }

    public convImagelist(img: any): LayoutImageInterface[]
    {
        const _imgs: LayoutImageInterface[] = img.map((val: any, key) => {
            return {
                id      : val.id,
                width   : val.width,
                height  : val.height,
                x       : val.x,
                y       : val.y,
            };
        });
        return _imgs;
    }

    public convLayout(layouts: any): any
    {
        for (const key in layouts) {
            if (Object.prototype.hasOwnProperty.call(layouts, key)) {
                layouts[key]['images'] = JSON.parse(layouts[key]['images']);
                layouts[key]['texts'] = JSON.parse(layouts[key]['texts']);
            }
        }
        return layouts;
    }

    public convTextData(texts, data): any
    {
        const checkCSV = (name): string | boolean => {
            for (const _key in data) {
                if (Object.prototype.hasOwnProperty.call(data, _key)) {
                    if (data[_key][0] === name) {
                        return data[_key][1];
                    }
                }
            }
            return false;
        }

        for (const key in texts) {
            if (Object.prototype.hasOwnProperty.call(texts, key)) {
                const t = checkCSV(texts[key]['name']);
                console.log(t);
                texts[key]['text'] = (!t) ? texts[key]['text'] : t;
            }
        }
        return texts;
    }

    public exchangeCSV(texts): any
    {
        for (const key in texts) {
            if (Object.prototype.hasOwnProperty.call(texts, key)) {
                const t: any = document.getElementById(texts[key][0]);
                // console.log(t);
                if (t !== null) {
                    t.firstChild.innerHTML = texts[key][1];
                }
            }
        }
    }

    public replaceCSV(contents, csv): any
    {
        for (const key in csv) {
            if (Object.prototype.hasOwnProperty.call(csv, key)) {
                if (csv[key][0] in contents) {
                    contents[csv[key][0]] = csv[key][1];
                }
            }
        }
        return contents;
    }

}
