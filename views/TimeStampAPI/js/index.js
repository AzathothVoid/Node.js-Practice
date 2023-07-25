const server = "http://127.0.0.1:3000/";

const getDate = document.getElementById("date-url");
const getBtn = document.getElementById("submit-btn");
const getUnixP = document.getElementById("unix-val");
const getUtcP = document.getElementById("utc-val");

console.log(getDate);

getBtn.addEventListener("click", GET);

async function GET(e) {
  e.preventDefault();
  const res = await fetch(server + getDate.value, {
    method: "GET",
  });

  const data = await res.json();

  if (data.err) {
    return alert("Invalid Date");
  }

  getUnixP.innerHTML = data.Unix;
  getUtcP.innerHTML = data.UTC;

  console.log(res);
}
