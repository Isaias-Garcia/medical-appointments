import { AppointmentEntity, AppointmentRepository } from "../../../domain";

export interface GetAppointmentUseCase {
  execute(id: string): Promise<AppointmentEntity>;
}

export class GetAppointment implements GetAppointmentUseCase {
  constructor(private readonly repository: AppointmentRepository) {}

  execute(id: string): Promise<AppointmentEntity> {
    return this.repository.findById(id);
  }
}
