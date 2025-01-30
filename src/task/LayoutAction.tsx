import { put, select, takeEvery } from 'redux-saga/effects';

// import Helper
import { LayoutHelper }     from '../helper/layout.helper';
import { SpredsheetHelper } from '../helper/spredsheet.helper';

// import Reducer
import { PaperPropsInterface }          from '../reducers/Paper';
import { ListTextPropsInterface }       from '../reducers/_Text/ListText';
import { initialState as initialLayout }from '../reducers/_Layout/_layout.interface';
import { ActiveLayoutPropsInterface }   from '../reducers/_Layout/ActiveLayout';
import { LayoutImagePropsInterface }    from '../reducers/_Image/LayoutImage';
import { ExcellLayoutPropsInterface }   from '../reducers/_Layout/ExcellLayout';

const paperParam    = (state: PaperPropsInterface)          => state.Paper;
const activeLayout  = (state: ActiveLayoutPropsInterface)   => state.ActiveLayout;
const layoutImage   = (state: LayoutImagePropsInterface)    => state.LayoutImage;
const listText      = (state: ListTextPropsInterface)       => state.ListText;
const excellLayout  = (state: ExcellLayoutPropsInterface)   => state.ExcellLayout;

// Root Saga登録配列
export const RootLayoutAction = [
    takeEvery('LayoutAction/save'               , Save),
    takeEvery('LayoutAction/changeTemplate'     , changeTemplate),
    takeEvery('LayoutAction/changePaperSpec'    , changePaperSpec),
    takeEvery('LayoutAction/exchangeCSVText'    , exchangeCSVText),
    takeEvery('LayoutAction/changeExcellTemplate', changeExcellTemplate),
    takeEvery('LayoutAction/atachCSV'           , atachCSV),
    takeEvery('LayoutAction/exportValiableList' , exportValiableList),
];

/**
 * 背景イメージの変更
 * @param val {
 *     template: TemplateInterface
 * }
 */
export function* changeTemplate(val)
{
    console.log('change use Template');
    console.log(val);
    // 背景テンプレートデータをレイアウト編集用Reducerに渡す
    yield put({
        type        : 'ActiveLayout/setTemplate',
        svg         : val.svg,
        id          : 0,
    });

    yield changePaperSpec(val);
}

/**
 * 用紙サイズ、種別を変更
 * @param val 
 */
export function* changePaperSpec(val)
{
    const al    = yield select(activeLayout);
    const _or   = (al.width > al.height) ? 'landscape' : 'portrait';
    const or    = (val.orientation === undefined) ? _or : val.orientation;

    // 用紙サイズ一覧を取得
    const paper = LayoutHelper.call()
                    .getPaperState(
                        yield select(paperParam),
                        (val.paper === undefined) ? al.paper : val.paper,
                        or
                    );
    console.log(paper);
    // 用紙サイズをレイアウト編集用Reducerに渡す
    yield put({
        type        : 'ActiveLayout/setPaper',
        paper       : paper.name,
        ...paper
    });
}

/**
 * 
 */
 export function* Save()
 {
    console.log('Save New Layout');
    const temp  = yield select(activeLayout);
    const texts = yield select(listText);
    const img   = yield select(layoutImage);

    const layout = Object.assign({}, initialLayout[0]);
    layout.template    = temp.temp_id;
    layout.paper       = temp.paper;
    layout.width       = temp.width;
    layout.height      = temp.height;
    layout.texts       = texts.texts;
    layout.images      = img;
    layout.svg         = temp.svg;

    yield put({
        type      : 'PrintAction/setup',
        layout    : layout
    });
    yield put({
    type      : 'PrintAction/print',
});
 }

/**
 * 
 * @param val 
 */
export function* exchangeCSVText(val)
{
    const texts = JSON.parse(JSON.stringify(yield select(listText)));

    if (texts.texts.length > 0) {
        const _texts = LayoutHelper.call().convTextData(texts.texts, val.csv);
        yield put({
            type    : 'ListText/set',
            texts   : _texts,
        });
    }
    // const layout = JSON.parse(JSON.stringify(yield select(activeLayout)));
    LayoutHelper.call().exchangeCSV(val.csv);

}


/**
 * 
 * Excell帳票
 * 
 * 
 * 
 */


/**
 * 背景イメージの変更(Excell)
 * @param val {
 *     template: TemplateInterface
 * }
 */
export function* changeExcellTemplate(val)
{
    console.log('change use Excell Template');
  
    // 
    const contents = yield SpredsheetHelper
                        .call()
                        .getCellContents(val.sheet, '');
     
    // 用紙サイズをレイアウト編集用Reducerに渡す
    yield put({
        type        : 'ExcellLayout/setContents',
        contents    : contents,
    });
    yield put({
        type        : 'ExcellLayout/setSheet',
        sheet       : val.sheet,
    });
}

/**
 * エクセル帳票の変数をCSVから文字列に置き換え
 * @param val {csv: string, ...etc}
 * @return Promise<any>
 */
export function* atachCSV(val)
{
    const layout = JSON.parse(JSON.stringify(yield select(excellLayout)));
    yield put({
        type    : 'ExcellLayout/setContents',
        contents: LayoutHelper.call().replaceCSV(layout.contents, val.csv)
    });
}

/**
 * 
 */
export function* exportValiableList()
{
    const layout = JSON.parse(JSON.stringify(yield select(excellLayout)));
    SpredsheetHelper.call().exportCSV(layout.contents);
}





