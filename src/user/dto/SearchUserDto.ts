import { IsString } from 'class-validator';

export class SearchUserDto {
  @IsString()
  // @IsOptional
  searchreq: string; // ?: pour être sur qu'il peut contenir string ou undefined
}
