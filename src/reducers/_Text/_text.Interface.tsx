/**
 * @param text string 文字列
 * @param font string CSS定義のフォントエイリアス
 * @param size number px単位
 * @param color string '#00000'形式指定
 * @param x number
 * @param y number
 */
export interface TextInterface
{
    name    : string,
    text    : string,
    font    : string,
    size    : number,
    color   : string,
    x       : number,
    y       : number,
}

export const initialState: TextInterface = {
    name    : '',
    text    : '文字',
    font    : 'meirio',
    size    : 10,
    color   : '#000000',
    x       : 80,
    y       : 50,
}

export interface ListTextInterface
{
    spot    : number,
    texts   : TextInterface[],
}

export const listInitial: ListTextInterface = {
    spot    : 99999,
    texts   : [initialState],
}
