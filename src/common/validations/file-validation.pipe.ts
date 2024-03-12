import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  readonly allowedExtensions = ['.cer', '.key']; // Extensiones permitidas
  readonly maxFileSize = 5000; // Tamaño máximo en bytes

  transform(
    files: Record<string, Express.Multer.File[]>,
  ): Record<string, Express.Multer.File[]> {
    const validatedFiles: Record<string, Express.Multer.File[]> = {};

    for (const fieldName in files) {
      if (Object.prototype.hasOwnProperty.call(files, fieldName)) {
        const file = files[fieldName][0]; // Solo se permite un archivo por campo

        // Validar la extensión del archivo
        const fileExtension = this.getFileExtension(file.originalname);
        if (!this.allowedExtensions.includes(`.${fileExtension}`)) {
          throw new BadRequestException(
            `El archivo ${file.originalname} no tiene una extensión válida.`,
          );
        }

        // Validar el tamaño del archivo
        if (file.size > this.maxFileSize) {
          throw new BadRequestException(
            `El archivo ${file.originalname} excede el tamaño máximo permitido.`,
          );
        }

        validatedFiles[fieldName] = [file];
      }
    }

    return validatedFiles;
  }

  private getFileExtension(filename: string): string {
    const parts = filename.split('.');
    return parts[parts.length - 1].toLowerCase();
  }
}
