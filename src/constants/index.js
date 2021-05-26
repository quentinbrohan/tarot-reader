const PIXEL_SIZE = 250;

export const REVEAL_LEFT = {
  from: { opacity: 0, marginLeft: -PIXEL_SIZE },
  to: { opacity: 1, marginLeft: 0 },
};

export const REVEAL_TOP = {
  from: { opacity: 0, marginTop: -(PIXEL_SIZE * 2) },
  to: { opacity: 1, marginTop: 0 },
};

export const REVEAL_BOTTOM = {
  from: { opacity: 0, marginBottom: -PIXEL_SIZE },
  to: { opacity: 1, marginBottom: 0 },
};
