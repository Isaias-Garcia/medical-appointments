import { AppointmentPERepositoryImpl } from "../../../infrastructure";
import { CreateAppointmentPEDto } from "../../index";

export interface CreateAppointmentPEUseCase {
  execute(dto: CreateAppointmentPEDto): Promise<void>;
}

export class CreateAppointmentPE implements CreateAppointmentPEUseCase {
  constructor(private readonly repository: AppointmentPERepositoryImpl) {}

  async execute(dto: CreateAppointmentPEDto): Promise<void> {
    await this.repository.create(dto);
  }
}
