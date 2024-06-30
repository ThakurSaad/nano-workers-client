const useFilterUsers = (users = [], role) => {
  const filteredUsers = users.filter((user) => user.role === role);

  return filteredUsers;
};

export default useFilterUsers;
