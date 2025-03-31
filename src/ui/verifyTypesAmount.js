export function verifyTypesAmount(data) {
  const typeOne = document.getElementById("type-1");
  const typeTwo = document.getElementById("type-2");
  if (data.types.length > 1) {
    typeOne.classList.add("one-of-two");
    typeTwo.classList.add("two-of-two");
  } else {
    typeOne.classList.remove("one-of-two");
  }
}
