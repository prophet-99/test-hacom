import { type Author } from '@core/models/author.interface';

export const authorAdapter = ({ id, name, gender }: any) => {
  return {
    id: id,
    nombre: name,
    genero: gender,
  } as Author;
};
