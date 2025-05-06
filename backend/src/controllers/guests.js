class GuestsController {
  async create(req, res) {
    return res.status(201).json(req.body);
  }
}

export default new GuestsController();
