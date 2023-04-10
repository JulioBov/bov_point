import db from '../database/db';
import InternalServerError from '../errors/InternalServerError';
import ICategory from '../interfaces/ICategory';

const TABLE = 'categories';

export const createCategory = async (category: ICategory): Promise<void> => {
  try {
    await db(TABLE).insert(category);
  } catch (error: any) {
    throw new InternalServerError(error);
  }
};

export const findCategory = async (category: string): Promise<ICategory> => {
  try {
    const project = await db(TABLE).where('category_id', category).first();
    return project;
  } catch (error: any) {
    throw new InternalServerError(error);
  }
};

export const findCategories = async (categories: string[]): Promise<ICategory[]> => {
  try {
    const resultListCategory: ICategory[] = [];
    const query = db(TABLE)
      .join('projects', `${TABLE}.project_id`, '=', 'projects.project_id')
      .whereIn(`${TABLE}.category_id`, categories)
      .andWhere(`${TABLE}.status`, 'active')
      .select(
        `${TABLE}.category_id`,
        `${TABLE}.name as category_name`,
        `${TABLE}.status as category_status`,
        'projects.project_id',
        'projects.name as project_name',
        'projects.status as project_status'
      );
    const result = await query;

    result.forEach((x) => {
      resultListCategory.push({
        category_id: x.category_id,
        name: x.category_name,
        status: x.category_status,
        project: {
          name: x.project_name,
          project_id: x.project_id,
          status: x.project_status,
        },
      });
    });
    return resultListCategory;
  } catch (error: any) {
    throw new InternalServerError(error);
  }
};

export default {
  createCategory,
  findCategory,
  findCategories,
};
