import { CountryISO } from "../../../shared/types";

export class UpdateAppointmentDto {
  private constructor(
    public readonly id: string,
    public readonly insuredId?: string,
    public readonly scheduleId?: number,
    public readonly countryISO?: CountryISO,
    public readonly status?: string
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string | undefined, UpdateAppointmentDto | undefined] {
    const { id, insuredId, scheduleId, countryISO, status } = props;

    if (typeof id !== "string") {
      return ["id must be a string", undefined];
    }
    if (!id.trim()) {
      return ["id cannot be empty", undefined];
    }

    if (insuredId !== undefined) {
      if (typeof insuredId !== "string") {
        return ["insuredId must be a string", undefined];
      }
      if (!/^\d{5}$/.test(insuredId)) {
        return ["insuredId must be a 5 digit string", undefined];
      }
    }

    if (scheduleId !== undefined) {
      if (typeof scheduleId !== "number") {
        return ["scheduleId must be a number", undefined];
      }
    }

    if (countryISO !== undefined) {
      if (countryISO !== "PE" && countryISO !== "CL") {
        return ["countryISO must be either 'PE' or 'CL'", undefined];
      }
    }

    if (status !== undefined && typeof status !== "string") {
      return ["status must be a string if provided", undefined];
    }

    if (
      insuredId === undefined &&
      scheduleId === undefined &&
      countryISO === undefined
    ) {
      return ["At least one field must be provided for update", undefined];
    }

    const finalStatus = "COMPLETED";

    return [
      undefined,
      new UpdateAppointmentDto(
        id,
        insuredId,
        scheduleId,
        countryISO,
        finalStatus
      ),
    ];
  }
}
