import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/user.model';

export class CreateMessageDto {
  @IsNotEmpty()
  creator: User;

  @IsNotEmpty()
  @IsString()
  content: string;
}
