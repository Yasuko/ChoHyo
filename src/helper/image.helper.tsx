// import AjaxParseHelper from './ajax.parse.helper';
import { ImageSplitService } from '../_lib/image/image_split.service'
import { ImageStreamService } from '../_lib/image/image_stream.service'
import { ImageMakerService } from '../_lib/image/image_maker.service'

export class ImageHelper
{
    private static instance: ImageHelper

    private iss: ImageSplitService
    private ist: ImageStreamService
    private ims: ImageMakerService

    private positions: {[key: string]: number[]} = {
        A4  : [50, 200, 20, 110, 800, 800],
        A5  : [35, 135, 12, 75, 400, 400],
        B4  : [50, 250, 20, 130, 1200, 1200],
        card: [20, 56, 3, 25, 85, 55],
    }

    private imageSize: {width: number, height: number} = {
        width: 0,
        height: 0,
    }

    public constructor(){
        this.iss = new ImageSplitService()
        this.ist = new ImageStreamService()
        this.ims = new ImageMakerService()

        return this
    }

    public static call(): ImageHelper
    {
        if (!ImageHelper.instance) 
        {
            ImageHelper.instance = new ImageHelper()
        }
        return ImageHelper.instance
    }

    /**
     * QRコード掲載画像作成
     * @param img string[] 画像文字列の配列
     * @param paper string 用紙タイプ
     * @returns Promise<string>
     */
    public async buildImage(img: string[], paper: string): Promise<string>
    {
        this.imageSize = this.paperSize(paper)
        const p = this.positions[paper];

        this.ims
                .setSheetSize(this.imageSize['height'], this.imageSize['width'])
                .setPrintImages([
                    {img: img[0], x: p[0], y: p[2], width: p[4], height: p[5]},
                    {img: img[1], x: p[1], y: p[2], width: p[4], height: p[5]},
                    {img: img[2], x: p[0], y: p[3], width: p[4], height: p[5]},
                    {img: img[3], x: p[1], y: p[3], width: p[4], height: p[5]}
                ]);
        await this.ims.buildCardImage();

        return ImageMakerService.call().getSheetImage()
    }

    private paperSize(paper: string): {width: number, height: number, rate?: number}
    {
        if (paper === 'card') {
            return {width: 55, height: 91, rate: 1}
        }
        return ImageMakerService.call().getStandardSize(paper)
    }
    /**
     * 画像を4分割する
     * @param img 
     * @returns 
     */
    public async splitImage(img: string): Promise<Uint8ClampedArray[]>
    {
        await this.iss.setImage(img);
        return await this.iss.splitQuatro();
    }

    /**
     * ビデオストリームから画像取得
     * @param target 
     * @returns 
     */
    public async getImage(target: string): Promise<string>
    {
        return this.ist
                .setVideoTarget(target)
                .getImageToStream();
    }

    public getImageSize(): object
    {
        return this.imageSize;
    }

}
