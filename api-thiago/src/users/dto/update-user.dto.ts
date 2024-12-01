import { PartialType } from '@nestjs/mapped-types'; // importar o PartialType para criar um DTO parcial
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {} 