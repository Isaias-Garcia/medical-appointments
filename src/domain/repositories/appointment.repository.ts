import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
  AppointmentEntity,
} from "../index";

export abstract class AppointmentRepository {
  abstract create(
    createAppointmentDto: CreateAppointmentDto
  ): Promise<AppointmentEntity>;
  abstract getAll(): Promise<AppointmentEntity[]>;
  abstract findById(id: string): Promise<AppointmentEntity>;
  abstract updateById(
    updateAppointmentDto: UpdateAppointmentDto
  ): Promise<AppointmentEntity>;
}
