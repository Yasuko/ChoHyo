import { TacksheetLayoutService } from '../_lib/pdf/layout/tacksheet-layout.service';
import { PrintLayoutService } from '../_lib/pdf/layout/print-layout.service';
import { TacksheetMakerService } from '../_lib/pdf/maker/tacksheet-maker.service';
import { StandardMakerService } from '../_lib/pdf/maker/standard-maker.service';
import { PDFBuilderService } from '../_lib/pdf/pdf-builder.service';
import { ImageMakerService } from '../_lib/image/image_maker.service';
//import { ImageOrientationService } from '../_lib/image/image_orientation.service';

export class PDFHelper
{
    private static instance: PDFHelper;

    private tls: TacksheetLayoutService;
    private pls: PrintLayoutService;
    private tms: TacksheetMakerService;
    private sms: StandardMakerService;
    private pbs: PDFBuilderService;
    private ims: ImageMakerService;
    //private ios: ImageOrientationService;

    private sheetStatus: any = {
        pageMarginTop   : 25,
        pageMarginLeft  : 10,
        LabelWidth      : 89,
        LabelHeight     : 48,
        LabelMarginTop  : 2,
        LabelMarginLeft : 0,
    }

    private cellCounter = [1, 1, 1, 1, 1];
    private printStartPosition = 0; // 印刷開始位置
    private printCellCount = 5; // 何セル分印刷するか

    private sheetPrintImage: any = '';
    private sheetPreviewImage: any = '';

    public constructor() {
        this.tls = new TacksheetLayoutService();
        this.pls = new PrintLayoutService();
        this.tms = new TacksheetMakerService();
        this.sms = new StandardMakerService();
        this.pbs = new PDFBuilderService();
        this.ims = new ImageMakerService();
        //this.ios = new ImageOrientationService();
    }

    public static call()
    {
        if (!PDFHelper.instance) 
        {
            PDFHelper.instance = new PDFHelper();
        }
        return PDFHelper.instance;
    }

    public getImage(): any
    {
        return this.sheetPreviewImage;
    }

    /**
     * カード用画像データ作成
     * @param img 
     * @returns 
     */
    public async buildCard(img: any): Promise<string>
    {
        this.ims
                .setSheetSize(91, 55)
                .setPrintImages(
                [
                    {img: img[0], x: 20, y: 3, width: 85, height: 55},
                    {img: img[1], x: 56, y: 3, width: 85, height: 55},
                    {img: img[2], x: 20, y: 25, width: 85, height: 55},
                    {img: img[3], x: 56, y: 25, width: 85, height: 55}
                ]);
        await this.ims.buildCardImage();
        return this.ims.getSheetImage();
    }

    /**
     * タックシート印刷用イメージ作成
     * @param img 
     * @returns 
     */
    public async buildTackSheetImage(img: any): Promise<PDFHelper>
    {
        this.tms
            .initialization()   // 初期化
            .setResulution(13.78095)    // 画像の拡大倍率設定
            .setSheetSpec({     // 印刷用紙の情報設定（余白とセルサイズ）
                marginTop: this.sheetStatus.pageMarginTop,
                marginLeft: this.sheetStatus.pageMarginLeft,
                cellWidth: this.sheetStatus.LabelWidth,
                cellHeight: this.sheetStatus.LabelHeight,
                cellMarginTop: this.sheetStatus.LabelMarginTop,
                cellMarginLeft: this.sheetStatus.LabelMarginLeft,
            })
            .setTextDesine({    // 文字フォーマット設定
                fontSize: 10,
            })
            .setPrintOption({   // 印刷オプション設定
                cellCount: this.cellCounter.length,
                startPosition: this.printStartPosition,
                printCount: this.printCellCount
            })  // 印刷するカードイメージ設定
            .setImageContents([img, img, img, img, img]);

        // 画像データ作成
        await this.tms.sheetMakerImage();

        this.sheetPrintImage = this.tms.getSheetImage();
        this.sheetPreviewImage = this.tms.getPreviewImage();

        return this;
    }

    /**
     * 
     * @param paper 
     */
    public async buildStandardPaper(paper: any): Promise<void>
    {
        await this.sms
            .setSheetSize(paper.height, paper.width)
            .setPrintImage(paper.image)
            .setResulution(13.78095)
            .sheetMaker();

        this.sheetPrintImage = this.sms.getSheetImage();
        this.sheetPreviewImage = this.sms.getPreviewImage();
    }

    /**
     * PDFファイル作成
     */
    public async buildPdf(): Promise<void> {
        // 作成したレイアウト情報をセット
        const layout = this.tls
                        .makePdfLayout(this.sheetPrintImage);
        // PDF作成・ダウンロード開始
        await this.pbs.pdfMakeForIE(layout, 'カードイメージ');
    }

    public async buildPdfStandard(paper: any): Promise<void>
    {
        // 作成したレイアウト情報をセット
        const layout = this.pls
            .setSheetStandard(paper.paper, 'landscape')
            .makePdfLayout(this.sheetPrintImage);
        console.log(layout);
        // PDF作成・ダウンロード開始
        await this.pbs.pdfMakeForIE(layout, 'カードイメージ');
    }
}
