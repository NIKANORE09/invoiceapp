export const transportfromDate = (datae) => {
  const resp = new Date(datae);
  return resp.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
