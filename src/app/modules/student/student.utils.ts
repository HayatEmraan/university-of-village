export class NonPrimitive {
  public modifiedDocument: Record<string, unknown> = {}
  constructor(obj: object) {
    this.modifiedDocument = { ...obj }
  }
  Parent(name: string, parent: object = {}) {
    for (const [key, value] of Object.entries(parent)) {
      this.modifiedDocument[`${name}.${key}`] = value
    }
    return this
  }
  Child(name: string, child: object = {}) {
    for (const [key, value] of Object.entries(child)) {
      for (const [childKey, childValue] of Object.entries(value)) {
        this.modifiedDocument[`${name}.${key}.${childKey}`] = childValue
      }
    }
    return this
  }
}

export const searchFields = [
  'email',
  'name.firstName',
  'name.lastName',
  'name.middleName',
]
export const excludeFields = ['select', 'sort', 'page', 'limit', 'search']
