import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateBarcodeDto {
    @IsNotEmpty()
    @IsNumberString()
    barcode: string
}
