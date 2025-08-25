import {
  AppointmentEntity,
  AppointmentRepository,
  UpdateAppointmentDto,
  CreateAppointmentDto,
  AppointmentDatasource,
} from "../../domain";

export class AppointmentRepositoryImpl implements AppointmentRepository {
  constructor(private readonly datasource: AppointmentDatasource) {}

  create(
    createAppointmentDto: CreateAppointmentDto
  ): Promise<AppointmentEntity> {
    return this.datasource.create(createAppointmentDto);
  }

  getAll(): Promise<AppointmentEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: string): Promise<AppointmentEntity> {
    return this.datasource.findById(id);
  }

  updateById(
    updateAppointmentDto: UpdateAppointmentDto
  ): Promise<AppointmentEntity> {
    return this.datasource.updateById(updateAppointmentDto);
  }
}
