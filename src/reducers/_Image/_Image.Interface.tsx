/**
 * @param image string base64文字列
 * @param width number 横幅
 * @param height number 高さ
 * @param x number
 * @param y number
 * @param memo string
 * @param done boolean
 */
export interface ImageInterface
{
    name        : string,
    image       : string,
    width       : number,
    height      : number,
    x           : number,
    y           : number,
    memo        : string,
    done        : boolean,
}

/**
 * @param id number 登録番号
 * @param name string 名前
 * @param image string base64文字列
 * @param width number 横幅
 * @param height number 高さ
 * @param x number
 * @param y number
 * @param memo string
 */
export interface EditImageInterface extends ImageInterface
{
    id          : number,
}

/**
 * @param id number 登録番号
 * @param width number 横幅
 * @param height number 高さ
 * @param x number
 * @param y number
 */
export interface LayoutImageInterface
{
    id          : number,
    image       : string,
    width       : number,
    height      : number,
    x           : number,
    y           : number,
}

export const initialState: ImageInterface = {
    name        : '',
    image       : '',
    width       : 100,
    height      : 100,
    x           : 0,
    y           : 0,
    memo        : '',
    done        : false,
}

export const editInitialState: EditImageInterface = {
    id          : 0,
    ...initialState,
}

export const layoutInitialState: LayoutImageInterface = {
    id          : 0,
    image       : '',
    width       : 100,
    height      : 100,
    x           : 0,
    y           : 0,
}