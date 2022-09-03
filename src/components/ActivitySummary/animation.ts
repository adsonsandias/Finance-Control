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
