import { IsDefined, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateFielDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(6)
  signature_password!: string;
}
