export default function (str) {
  str = '' + str
  if (str.length >= 2) {
    return str
  } else {
    return '0' + str
  }
}
