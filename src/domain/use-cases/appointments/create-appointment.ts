import {
  CreateAppointmentDto,
  AppointmentEntity,
  AppointmentRepository,
} from "../../../domain";
import { NotificationService } from "../../../infrastructure";

export interface CreateAppointmentUseCase {
  execute(dto: CreateAppointmentDto): Promise<AppointmentEntity>;
}

export class CreateAppointment implements CreateAppointmentUseCase {
  constructor(
    private readonly repository: AppointmentRepository,
    private readonly notificationService: NotificationService
  ) {}

  async execute(dto: CreateAppointmentDto): Promise<AppointmentEntity> {
    const appointment = await this.repository.create(dto);

    await this.notificationService.publishAppointmentCreated(appointment);

    return appointment;
  }
}
