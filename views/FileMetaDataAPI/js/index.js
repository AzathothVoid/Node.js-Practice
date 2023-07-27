const inputForm = document.getElementById("inputForm");

baseURL = "http://127.0.0.1:3000/apis/";

inputForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  console.log(e.target.fileField.files);

  const formData = new FormData();
  for (let i = 0; i < e.target.fileField.files.length; i++) {
    formData.append("files", e.target.fileField.files[i]);
  }

  const options = {
    method: "POST",
    body: formData,
  };

  const res = await fetch(baseURL + "file/metadata", options);
  const data = await res.json();

  console.log(data);
});
