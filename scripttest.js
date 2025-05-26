async function getData() {
  const res = await fetch("https://api.ashescodex.com/items");
  const data = await res.json();
  console.log(data);
}

getData();
