import { AjaxService } from '../_lib/http/ajax.service'


type ServerOptions = {
    url: string,
    method: 'GET' | 'POST' | 'DELETE' | 'UPDATE',
    body: string,
    header: string
}

export class DataLoadHelper
{
    private static instance: DataLoadHelper

    private aj          : AjaxService
    private serverParam : ServerOptions    = {
        url: '',
        method: 'GET',
        body: '',
        header: ''
    }
    private result      : object = {}
    private apiEndpoint : string = 'api/public/index.php/api/'

    public constructor(server: ServerOptions | null = null){
        this.aj = new AjaxService()
        if (server !== null) {
            this.serverParam = server
        }
    }
    
    public static call(server: ServerOptions | null = null)
    {
        if (!DataLoadHelper.instance) 
        {
            DataLoadHelper.instance = new DataLoadHelper(server)
        }
        return DataLoadHelper.instance
    }

    public getResult(): object
    {
        return this.result
    }

    /**
     * 登録されている全てのTemplateを取得
     * @returns Prmise<TemplateInterface>
     */
    public async loadAllTemplate(): Promise<boolean>
    {
        return await this.callAPI('template/get/all', '', 'GET')
    }
    /**
     * Template idからTemplateを取得
     * @param id number template id
     * @returns Prmise<TemplateInterface>
     */
    public async loadTemplateById(id: number): Promise<boolean>
    {
        return await this.callAPI('template/get/' + id, '', 'GET')
    }
    /**
     * 新規Templateを保存
     * @param template TemplateInterface
     * @returns Promise<boolean>
     */
    public async saveTemplate(template: string): Promise<boolean>
    {
        return await this.callAPI('template/new', template, 'POST')
    }
    /**
     * 
     * @param template 
     * @returns 
     */
    public async updateTemplate(template: string): Promise<boolean>
    {
        return await this.callAPI('template/update', template, 'POST');
    }

    public async deleteTemplate(template: string): Promise<boolean>
    {
        return await this.callAPI('template/delete', template, 'POST');
    }


    public async loadAllImage(): Promise<boolean>
    {
        return await this.callAPI('image/get/all', '', 'GET');
    }
    public async loadImageById(id: number): Promise<boolean>
    {
        return await this.callAPI('image/get/' + id, '', 'GET');
    }
    public async saveImage(image: string): Promise<boolean>
    {
        return await this.callAPI('image/new', image, 'POST');
    }
    public async updateImage(image: string): Promise<boolean>
    {
        return await this.callAPI('image/update', image, 'POST');
    }

    /**
     * 
     * Layoutデータ管理
     * 
     */

    public async loadAllLayout(): Promise<boolean>
    {
        return await this.callAPI('layout/get/all', '', 'GET');
    }
    public async loadLayoutById(id: number): Promise<boolean>
    {
        return await this.callAPI('layout/get/' + id, '', 'GET');
    }
    public async saveLayout(layout: string): Promise<boolean>
    {
        return await this.callAPI('layout/new', layout, 'POST');
    }
    public async updateLayout(layout: string): Promise<boolean>
    {
        return await this.callAPI('layout/update', layout, 'POST');
    }
    public async deleteLayout(layout: string): Promise<boolean>
    {
        return await this.callAPI('layout/delete', layout, 'POST');
    }

    /**
     * 
     * Groupデータ管理
     * 
     */
    public async loadAllGroup(target: number = 1): Promise<boolean>
    {
        return await this.callAPI('group/' + target + '/get/all', '', 'GET')
    }
    public async saveGroup(target: number = 1, group: string): Promise<boolean>
    {
        return await this.callAPI('group/' + target + '/save', group, 'POST')
    }
    public async updateGroup(target: number = 1, group: string): Promise<boolean>
    {
        return await this.callAPI('group/' + target + '/update', group, 'POST')
    }

    /**
     * 
     * エクスポート用データ管理
     * 
     */
    public async loadExportData(): Promise<object>
    {
        await this.callAPI('data/get1', '', 'GET')
        return this.getResult()
    }

    /**
     * APIを叩く
     * @param job string APIエンドポイント
     * @param body any 送信データ（JSON）
     * @param method string GET,POST,UPDATE,DELETE
     * @returns any
     */
    private async callAPI(
        job: string,
        body: string,
        method: 'GET' | 'POST' | 'DELETE' | 'UPDATE'
    ): Promise<boolean> {
    
        // リクエストを送信
        const server = Object.assign({}, this.serverParam)
        server.url = this.serverParam.url + this.apiEndpoint + job
        server.method = method
        server.body = body
        try {
            const result = await this.callAjaxService(server)
            this.result = result['message']
            return true
        } catch (error) {
            return false
        }
    }
    /**
     * Ajaxサービスの呼び出し
     * 
     * @param param 
     * @return Promise<object>
     */
    private async callAjaxService(server: ServerOptions): Promise<object>
    {
        return this.aj.setURL(server.url)
                .setMethod(server.method)
                .setBody(server.body)
                .setHeader(server.header)
                .buildRequestParam()
                .getResult() as Promise<object>
    }
}
