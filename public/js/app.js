const weatherForm = document.getElementById("weatherForm");
const searchInput = document.getElementById("searchInput");
const msg1 = document.getElementById("msg1");
const msg2 = document.getElementById("msg2");

const formSubmitHandler = (e) => {
  e.preventDefault();
  const location = searchInput.value;
  msg1.textContent = "";
  msg2.textContent = "loading...";
  axios
    .get("/weather?address=" + location, { headers: { myToken: "123" } })
    .then((response) => {
      const data = response.data;
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.temperature;
      }
      console.log(data);
    })
    .catch((e) => console.log(e));
};

weatherForm.addEventListener("submit", formSubmitHandler);
