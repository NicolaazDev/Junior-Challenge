import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateAnelDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  poder: string;

  @IsNotEmpty()
  @IsString()
  portador: string;

  @IsNotEmpty()
  @IsString()
  forjadoPor: string;

  @IsNotEmpty()
  @IsUrl()
  imagem: string;
}

export class UpdateAnelDto extends PartialType(CreateAnelDto) {}
