export const signup = async (req, res) => {
  try {
    const {username, password} = req.body;
  } catch (error) {
    res.status(500).json({message: 'An error occurred'});
  }
};

export const login = async (req, res) => {
  console.log('login user');
};

export const logout = async (req, res) => {
  res.send('logout user');
};
