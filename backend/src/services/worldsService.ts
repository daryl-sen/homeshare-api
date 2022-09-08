export const worlds = {
  Earth: {
    name: "Earth",
  },
};

const worldsService = {
  getWorlds(name: keyof typeof worlds) {
    return worlds[name] ? [worlds[name]] : [];
  },
};

export default worldsService;
