import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FastifyReply } from 'fastify';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest();
    const status = HttpStatus.CONFLICT; // O el estado que prefieras

    const message =
      exception.code === 'P2002'
        ? 'Unique constraint failed on the fields.'
        : 'Database error';

    console.log(message);

    response.status(status).send({
      statusCode: status,
      message,
    });
  }
}
