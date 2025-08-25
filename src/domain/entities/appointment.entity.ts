export class AppointmentEntity {
  constructor(
    public insuredId: string,
    public scheduleId: number,
    public countryISO: "PE" | "CL"
  ) {}

  public static fromJson(object: { [key: string]: any }): AppointmentEntity {
    const { insuredId, scheduleId, countryISO } = object;

    if (!insuredId || typeof insuredId !== "string") {
      throw "insuredId is required and must be a string";
    }

    if (!scheduleId || typeof scheduleId !== "number") {
      throw "scheduleId is required and must be a number";
    }

    if (!countryISO || (countryISO !== "PE" && countryISO !== "CL")) {
      throw "countryISO is required and must be either 'PE' or 'CL'";
    }

    return new AppointmentEntity(insuredId, scheduleId, countryISO);
  }
}
