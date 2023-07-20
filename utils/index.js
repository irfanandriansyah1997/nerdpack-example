export const cx = (object) =>
  Object.keys(object)
    .reduce((prev, current) => {
      if (object[current]) prev.push(current);

      return prev;
    }, [])
    .join(" ");
