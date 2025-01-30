import { put, select, takeEvery } from 'redux-saga/effects';

// import Helper
import { PrintHelper } from '../helper/print.helper';
import { DataLoadHelper } from '../helper/dataload.helper';
import { SpredsheetHelper } from '../helper/spredsheet.helper';

// import Reducer
import { ServerPropsInterface } from '../reducers/Server';
//import { ListTemplatePropsInterface } from '../reducers/_Template/ListTemplate';
//import { ListImagePropsInterface } from '../reducers/_Image/ListImage';
import { NewPrintPropsInterface } from '../reducers/_Print/NewPrint';

const serverParam = (state: ServerPropsInterface) => state.Server;
//const listTemplate = (state: ListTemplatePropsInterface) => state.ListTemplate;
//const listImage = (state: ListImagePropsInterface) => state.ListImage;
const newPrint = (state: NewPrintPropsInterface) => state.NewPrint;

// Root Saga登録配列
export const RootPrintAction = [
    takeEvery('PrintAction/setup', set),
    takeEvery('PrintAction/print', print),
    takeEvery('PrintAction/export', exportExcell),
    takeEvery('PrintAction/printer', printer),
    takeEvery('PrintAction/exportCSV', exportCSV),
];

export function* set(val)
{
    yield put({
        type    : 'NewPrint/set',
        layout  : val.layout,
    });
}

/**
 * フォームから印刷
 */
export function* print()
{
    const print = yield select(newPrint);
    console.log(print);
    const im = yield PrintHelper.call().print1(print);
    console.log(im);
}

export function* exportExcell()
{
    console.log('export excell sheet');
    const contents = yield select(newPrint);
    
    yield PrintHelper.call()
            .exportSpredSheet(contents
            );
}

/**
 * 印刷用のテキストデータを読み込み
 */
export function* loadData()
{
    const print = JSON.parse(JSON.stringify(yield select(newPrint)));
    const data = yield DataLoadHelper.call(
                        Object.assign({}, yield select(serverParam))
                    ).loadExportData();
        
    yield put({
        type    : 'NewPrint/set',
        layout  : PrintHelper.call().convTextData(print.texts, data)
    });
}

/**
 * 定義済みのテキストオブジェクトから印刷
 */
export function* printer()
{
    const print = JSON.parse(JSON.stringify(yield select(newPrint)));

    const data = yield DataLoadHelper.call(
                    Object.assign({},yield select(serverParam))
                    ).loadExportData();
    PrintHelper.call().printer(print, data);
}


export function* exportCSV(val)
{
    const d = yield SpredsheetHelper.call().getCellContents(val.template.sheet, {});
    console.log(d);
    SpredsheetHelper.call().exportCSV(d);
}
