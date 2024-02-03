export const handleDuplicateError = (error: any) => {
  return [
    {
      path: Object.keys(error.keyValue)[0],
      message: `Duplicate value entered for ${
        Object.values(error.keyValue)[0]
      }`,
    },
  ]
}
