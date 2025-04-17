import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Bearer token

    if (!token) {
      return false;
    }

    try {
      const payload = this.jwtService.verify(token);
      // Cek apakah token match dengan yang ada di DB
      const user = await this.userRepo.findOne({
        where: { id: payload.id, token },
      });

      if (!user || user.role !== 'admin') return false;
  
      request.user = user;
      return true;
    } catch (error) {
      return false;
    }
  }
}
