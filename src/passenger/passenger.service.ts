import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IPassenger } from 'src/common/interface/passenger.interface';
import { PASSENGER } from 'src/common/models/models';
import { PassengerDTO } from './dto/passenger.dto';
import { Model } from 'mongoose';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}

  async create(passenger: PassengerDTO): Promise<IPassenger> {
    const newPassenger = new this.model(passenger);
    return newPassenger.save();
  }

  async findAll(): Promise<IPassenger[]> {
    return this.model.find();
  }

  async findOne(id: string): Promise<IPassenger> {
    return this.model.findById(id);
  }

  async update(id: string, passengerDTO: PassengerDTO): Promise<IPassenger> {
    const passenger = { ...passengerDTO };
    return await this.model.findByIdAndUpdate(id, passenger, { new: true });
  }

  async delete(id: string): Promise<IPassenger> {
    return await this.model.findByIdAndDelete(id);
  }
}
