// TODO replace usages of this with redux state

export const appState = {
  count: 0,
  activeItem: false,
  savedExtent: null,
  hasFilterChanges: false,
  housing: { enabled: false, min: 0, max: 75 },
  activeProgramTypes: [],
  theme: "light",
};
