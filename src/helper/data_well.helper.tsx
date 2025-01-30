/**
 * 
 * データをいい感じになんかしてくれるヘルパー
 * 
 */

export class DataWellHelper
{
    private static instance: DataWellHelper
    private data           : [{id: number}] | undefined = undefined
    
    public static call(data: [{id: number}] | null = null)
    {
        if (!DataWellHelper.instance) 
        {
            DataWellHelper.instance = new DataWellHelper()
        }
        
        if (data !== null) DataWellHelper.instance.setData(data)
        
        return DataWellHelper.instance
    }

    public setData(data: [{id: number}]): DataWellHelper
    {
        this.data = data
        return this
    }

    public getById(id: number): {id: number} | false
    {
        if (this.data === undefined) {
            return false
        }
        for (const key in this.data) {
            if (Object.prototype.hasOwnProperty.call(this.data, key)) {
                if ('id' in this.data[key] && this.data[key]['id'] === id) {
                    return this.data[key]
                }
            }
        }
        return false
    }

}
