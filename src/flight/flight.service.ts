import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interface/flight.interface';
import { FLIGHT } from 'src/common/models/models';
import { FlightDTO } from './dto/flight.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}

  async create(flight: FlightDTO): Promise<IFlight> {
    const newFlight = new this.model(flight);
    return await newFlight.save();
  }

  async findAll(): Promise<IFlight[]> {
    return this.model.find().populate('passengers');
  }

  async findOne(id: string): Promise<IFlight> {
    return this.model.findById(id).populate('passengers');
  }

  async update(id: string, flight: FlightDTO): Promise<IFlight> {
    const passenger = { ...flight };
    return await this.model.findByIdAndUpdate(id, passenger, { new: true });
  }

  async delete(id: string): Promise<IFlight> {
    return await this.model.findByIdAndDelete(id);
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    return await this.model
      .findByIdAndUpdate(
        flightId,
        {
          $addToSet: { passengers: passengerId },
        },
        { new: true },
      )
      .populate('passengers');
  }
}
