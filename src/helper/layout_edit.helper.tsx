
export class LayoutEditHelper
{
    private static instance: LayoutEditHelper;

    public static call(): LayoutEditHelper
    {
        if (!LayoutEditHelper.instance) 
        {
            LayoutEditHelper.instance = new LayoutEditHelper();
        }
        return LayoutEditHelper.instance;
    }

    private flags       : Object    = {
                            screen: false, text: false, image: false, resize: false
                        }
    //private mouseMove   : boolean   = false;
    //private editMode    : boolean   = false;
  

    private BasePosition: number[]  = [0,0];
    private ScreenPosition: number[]  = [0,0];

    public setFlag(flag: string, val: boolean): void
    {
        this.flags[flag] = val;
    }

    public checkFlag(flag): boolean
    {
        let c: boolean = false;
        for (const key in this.flags) {
            if (Object.prototype.hasOwnProperty.call(this.flags, key)) {
                if (key === flag && this.flags[key]) {
                    c = true;
                } else if (this.flags[key]) {
                    c = false;
                }
            }
        }
        return c;
    }

    public setBasePosition(x: number, y: number): void
    {
        this.BasePosition = [x, y];
    }

    public setScreenPosition(x: number, y: number): void
    {
        this.ScreenPosition = [x, y];
    }


    public moveOn(e: any): void
    {
        this.setBasePosition(e.pageX, e.pageY);

        if (e.type === 'image') this.setFlag('image', true);
        if (e.type === 'text')  this.setFlag('text', true);
        if (e.type === 'resize')  this.setFlag('resize', true);
        if (e.type === 'screen')  this.setFlag('screen', true);
    }


    public moveEnd(endscreen: number[]): void
    {
        if (this.checkFlag('resize')) {
            this.setFlag('resize', false);
            return;
        }
        if (this.checkFlag('screen')) {
            this.setScreenPosition(
                (this.ScreenPosition[0] + endscreen[0]),
                (this.ScreenPosition[1] + endscreen[1])
            );
        }
        this.setBasePosition(0,0);
        this.setFlag('screem', false);
        this.setFlag('text', false);
        this.setFlag('image', false);
    }

    public roundCalc(page: number, rate: number, vec: number = 0): number
    {
        return (page - this.BasePosition[vec]) / rate;
    }

    public resizeCalc(e: any): number
    {
        return e.editTarget.width + (e.pageX - this.BasePosition[0]);
    }

}
