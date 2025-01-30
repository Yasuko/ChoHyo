import { TextInterface, initialState as initialText } from '../_Text/_text.Interface';
import { LayoutImageInterface, layoutInitialState } from '../_Image/_Image.Interface';

/**
 * レイアウトのベース
 * @param template  number SVGテンプレートBase64文字列
 * @param group1    number Group1 ID 
 * @param group2    number Group2 ID
 * @param group3    number Group3 ID
 * @param name      string レイアウト名
 * @param paper     string 用紙名（A4、B5、...etc）
 * @param width     number 用紙幅（px）
 * @param height    number 用紙高さ（px）
 * @param texts     TextInterface[] 表示文字列オブジェクトの配列
 * @param images    LayoutImageInterface[] 表示画像オブジェクトの配列
 * @param svg       string svgデータBase64文字列
 * @param sheet     string ExcellシートBase64文字列
 * @param memo      string メモ
 * @param done      boolean 処理の完了フラグ（登録処理完了、編集完了など）
 * @param back      string 処理完了後のdispatch先
 */
export interface LayoutInterface
{
    template : number,
    group1   : number,
    group2   : number,
    group3   : number,
    name     : string,
    paper    : string,
    width    : number,
    height   : number,
    texts    : TextInterface[],
    images   : LayoutImageInterface[],
    svg      : string,
    sheet    : string,
    memo     : string,
    done     : boolean,
    back     : string,
}

/**
 * Excellレイアウト用
 * @param id number
 * @param template number
 * @param group1 number
 * @param group2 number
 * @param group3 number
 * @param name string
 * @param paper string
 * @param width number
 * @param height number
 * @param texts TextInterface[]
 * @param images LayoutImageInterface[]
 * @param svg string
 * @param sheet string
 * @param memo string
 * @param editend boolean
 */
 export interface ExcellLayoutInterface extends LayoutInterface
 {
    contents        : object,
 }


/**
 * @param paper string
 * @param width number
 * @param height number
 * @param x number
 * @param y number
 * @param svg string
 * @param temp_id number
 */
export interface ActiveLayoutInterface
{
    paper    : string,
    width    : number,
    height   : number,
    rate     : number,
    x        : number,
    y        : number,
    svg      : string,
    temp_id  : number,
}

/**
 * ベース初期データー
 */
export const initialState: LayoutInterface = {
    template        : 0,
    group1          : 1,
    group2          : 1,
    group3          : 1,
    name            : '',
    paper           : 'A4',
    width           : 210,
    height          : 297,
    texts           : [initialText],
    images          : [layoutInitialState],
    svg             : '',
    sheet           : '',
    memo            : '',
    done            : false,
    back            : '../',
}

/**
 * Excell用初期データ
 */
export const excellInitialState: ExcellLayoutInterface = {
    ...initialState,
    ...{
        contents          : {},
    }
}

export const activeInitialState: ActiveLayoutInterface = {
    paper           : 'A4',
    width           : 210,
    height          : 297,
    rate            : 0.8,
    x               : 0,
    y               : 0,
    svg             : '',
    temp_id         : 0,
}