import {
  AppointmentCLRepository,
  AppointmentCLDatasource,
  CreateAppointmentCLDto,
} from "../../domain";

export class AppointmentCLRepositoryImpl implements AppointmentCLRepository {
  constructor(private readonly datasource: AppointmentCLDatasource) {}

  create(createAppointmentDto: CreateAppointmentCLDto): Promise<void> {
    return this.datasource.create(createAppointmentDto);
  }
}
