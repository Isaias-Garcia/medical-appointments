import {
  UpdateAppointmentDto,
  AppointmentEntity,
  AppointmentRepository,
} from "../../../domain";

export interface UpdateAppointmentUseCase {
  execute(dto: UpdateAppointmentDto): Promise<AppointmentEntity>;
}

export class UpdateAppointment implements UpdateAppointmentUseCase {
  constructor(private readonly repository: AppointmentRepository) {}

  async execute(dto: UpdateAppointmentDto): Promise<AppointmentEntity> {
    const appointment = await this.repository.updateById(dto);

    return appointment;
  }
}
