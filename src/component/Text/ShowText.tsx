// import reducer
import {
    ListTextPropsInterface, initialState as textInitial,
    TextInterface
} from '../../reducers/_Text/ListText'

import {
    ActiveLayoutPropsInterface, initialState as activeInitial
} from '../../reducers/_Layout/ActiveLayout'
import {
    LayoutImagePropsInterface,
    LayoutImageInterface,
    initialState as imageInitial,
} from '../../reducers/_Image/LayoutImage'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { ListTextInterface } from '../../reducers/_Text/_text.Interface'
import { ActiveLayoutInterface } from '../../reducers/_Layout/_layout.interface'


const flags     : {[key: string]: boolean}    = {
    screen: false, text: false, image: false, resize: false
}

const constRate : number    = 4 // 表示倍率固定レート

let editMode    : boolean   = false


let editTarget  : any       = {}   // 編集対象

let key         : number    = 0    // 移動中コンテンツのIndex番号
let baseX       : number    = 0    // 移動中コンテンツの元のX座標
let baseY       : number    = 0    // 移動中コンテンツの元のY座標
let screenX     : number    = 0    // 背景テンプレートのX座標
let screenY     : number    = 0    // 背景テンプレートのY座標

let viewBox     : string    = ''   // SVG描画エリアの表示エリア

const ShowText = () => {
    const dispatch = useDispatch()

    const lt = useSelector((state: ListTextPropsInterface): ListTextInterface => {
        return state.ListText ? state.ListText : textInitial
    })

    const al = useSelector((state: ActiveLayoutPropsInterface): ActiveLayoutInterface => {
        return state.ActiveLayout ? state.ActiveLayout : activeInitial
    })

    const li = useSelector((state: LayoutImagePropsInterface): LayoutImageInterface[] => {
        return state.LayoutImage ? state.LayoutImage : imageInitial
    })

    viewBox = calcViewBox(al)

    return (
        <div
            className="bg-gray-800 flex justify-center items-center"
            >
            

            <svg
                className='bg-gray-100'
                width={ al.width * constRate }
                height={ al.height * constRate }
                viewBox={ viewBox }
                onMouseMove={(e) => {
                    movePosition(e, al, dispatch)
                }}
                onMouseUp={() => {
                    moveEnd()
                }}
                onWheel={(e) => {
                    if ( al.rate > 0 && al.rate < 10 ) {
                        dispatch({
                            type    : 'ActiveLayout/setRate',
                            rate    : al.rate + (e.deltaY / 1000)
                        });
                    }
                }}
            >
                <image
                    x="0" y="0"
                    width={ al.width }
                    height={ al.height }
                    href={ al.svg}
                    onMouseDown={(e) => {
                        moveOn(e, al, 0, 'screen', dispatch);
                    }}
                ></image>

                { mappingImage(li, dispatch) }
                { mappingText(lt, dispatch) }
                { 
                    (editMode) ? showEditMode(li, dispatch) : (<p></p>)
                }
            </svg>
        </div>
    )
}
/*
const insertSVGTemplate = (al: ActiveLayoutInterface): void => {
    const target = document.getElementById('active_layout') as HTMLOrSVGElement
    if (target !== null) {
        const h = al.svg.split('base64,')

        target.innerHTML = decodeURIComponent(escape(atob(h[1])))
    }
}*/

/**
 * 画像リサイズモード
 * @returns JSX.Element
 */
const showEditMode = (
    li: LayoutImageInterface[],
    dispatch: Dispatch
): JSX.Element[] => {
    const map: number[][] = [[0, 1], [2, 1], [2, 3], [0, 3]]
    const point: number[] = [0,0,0,0]
    point[0] = li[key].x - 2.5
    point[1] = li[key].y - 2.5
    point[2] = li[key].x + li[key].width - 2.5
    point[3] = li[key].y + li[key].height - 2.5

    const _lists: JSX.Element[] = map.map((val: number[], _key) => {
        return (
            <path
                key={_key}
                d={"M " + point[val[0]] + " " + point[val[1]] + " h 5 v 5 h -5 v -5"}
                stroke="white" strokeWidth="1"
                fill="gray" className=""
                onMouseDown={(e) => { moveOn(e, li[key], key, 'resize', dispatch) }}
            />
        )
    })
    return _lists
}

const mappingText = (
    lt: ListTextInterface,
    dispatch: Dispatch
): JSX.Element[] => {
    if (lt.texts[0] === textInitial.texts[0]) {
        return ([<p></p>])
    }
    const _lists: JSX.Element[] = lt.texts.map((val: TextInterface, key) => {
        return (
            <text key={ key }
                x={val.x}
                y={val.y}
                fontSize={val.size}
                fontFamily={val.font}
                stroke="black"
                textAnchor="Super Sans"
                strokeWidth="0.3"
                onMouseDown={(e) => {
                    moveOn(e, val, key, 'text', dispatch);
                }}
            >
                {val.text}
            </text>
        )
    })
    return _lists
}

const mappingImage = (
    li: LayoutImageInterface[],
    dispatch: Dispatch
): JSX.Element[] => {
    if (li === imageInitial) {
        return ([<p></p>])
    }
    const _lists: JSX.Element[] = li.map((val: LayoutImageInterface, key) => {
        return (
            <image
                key={key}
                x={val.x} y={val.y}
                width={ val.width  + 'px' }
                height={ val.height + 'px' }
                href={val.image}
                onMouseDown={(e) => {
                    moveOn(e, val, key, 'image', dispatch)
                }}
            ></image>
        )
    })
    return _lists
}

const moveOn = (
    e: React.MouseEvent,
    content: LayoutImageInterface | TextInterface | ActiveLayoutInterface,
    _key: number,
    type: string,
    dispatch: Dispatch
): void => {
    e.preventDefault();
    if (type !== 'resize' && type !== 'screen') {
        editTarget = content
        key        = _key
    }
    if (type === 'resize') {
        editTarget = content
        editMode   = true
        console.log(editTarget)
    }
    if (type === 'screen') {
        screenX = content.x
        screenY = content.y
        editMode   = false
        editTarget = {}
    }
    if (type === 'image') {
        editMode = true
    }
    if (type === 'text') {
        editMode   = false
        setTextTarget(_key, dispatch)
    }

    baseX      = e.pageX
    baseY      = e.pageY

    if (type === 'image') setFlag('image', true)
    if (type === 'text')  setFlag('text', true)
    if (type === 'resize')  setFlag('resize', true)
    if (type === 'screen')  setFlag('screen', true)
}


const moveEnd = (): void => {
    if (checkFlag('resize')) {
        setFlag('resize', false);
        return;
    }
    if (checkFlag('screen')) {
        screenX = 0;
        screenY = 0;
    }

    baseX      = 0
    baseY      = 0
    key        = 0
    setFlag('screen', false)
    setFlag('text', false)
    setFlag('image', false)
}

const movePosition = (
    e: React.MouseEvent,
    al: ActiveLayoutInterface,
    dispatch: Dispatch
): void => {
    if (checkFlag('resize')) {
        const w = editTarget['width'] + roundCalc(e.pageX - baseX, al)
        console.log(w)
        dispatch({
            type    : 'LayoutImage/update',
            image    : {
                ...editTarget,
                ...{
                    key : key,
                    width   : w,
                    height  : w * (editTarget['width'] / editTarget['height']),
                }
            }
        });
    }
    if (checkFlag('text')) {
        dispatch({
            type    : 'ListText/update',
            text    : {
                ...editTarget,
                ...{
                    key : key,
                    x   : editTarget['x'] + roundCalc(e.pageX - baseX, al),
                    y   : editTarget['y'] + roundCalc(e.pageY - baseY, al)
                }
            }
        });
    }
    if (checkFlag('image')) {
        dispatch({
            type    : 'LayoutImage/update',
            image    : {
                ...editTarget,
                ...{
                    key : key,
                    x   : editTarget['x'] + roundCalc(e.pageX - baseX, al),
                    y   : editTarget['y'] + roundCalc(e.pageY - baseY, al)
                }
            }
        });
    }
    if (checkFlag('screen')) {
        //console.log(roundCalc(e.pageX - baseX, al))
        dispatch({
            type    : 'ActiveLayout/setXY',
            x       : screenX - roundCalc(e.pageX - baseX, al),
            y       : screenY - roundCalc(e.pageY - baseY, al)
        })
    }
}

const roundCalc = (val: number, al: ActiveLayoutInterface): number => {
    return val * al.rate / constRate
}

const setTextTarget = (key: number, dispatch: Dispatch): void => {
    dispatch({
        type    : 'ListText/setSpot',
        spot    : key,
    })
}

const calcViewBox = (al: ActiveLayoutInterface): string => {
    return al.x + ', ' + 
            al.y + ', ' + 
            al.width * al.rate + ', ' + 
            al.height * al.rate;
}

const setFlag = (flag: string, val: boolean): void => {
    flags[flag] = val
}

const checkFlag = (flag: string): boolean => {
    let c: boolean = false;
    for (const key in flags) {
        if (Object.prototype.hasOwnProperty.call(flags, key)) {
            if (key === flag && flags[key]) {
                c = true
            } else if (flags[key]) {
                c = false
            }
        }
    }
    return c
}

export default ShowText
