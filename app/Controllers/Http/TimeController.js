'use strict'

const Time = use('App/Models/Time')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with times
 */
class TimeController {
  /**
   * Show a list of all times.
   * GET times
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const times = Time.all()

    return times
  }

  /**
   * Create/save a new time.
   * POST times
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request, response }) {
    const { id } = auth.user
    const data = request.only([
      'date',
      'arrivaltime',
      'lunchtimestart',
      'lunchtimeend',
      'exittime'
    ])

    const time = await Time.create({ ...data, user_id: id })

    return time
  }

  /**
   * Display a single time.
   * GET times/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async show ({ params }) {
      const time = await Time.findOrFail(params.id)

      return time
    }

  /**
   * Update time details.
   * PUT or PATCH times/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const time = await Time.findOrFail(params.id)

    const data = request.only([
      'arrivaltime',
      'lunchtimestart',
      'lunchtimeend',
      'exittime'
    ])

    time.merge(data)

    await time.save()

    return time
  }

  /**
   * Delete a time with id.
   * DELETE times/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const time = await Time.findOrFail(params.id)

    if (time.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await time.delete()
  }
}

module.exports = TimeController
