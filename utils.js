export function getId(id) {
  const length = String(id).length;

  if (length === 1) {
    return `00${id}`;
  } else if (length === 2) {
    return `0${id}`;
  }

  return id;
}
