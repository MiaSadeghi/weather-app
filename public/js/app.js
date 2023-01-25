const weatherForm = document.getElementById("weatherForm");
const searchInput = document.getElementById("searchInput");

const formSubmitHandler = (e) => {
  e.preventDefault();
  const location = searchInput.value;
  axios
    .get("/weather?address=" + location)
    .then((response) => {
      searchInput.value = "";

      const data = response.data;

      console.log(data);
    })
    .catch((e) => console.log(e));
};

weatherForm.addEventListener("submit", formSubmitHandler);
