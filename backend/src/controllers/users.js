import Users from '../models/users.js';

class UsersController {
  async create(req, res) {
    const data = req.body;

    try {
      const user = await Users.create(data);
      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async list(req, res) {
    try {
      const users = await Users.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async get(req, res) {
    const { id } = req.params;

    try {
      const user = await Users.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Internal server error.' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      const user = await Users.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Not found.' });
      }

      await user.update(data);

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const user = await Users.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Not found.' });
      }

      await user.destroy();

      return res.status(200).json({ message: 'Deleted.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default new UsersController();
