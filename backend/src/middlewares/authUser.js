import jsonwebtoken from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
  try {
    const token = req.header('token');
    if (!token) return res.status(400).json({ msg: 'User not authenticated' });

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: 'User not authenticated' });

      req.user = user;
      next();
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal error' });
  }
};
