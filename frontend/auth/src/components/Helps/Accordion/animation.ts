export const accodionContainerMotion = {
  open: {
    opacity: 1,
    height: "250px",
    padding: "0rem 1rem 2rem",
    borderRadius: "0 0 0.63rem 0.63rem ",
    transition: { type: "tween", duration: 0.3 },
  },
  close: {
    opacity: 0,
    height: "0px",
    padding: "0rem",
    borderRadius: "0rem",
    transition: { type: "tween", duration: 0.3 },
  },
};

export const accodionButtonMotion = {
  open: {
    borderRadius: "0.63rem 0.63rem 0 0",
    transition: { type: "tween", duration: 0.3 },
  },
  close: {
    borderRadius: "0.63rem",
    transition: { type: "tween", duration: 0.3 },
  },
};
