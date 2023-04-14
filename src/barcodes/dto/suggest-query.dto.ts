import { IsNotEmpty, IsNumberString } from "class-validator";

export class SuggestQuery {
    @IsNotEmpty()
    @IsNumberString()
    barcode: string
}