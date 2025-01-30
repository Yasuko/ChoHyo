import { Dispatch, createSlice } from '@reduxjs/toolkit'

/**
スタイルシートに下記のフォント定義を必ず組み込む事
フォントを追加する場合は下記要領でスタイルシート側で
使用したいフォントの呼び出しを定義する

@font-face {
    font-family: meirio;
    src: local('メイリオ');
}
@font-face {
    font-family: ms_gothic;
    src: local("ＭＳ ゴシック");
}
@font-face {
    font-family: ms_mintyou;
    src: local("ＭＳ 明朝");
}
@font-face {
    font-family: kyokasho;
    src: local("UD デジタル 教科書体 NK-R");
}
@font-face {
    font-family: gyousho;
    src: local("HG行書体");
}
@font-face {
    font-family: kaisho;
    src: local("HG正楷書体-PRO");
}


 */

export interface FontPropsInterface
{
    Font?       : FontInterface[],
    dispatch?   : Dispatch
}

export interface FontInterface
{
    name        : string,
    outstring   : string
}

export const initialState: FontInterface[] = [
    {
        name        : 'meirio',
        outstring   : 'メイリオ'
    },
    {
        name        : 'ms_gothic',
        outstring   : 'MSゴシック'
    },
    {
        name        : 'ms_mintyou',
        outstring   : 'MS明朝'
    },
    {
        name        : 'kyokasho',
        outstring   : '教科書体'
    },
    {
        name        : 'gyousho',
        outstring   : '行書体'
    },
    {
        name        : 'kaisho',
        outstring   : '楷書体'
    }
]

/* eslint @typescript-eslint/no-explicit-any: 0 */
const slice = createSlice({
    name: 'Font',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return action.font;
        },
        add: (state: any, action: any) => {
            return {...state, ...action.font};
        },
        reset: () => {
            return initialState;
        }
    }
})

export default slice.reducer
