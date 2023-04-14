import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateBarcodeDto {
    @IsNotEmpty()
    @IsNumberString()
    barcode: string
}
