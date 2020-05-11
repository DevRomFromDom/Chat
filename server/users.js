const addUser = ({ id, name }, users) => {
  console.log(name, users);
  name = name.trim().toLowerCase();

  const existingUser = users.find((user) => user.name === name);

  if (existingUser) {
    return { ...existingUser, name };
  }
  const user = { id, name };
  users.push(user);
  console.log(user);
  return user;
};

module.exports = { addUser };
