export const accodionContainerMotion = {
  open: {
    opacity: "1",
    height: "250px",
    padding: "0rem 1rem 2rem",
    borderRadius: "0 0 0.63rem 0.63rem ",
    transition: { type: "linear", delay: 0 },
  },
  close: {
    opacity: "0",
    height: "0px",
    padding: "0rem",
    borderRadius: "0rem",
    transition: { type: "linear", delay: 0 },
  },
};

export const accodionButtonMotion = {
  open: {
    borderRadius: "0.63rem 0.63rem 0 0",
    transition: { type: "linear", delay: 0 },
  },
  close: {
    borderRadius: "0.63rem",
    transition: { type: "linear", delay: 0 },
  },
};
