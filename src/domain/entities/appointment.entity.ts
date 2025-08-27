import { CountryISO } from "../../shared/types";

export class AppointmentEntity {
  constructor(
    public id: string,
    public insuredId: string,
    public scheduleId: number,
    public countryISO: CountryISO,
    public status: string
  ) {}

  public static fromJson(object: { [key: string]: any }): AppointmentEntity {
    const { id, insuredId, scheduleId, countryISO, status } = object;

    if (!id || typeof id !== "string") {
      throw "id is required and must be a non-empty string";
    }
    if (!id.trim()) {
      throw "id cannot be empty";
    }

    if (!insuredId || typeof insuredId !== "string") {
      throw "insuredId is required and must be a string";
    }

    if (!scheduleId || typeof scheduleId !== "number") {
      throw "scheduleId is required and must be a number";
    }

    if (!countryISO || (countryISO !== "PE" && countryISO !== "CL")) {
      throw "countryISO is required and must be either 'PE' or 'CL'";
    }

    if (status !== undefined) {
      if (typeof status !== "string") {
        throw "status must be a string";
      }
      if (!status.trim()) {
        throw "status cannot be empty";
      }
    }

    return new AppointmentEntity(id, insuredId, scheduleId, countryISO, status);
  }
}
