const inputForm = document.getElementById("inputForm");
const files = document.getElementById("fileField");
const btn = document.getElementById("submit-btn");

baseURL = "http://127.0.0.1:3000/apis/";

btn.addEventListener("click", async function (e) {
  e.preventDefault();

  console.log(files.files);

  const formData = new FormData();
  for (let i = 0; i < files.files.length; i++) {
    formData.append("files", files.files[i]);
  }

  const options = {
    method: "POST",
    body: formData,
  };

  const res = await fetch(baseURL + "file/metadata", options);
  const data = await res.json();

  console.log(data);
});
