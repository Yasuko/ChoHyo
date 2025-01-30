import { put, takeEvery } from 'redux-saga/effects';

// import Helper
import { FileHelper } from '../helper/file.helper';
import { LayoutEditHelper } from '../helper/layout_edit.helper';


// Root Saga登録配列
export const RootDragAction = [
    takeEvery('DragAction/DragStart'    , DragStart),
    takeEvery('DragAction/DragEnd'      , DragEnd),
    takeEvery('DragAction/DragEndImage' , DragEndImage),
    takeEvery('DragAction/DragEndCSV'   , DragEndCSV),
];


/**
 * テンプレートファイルのドラッグ開始
 * @param e HTMLMouseEvent
 */
export function* DragStart()
{
    // yield FileHelper.call().dragStart(e.target);
}

/**
 * テンプレートファイルドロップ処理
 * @param e HTMLMouseEvent
 */
export function* DragEnd(e)
{
    yield FileHelper.call().dragEnd(e.event);
    yield put({
        type                            : e.next,
        [FileHelper.call().getType()]   : FileHelper.call().getFile()
    });
}

/**
 * テンプレートファイルドロップ処理
 * @param e HTMLMouseEvent
 */
export function* DragEndImage(e)
{
    yield FileHelper.call().dragEnd(e.event, 'image');
    yield put({
        type    : e.next,
        image   : FileHelper.call().getFile('image')
    });
}

/**
 * テンプレートファイルドロップ処理
 * @param e HTMLMouseEvent
 */
export function* DragEndCSV(e)
{
    yield FileHelper.call().dragEndCSV(e.event)
 
    yield put({
        type    : e.next,
        csv     : FileHelper.call().getFile()
    });
}

export function MoveStart(e)
{
    LayoutEditHelper.call().moveOn(e);
}

export function* Move(e)
{
    const leh = LayoutEditHelper.call();
    if (leh.checkFlag('resize')) {
        const w = leh.resizeCalc(e);
        yield put({
            type    : 'LayoutImage/update',
            image    : {
                ...e.editTarget,
                ...{
                    key : e.key,
                    width   : w,
                    height  : w * (e.width / e.height),
                }
            }
        });
    }
    if (leh.checkFlag('text')) {
        yield put({
            type    : 'ListText/update',
            text    : {
                ...e.editTarget,
                ...{
                    key : e.key,
                    x   : e.editTarget['x'] + leh.roundCalc(e.pageX, e.rate, 0),
                    y   : e.editTarget['y'] + leh.roundCalc(e.pageY, e.rate, 1)
                }
            }
        });
    }
    if (leh.checkFlag('image')) {
        yield put({
            type    : 'LayoutImage/update',
            image    : {
                ...e.editTarget,
                ...{
                    key : e.key,
                    x   : e.editTarget['x'] + leh.roundCalc(e.pageX, e.rate, 0),
                    y   : e.editTarget['y'] + leh.roundCalc(e.pageY, e.rate, 1)
                }
            }
        });
    }
    if (leh.checkFlag('screen')) {
        yield put({
            type    : 'ActiveLayout/setXY',
            x       : e.screenX - leh.roundCalc(e.pageX, e.rate, 0),
            y       : e.screenY - leh.roundCalc(e.pageY, e.rate, 1)
        });
    }
}

export function MoveEnd(e)
{
    LayoutEditHelper.call().moveEnd(e);
}


