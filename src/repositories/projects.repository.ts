import _ from 'lodash';
import db from '../database/db';
import InternalServerError from '../errors/InternalServerError';
import IProject from '../interfaces/IProject';
import IResult from './interfaces/IResult';
import IResultCategories from './interfaces/IResultCategories';
import IResultListProject from './interfaces/IResultListProject';
import IResultSubCategories from './interfaces/IResultSubCategories';

const TABLE = 'projects';

export const createProject = async (project: IProject): Promise<void> => {
  try {
    await db(TABLE).insert(project);
  } catch (error: any) {
    throw new InternalServerError(error);
  }
};

export const findProject = async (projectId: string): Promise<IProject> => {
  try {
    const project = await db(TABLE).where('project_id', projectId).first();
    return project;
  } catch (error: any) {
    throw new InternalServerError(error);
  }
};

export const listProjects = async (pageSize: number = 10, page: number = 1, id: string = ''): Promise<IResult> => {
  try {
    let query = null;
    let count = 0;
    if (id !== '') {
      query = db('projects')
        .select(
          'projects.project_id as project_id',
          'projects.name as project_name',
          'projects.status as project_status',
          'categories.category_id as category_id',
          'categories.status as category_status',
          'categories.name as category_name',
          'sub_categories.sub_category_id as sub_category_id',
          'sub_categories.name as sub_category_name',
          'sub_categories.category_id as sub_category_category_id',
          'sub_categories.status as sub_category_category_status'
        )
        .leftJoin('categories', 'projects.project_id', 'categories.project_id')
        .leftJoin('sub_categories', 'categories.category_id', 'sub_categories.category_id')
        .where('projects.project_id', '=', id)
        .orderBy('category_id', 'asc')
        .orderBy('sub_category_id', 'asc')
        .limit(Number(pageSize))
        .offset((Number(page) - 1) * Number(pageSize));

      count = 1;
    } else {
      query = db('projects')
        .select(
          'projects.project_id as project_id',
          'projects.name as project_name',
          'projects.status as project_status',
          'categories.category_id as category_id',
          'categories.status as category_status',
          'categories.name as category_name',
          'sub_categories.sub_category_id as sub_category_id',
          'sub_categories.name as sub_category_name',
          'sub_categories.category_id as sub_category_category_id',
          'sub_categories.status as sub_category_category_status'
        )
        .leftJoin('categories', 'projects.project_id', 'categories.project_id')
        .leftJoin('sub_categories', 'categories.category_id', 'sub_categories.category_id')
        .orderBy('category_id', 'asc')
        .orderBy('sub_category_id', 'asc')
        .limit(Number(pageSize))
        .offset((Number(page) - 1) * Number(pageSize));

      const queryCount = db('projects').count();
      const countQuery = await queryCount;
      count = Number(countQuery[0].count);
    }

    const results = await query;

    let resultsArray: IResultListProject[] = [];
    const groupProjects = _.chain(results)
      .groupBy('project_id')
      .map((value, key) => ({ project_id: key, projects: value }))
      .value();

    groupProjects.forEach((project: any) => {
      const arrayCategories: IResultCategories[] = [];
      const categories: any = _.chain(project.projects)
        .groupBy('category_id')
        .map((value, key) => ({ category_id: key, categories: value }))
        .value();

      if (categories[0].category_id !== 'null') {
        categories.forEach((c: any) => {
          const arraySubCategories: IResultSubCategories[] = [];

          c.categories.forEach((s: any) => {
            if (s.sub_category_id !== null) {
              arraySubCategories.push({
                sub_category_id: s.sub_category_id,
                sub_category_name: s.sub_category_name,
                sub_category_status: s.sub_category_status,
              });
            }
          });

          arrayCategories.push({
            category_id: c.category_id,
            category_name: c.categories[0].category_name,
            category_status: c.categories[0].category_status,
            sub_categories: arraySubCategories,
          });
        });
      }

      resultsArray.push({
        project_id: project.project_id,
        project_name: project.projects[0].project_name,
        project_status: project.projects[0].project_status,
        categories: arrayCategories,
      });
    });

    const result: IResult = {
      count,
      result: resultsArray,
    };
    return result;
  } catch (error: any) {
    throw new InternalServerError(error);
  }
};

export default {
  createProject,
  listProjects,
  findProject,
};
