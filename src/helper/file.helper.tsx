// import Library
import { DragService } from '../_lib/drag/drag.service'

export class FileHelper
{
    private static instance: FileHelper

    private file: any

    public constructor(){
        return this
    }

    public static call(): FileHelper
    {
        if (!FileHelper.instance) 
        {
            FileHelper.instance = new FileHelper()
        }
        return FileHelper.instance
    }

    public getFile(type: 'file' | 'image' = 'file'): any
    {
        return (type === 'file') ? this.file.data : this.file.image
    }

    public getType(): string
    {
        if (this.file.type === 'svg') {
            return 'svg'
        }
        if (this.file.type === 'xlsx') {
            return 'sheet'
        }
        return 'image'
    }

    public async dragStart(
        target: string = 'dragtarget'
    ): Promise<FileHelper> {
        // await DragService.call().setTarget(target);
        return this;
    }

    public async dragEnd(
        e: React.DragEvent,
        target: string = 'file'
    ): Promise<FileHelper> {
        await DragService.call().onDrop(e);
        this.file = (target === 'file')
            ? DragService.call().getFile()[0]
            : DragService.call().getImage()[0];
        return this;
    }

    public async dragEndCSV(
        e: React.DragEvent
    ): Promise<FileHelper> {

        await DragService.call().setMode(false).onDrop(e);
        this.file = DragService.call().getFile();
        console.log(this.file);
        return this;
    }
}
