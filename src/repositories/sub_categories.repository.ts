import db from '../database/db';
import InternalServerError from '../errors/InternalServerError';
import ISubCategory from '../interfaces/ISubCategory';

const TABLE = 'sub_categories';

export const createSubCategory = async (subCategory: ISubCategory): Promise<void> => {
  try {
    await db(TABLE).insert(subCategory);
  } catch (error: any) {
    throw new InternalServerError(error);
  }
};

export const findSubCategories = async (subCategories: string[]): Promise<ISubCategory[]> => {
  try {
    const resultListSubCategory: ISubCategory[] = [];
    const query = db(TABLE)
      .join('categories', `${TABLE}.category_id`, '=', 'categories.category_id')
      .join('projects', `categories.project_id`, '=', 'projects.project_id')
      .whereIn(`${TABLE}.sub_category_id`, subCategories)
      .andWhere(`${TABLE}.status`, 'active')
      .select(
        `${TABLE}.sub_category_id`,
        `${TABLE}.name as sub_category_name`,
        `${TABLE}.status as sub_category_status`,
        'projects.project_id',
        'projects.name as project_name',
        'projects.status as project_status',
        'categories.category_id as category_id',
        'categories.name as category_name',
        'categories.status as category_status'
      );

    console.log(query.toString());

    const result = await query;

    result.forEach((x) => {
      resultListSubCategory.push({
        sub_category_id: x.sub_category_id,
        name: x.sub_category_name,
        status: x.sub_category_status,
        category_id: x.category_id,
        category: {
          category_id: x.category_id,
          name: x.category_name,
          status: x.category_status,
          project: {
            name: x.project_name,
            project_id: x.project_id,
            status: x.project_status,
          },
        },
      });
    });

    return resultListSubCategory;
  } catch (error: any) {
    throw new InternalServerError(error);
  }
};

export default {
  createSubCategory,
  findSubCategories,
};
