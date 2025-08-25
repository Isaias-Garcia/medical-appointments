import { PrismaClient as PrismaClientPE } from "../../../prisma-pe/client";
import { PrismaClient as PrismaClientCL } from "../../../prisma-cl/client";

export const prismaPE = new PrismaClientPE();
export const prismaCL = new PrismaClientCL();
