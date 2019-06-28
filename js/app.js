class Ui {
  constructor() {
    this.feddback = document.querySelector(".feedback");
    this.form = document.querySelector("#wheatherForm");
    this.cityInput = document.querySelector("#cityInput");
    this.cityName = document.querySelector("#cityName");
    this.cityCountry = document.querySelector("#cityCountry");
    this.cityIcon = document.querySelector("#cityIcon");
    this.cityTemp = document.querySelector("#cityTemp");
    this.cityHumidity = document.querySelector("#cityHumidity");
    this.results = document.querySelector(".results");
    this.apiKey = "a9fec5bb7a9fb7d385c1634595c65d25";
  }

  async ajax(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${
      this.apiKey
    }&units=metric`;

    const fetchData = await fetch(url);
    const dataFromFetch = await fetchData.json();
    return dataFromFetch;
  }

  showData(data) {
    const {
      name,
      sys: { country },
      main: { temp, humidity }
    } = data;
    const { icon } = data.weather[0];

    this.results.classList.add("showItem");
    this.cityName.textContent = name;
    this.cityCountry.textContent = country;
    this.cityTemp.textContent = temp;
    this.cityHumidity.textContent = humidity;
    this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
  }

  submitForm() {
    this.form.addEventListener("submit", e => {
      e.preventDefault();

      if (this.cityInput.value === "") {
        this.feddback.classList.add("showItem");
        this.feddback.innerHTML = `<h1>Value is empty</h1>`;
        setTimeout(() => this.feddback.remove("showItem"), 3000);
      } else {
        const value = this.cityInput.value;
        this.cityInput.value = "";
        this.ajax(value)
          .then(data => {
            if (
              data.message === "city not found" ||
              this.cityInput.value === Number
            ) {
              this.feddback.classList.add("showItem");
              this.feddback.innerHTML = "<h1>there is not such city</h1>";
              setTimeout(
                () => this.feddback.classList.remove("showItem"),
                3000
              );
            } else {
              this.showData(data);
            }
          })
          .catch(error => console.log(error));
      }
    });
  }
}

const eventListeners = () => {
  const ui = new Ui();
  ui.submitForm();
};

window.addEventListener("DOMContentLoaded", () => {
  eventListeners();
});
