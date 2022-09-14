export const iconMotion = {
  open: {
    transform: "translate(0rem,0rem)",
    transition: { type: "spring", stiffness: 700, damping: 30 },
  },
  close: {
    transform: "translate(-1rem,-1.25rem)",
    transition: { type: "spring", stiffness: 700, damping: 30 },
  },
};

export const numberMotion = {
  open: {
    opacity: "1",
    height: "100%",
    transition: { type: "spring", stiffness: 700, damping: 30, delay: 0.25 },
    transform: "translate(0rem,0rem)",
  },
  close: {
    opacity: "0",
    height: "0",
    transform: "translate(0rem,2rem)",
    transition: { type: "spring", stiffness: 700, damping: 30, delay: 0 },
  },
};

export const titleMotion = {
  active: {
    width: "18ch",
    transform: "translate(0rem,0rem)",
    overflow: "hidden",
  },
  inactive: {
    width: "3.4ch",
    transform: "translate(-10.54rem, 0rem)",
    overflow: "auto",
  },
};

export const bgWhiteMotion = {
  open: {
    width: "100%",
  },
  close: {
    width: "2.63rem",
  },
};

export const bgGradientMotion = {
  open: {
    width: "16rem",
    transition: { type: "linear", delay: 0 },
  },
  close: {
    width: "3.63rem",
    transition: { type: "linear", delay: 0 },
  },
};
