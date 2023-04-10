import UnprocessableEntity from '../errors/UnprocessableEntity';
import findTranslation from '../translations/translation';

async function errorTranslation(error: any, userId: string) {
  if (error) {
    const { details } = error;
    const code = details.map((i: any) => i.message).join(',');
    const traduction = await findTranslation(userId, code);
    throw new UnprocessableEntity(traduction);
  }
}

export default errorTranslation;
