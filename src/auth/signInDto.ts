import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  // Mettre @IsString
  @IsNotEmpty()
  username: string; // rajouter un ! avant les :

  @IsNotEmpty()
  password: string;
}
