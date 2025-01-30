
export interface TemplateInterface
{
    name    : string,
    svg     : string | HTMLOrSVGElement,
    sheet   : string | HTMLOrSVGElement,
    paper   : string,
    orientation : string,
    group1  : number,
    group2  : number,
    group3  : number,
    memo    : string,
    done    : boolean,
}

export const orgInitial: TemplateInterface = {
    name    : '',
    svg     : '',
    sheet   : '',
    paper   : 'A4',
    orientation : 'portrait', // portrait or landscape
    group1  : 1,
    group2  : 1,
    group3  : 1,
    memo    : '',
    done    : false,
}

export interface EditTemplateInterface extends TemplateInterface
{
    id      : number,
}

export const editInitial: EditTemplateInterface = {
    id      : 0,
    name    : '',
    svg     : '',
    sheet   : '',
    paper   : 'A4',
    orientation : 'portrait',
    group1  : 1,
    group2  : 1,
    group3  : 1,
    memo    : '',
    done    : false,
}
