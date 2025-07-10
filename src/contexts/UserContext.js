const { createContext, useState, useEffect, useContext } = require("react");

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateAvatar = (url) => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = { ...JSON.parse(savedUser), avatarURL: url };
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, updateAvatar }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
