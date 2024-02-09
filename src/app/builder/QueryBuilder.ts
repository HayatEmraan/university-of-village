import { FilterQuery, Query } from 'mongoose'
import { excludeFields } from '../modules/student/student.utils'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>
  constructor(modelQuery: Query<T[], T>, query: Record<string, any>) {
    this.modelQuery = modelQuery
    this.query = query
  }
  search(searchFields: string[]) {
    const search = this?.query?.search
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchFields.map(
          (field) =>
            ({
              [field]: {
                $regex: search,
                $options: 'i',
              },
            }) as FilterQuery<T>,
        ),
      })
    }
    return this
  }
  filter() {
    const queryObj = { ...this.query }
    excludeFields.forEach((el) => delete queryObj[el])
    if (Object.keys(queryObj).length) {
      this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)
    }
    return this
  }

  sort() {
    this.modelQuery = this.modelQuery.sort(
      (this.query?.sort as string)?.split(',')?.join(' ') || '-createdAt',
    )
    return this
  }
  paginate() {
    this.modelQuery = this.modelQuery
      .skip(
        Number(this?.query?.page || 1 - 1) * Number(this?.query?.limit || 10),
      )
      .limit(Number(this?.query?.limit || 10))
    return this
  }
  select() {
    if (this.query.select) {
      this.modelQuery = this.modelQuery.select(
        (this.query?.select as string)?.split(',').join(' '),
      )
    }
    return this
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter()
    const total = await this.modelQuery.model.countDocuments(
      totalQueries as FilterQuery<T>,
    )
    const page = Number(this?.query?.page || 1)
    const limit = Number(this?.query?.limit || 10)

    const totalPage = Math.ceil(total / limit)
    return {
      page,
      limit,
      total,
      totalPage,
    }
  }
}

export default QueryBuilder
