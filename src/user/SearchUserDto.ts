import { IsString } from 'class-validator';

export class SearchUserDto {
  @IsString()
  searchreq: string;
}
