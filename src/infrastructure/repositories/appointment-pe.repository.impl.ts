import {
  AppointmentPERepository,
  AppointmentPEDatasource,
  CreateAppointmentPEDto,
} from "../../domain";

export class AppointmentPERepositoryImpl implements AppointmentPERepository {
  constructor(private readonly datasource: AppointmentPEDatasource) {}

  create(createAppointmentDto: CreateAppointmentPEDto): Promise<void> {
    return this.datasource.create(createAppointmentDto);
  }
}
