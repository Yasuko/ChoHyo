
// import component
import SelectPaperSize from '../_helper/SelectPaperSize';
import SelectPintOrientation from '../_helper/SelectPintOrientation';

// import reducer
interface _Template {
    paper?      : string,
    orientation?: 'landscape' | 'portrait',
    next        : string,
}

export const AddSpecTemplate = ({
    paper,
    orientation,
    next
}: _Template
) => {
    return (
        <div className="">
            <div className="">
                <SelectPaperSize
                    next={next}
                    selected={(paper) ? paper : 'A4'}
                />
            </div>
            <br></br>
            <div className="">
                <SelectPintOrientation
                    next={next}
                    selected={orientation}
                />
            </div>
        </div>
    );
}

export default AddSpecTemplate
