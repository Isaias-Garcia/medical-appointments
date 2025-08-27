import { CountryISO } from "../../../shared/types";

export class CreateAppointmentCLDto {
  private constructor(
    public readonly insuredId: string,
    public readonly scheduleId: number,
    public readonly countryISO: CountryISO,
    public readonly status: string
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string | undefined, CreateAppointmentCLDto | undefined] {
    const { insuredId, scheduleId, countryISO, status } = props;

    if (!insuredId || typeof insuredId !== "string") {
      return ["insuredId is required and must be a string", undefined];
    }

    if (!/^\d{5}$/.test(insuredId)) {
      return ["insuredId must be a 5 digit", undefined];
    }

    if (!scheduleId || typeof scheduleId !== "number") {
      return ["scheduleId is required and must be a number", undefined];
    }

    if (!countryISO || (countryISO !== "PE" && countryISO !== "CL")) {
      return [
        "countryISO is required and must be either 'PE' or 'CL'",
        undefined,
      ];
    }

    if (status !== undefined && typeof status !== "string") {
      return ["status must be a string if provided", undefined];
    }

    const finalStatus = "COMPLETED";

    return [
      undefined,
      new CreateAppointmentCLDto(
        insuredId,
        scheduleId,
        countryISO,
        finalStatus
      ),
    ];
  }
}
