import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import axios from 'axios';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<{ message: string, user: Omit<User, 'password'> }> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updateResult = await this.usersRepository.update(id, updateUserDto);
    if (updateResult.affected === 0) {
      throw new NotFoundException(`User #${id} not found`);
    }

    const updatedUser = await this.usersRepository.findOneBy({ id });
    if (!updatedUser) {
      throw new NotFoundException(`User #${id} not found after update`);
    }

    const { password, ...userWithoutPassword } = updatedUser;
    return {
      message: `User with id ${id} successfully updated`,
      user: userWithoutPassword,
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    await this.usersRepository.delete(id);
    return { message: `User with email "${user.email}" has been successfully deleted.` };
  }
  
  async getWeatherDataForCity(city: string) {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`);
    if (response.data.length === 0) {
      throw new Error('City not found');
    }
    const { lat, lon } = response.data[0];
    const weatherResponse = await axios.get(`https://api.stormglass.io/v2/weather/point`, {
      params: { lat: lat, lng: lon, params: 'airTemperature' },
      headers: { 'Authorization': '096b5b1e-e186-11ee-b6c8-0242ac130002-096b5b8c-e186-11ee-b6c8-0242ac130002' }
    });
    return weatherResponse.data.hours[0].airTemperature.noaa;
  }
}