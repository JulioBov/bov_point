interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  PT: {
    0: 'Cadastro Realizado com sucesso',
    1: 'Nome é obrigatório',
    2: 'O nome deve ter no mínimo 3 caracteres',
    3: 'O nome deve ter no máximo 3 caracteres',
    4: 'Listagem realizada com sucesso',
    5: 'Id inválido',
    6: 'Projeto não encontrado',
    7: 'Categoria não encontrada',
    8: 'Horário inválido, o formato deve ser HH:MM:SS e não poderá ultrapassar 24 horas',
    9: 'Tempo é obrigatório',
    10: 'Data é obrigatória e deve estar no formato YYYY-MM-DD',
    11: 'O id da categoria é obrigatório',
    12: 'O id da subcategoria não pode ser vazio',
    13: 'Deve ser um array de pontos e é obrigatório',
    14: 'Categorias inválidas',
    15: 'Subcategorias inválidas',
    16: 'O lançamento de horas deve ser todo no mesmo dia',
    17: 'O tempo de trabalho está extrapolando 24 horas',
    18: 'Listagem de pontos realizada com sucesso',
  },
  EN: {
    0: 'Registration completed successfully',
    1: 'Name is required',
    2: 'The name must have at least 3 characters',
    3: 'The name must have a maximum of 3 characters',
    4: 'Successfully completed listing',
    5: 'Invalid id',
    6: 'Project not found',
    7: 'Category not found',
    8: 'Invalid time, the format must be HH:MM:SS and cannot exceed 24 hours',
    9: 'Time is mandatory',
    10: 'Date is mandatory, format YYYY-MM-DD',
    11: 'Category id is required',
    12: 'Subcategory id cannot be empty',
    13: 'Must be an array of points and is mandatory',
    14: 'Invalid categories',
    15: 'Invalid subcategories',
    16: 'The posting of hours must be all on the same day',
    17: 'The time to work is extrapolating 24 hours',
    18: 'Successfully completed list of points',
  },
};

const findTranslation = async (userId: string, code: string): Promise<string> => {
  // let language = await Cache.getValue(`${userId}_language_${enviroments.PRODUCT_ID}`);
  // if (!language) language = LANGUAGES.PT;
  const language = 'PT'; // substituir para pegar a linguagem do usuário
  return translations[language][code];
};

export default findTranslation;
