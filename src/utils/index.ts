export const createOrderCode = () =>
  `DH-${new Date().getTime().toString().slice(-6)}`;
