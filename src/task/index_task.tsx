import { all } from 'redux-saga/effects';

// Load AnimationAction
import { AnimationTask } from '../animation/index.task';

import { RootLayoutAction } from './LayoutAction';
import { RootTextAction } from './TextAction';
import { RootPrintAction } from './PrintAction';
import { RootDragAction } from './DragAction';

export default function* rootSaga() {
    yield all([
        ...RootLayoutAction,
        ...RootTextAction,
        ...RootPrintAction,
        ...RootDragAction,
        ...AnimationTask,
    ]);
}