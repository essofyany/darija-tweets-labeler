export function alreadyexist(arr, range, value) {
  const res = arr.slice(...range).filter((item) => item._id === value);
  //   console.log("alreadyexist", res);
  if (res.length > 0) {
    return true;
  } else return false;
}
