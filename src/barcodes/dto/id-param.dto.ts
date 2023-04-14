import { IsNumber, IsNumberString } from 'class-validator';

export class IdParams {
    @IsNumberString()
    id: number;
}