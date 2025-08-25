import { AppointmentCLRepositoryImpl } from "../../../infrastructure";
import { CreateAppointmentCLDto } from "../../index";

export interface CreateAppointmentCLUseCase {
  execute(dto: CreateAppointmentCLDto): Promise<void>;
}

export class CreateAppointmentCL implements CreateAppointmentCLUseCase {
  constructor(private readonly repository: AppointmentCLRepositoryImpl) {}

  async execute(dto: CreateAppointmentCLDto): Promise<void> {
    await this.repository.create(dto);
  }
}
