import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UsersService');
   
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      this.handleDBException({
        code: 'error-001',
        detail: `${id} no encontrado`,
      });
    }
  }


  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }


    // Manejo de excepciones
    private handleDBException(error: any): never {
      if (error.code === '23505')
        throw new BadRequestException(error.detail.replace('Key ', ''));
  
      if (error.code === 'error-001')
        throw new BadRequestException(error.detail.replace('Key ', ''));
  
      if (error.code === 'error-002')
        throw new BadRequestException(error.detail.replace('Key ', ''));
  
      if (error.code === 'error-003')
        throw new BadRequestException(error.detail.replace('Key ', ''));
  
      if (error.code === 'error-004')
        throw new BadRequestException(error.detail.replace('Key ', ''));
  
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error inesperado, verifique los registros del servidor',
      );
    }
  
}
