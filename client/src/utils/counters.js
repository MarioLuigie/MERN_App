export function countBytes (value, unit) {
  let result = null;

  switch(unit) {
    case "KB":
      result = (value / 1024.0).toFixed(2);
    break;
    case "MB":
      result = (value / 1024.0**2).toFixed(2);
    break;
    default:
      result = null
  }
  return result;

  // if(unit === "mb") {
  //   result = (value / 1024**2).toFixed(2);
  // } else {
  //   console.error(result, "Problem with size units for accepted files.");
  // }
} 