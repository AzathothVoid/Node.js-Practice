const inputForm = document.getElementById("inputForm");

baseURL = "http://127.0.0.1:3000/apis/";

inputForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  console.log(e.target.fileField.files[0]);

  const formData = new FormData();
  formData.append("file", e.target.fileField.files[0]);

  const options = {
    method: "POST",
    body: formData,
  };

  const res = await fetch(baseURL + "file/metadata", options);
  const data = await res.json();

  console.log(data);
});
