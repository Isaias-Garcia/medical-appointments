import { AppointmentEntity, AppointmentRepository } from "../../../domain";

export interface GetAppointmentsUseCase {
  execute(): Promise<AppointmentEntity[]>;
}

export class GetAppointments implements GetAppointmentsUseCase {
  constructor(private readonly repository: AppointmentRepository) {}

  execute(): Promise<AppointmentEntity[]> {
    return this.repository.getAll();
  }
}
