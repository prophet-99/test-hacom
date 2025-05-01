import { type Book } from '@core/models/book.interface';

export const bookAdapter = ({
  id,
  title,
  description,
  year,
  author,
  published,
  createDate,
}: any) => {
  return {
    id: id,
    titulo: title,
    descripcion: description,
    anio: year,
    idAutor: author?.id,
    publicado: published,
    fechaRegistro: createDate,
  } as Book;
};
