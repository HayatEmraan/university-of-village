import { RequestHandler } from 'express'
import { globalResponseHandler } from '../utils/globalResponseHandler'
import { SemesterRegistrationService } from './semester.service'
import { catchAsync } from '../utils/catchAsync'

const semesterRegistrationCreate: RequestHandler = catchAsync(
  async (req, res) => {
    return globalResponseHandler(res, {
      status: 201,
      success: true,
      message: 'Semester registration created successfully',
      data: await SemesterRegistrationService.createSemesterRegistration(
        req.body,
      ),
    })
  },
)

const getAllSemesterRegistration: RequestHandler = catchAsync(
  async (req, res) => {
    const { meta, result } =
      await SemesterRegistrationService.getAllSemesterRegistration(req.query)
    return globalResponseHandler(res, {
      status: 200,
      success: true,
      message: 'Semester registration retrieved successfully',
      data: result,
      meta,
    })
  },
)

const getSemesterRegistration: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Semester registration retrieved successfully',
    data: await SemesterRegistrationService.getSemesterRegistration(
      req.params.id,
    ),
  })
})

const updateSemesterRegistration: RequestHandler = catchAsync(
  async (req, res) => {
    return globalResponseHandler(res, {
      status: 200,
      success: true,
      message: 'Semester registration updated successfully',
      data: await SemesterRegistrationService.updateSemesterRegistration(
        req.params.id,
        req.body,
      ),
    })
  },
)

const deleteSemesterRegistration: RequestHandler = catchAsync(
  async (req, res) => {
    return globalResponseHandler(res, {
      status: 200,
      success: true,
      message: 'Semester registration deleted successfully',
      data: await SemesterRegistrationService.deleteSemesterRegistration(
        req.params.id,
      ),
    })
  },
)

export const SemesterRegistrationController = {
  semesterRegistrationCreate,
  getAllSemesterRegistration,
  getSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
}
