const app = Vue.createApp({
  data() {
    return {
      search: "",
      person: {
        name: null,
        phone: null,
      },
      sitename: "After School Activities",
      filters: [
        {
          id: 1,
          name: "Subject",
          checked: true,
        },
        {
          id: 2,
          name: "Location",
          checked: false,
        },
        {
          id: 3,
          name: "Price",
          checked: false,
        },
        {
          id: 4,
          name: "Availability",
          checked: false,
        },
      ],
      secondary_filters: [
        {
          id: 1,
          name: "Ascending",
          sign: "",
          checked: true,
        },
        {
          id: 2,
          name: "Descending",
          checked: false,
          sign: "-",
        },
      ],
      lessons: [
        {
          id: 1,
          img: "https://img.icons8.com/external-flat-icons-maxicons/85/000000/external-biology-faculty-flat-flat-icons-maxicons.png",
          subject: "BIOLOGY",
          location: "Minnesota",
          price: 5000,
          spaces: 5,
        },
        {
          id: 2,
          img: "https://img.icons8.com/external-prettycons-flat-prettycons/85/000000/external-maths-education-prettycons-flat-prettycons-1.png",
          subject: "MATHS",
          location: "Mississippi",
          price: 2100,
          spaces: 5,
        },
        {
          id: 3,
          img: "https://img.icons8.com/external-prettycons-lineal-color-prettycons/85/000000/external-chemistry-education-prettycons-lineal-color-prettycons.png",
          subject: "CHEMISTRY",
          location: "LONDON",
          price: 5400,
          spaces: 5,
        },
        {
          id: 4,
          img: "https://img.icons8.com/color/85/000000/language.png",
          subject: "Language",
          location: "NEW YORK",
          price: 80,
          spaces: 5,
        },
        {
          id: 5,
          img: "https://img.icons8.com/external-flatarticons-blue-flatarticons/85/000000/external-violin-valentines-day-flatarticons-blue-flatarticons.png",
          subject: "MUSIC",
          location: "BRISTOL",
          price: 900,
          spaces: 5,
        },
        {
          id: 6,
          img: "https://img.icons8.com/external-flat-icons-pause-08/100/000000/external-chemistry-education-flat-icons-pause-08.png",
          subject: "CHEMISTRY",
          location: "Manchester",
          price: 70,
          spaces: 5,
        },
        {
          id: 7,
          img: "https://img.icons8.com/external-justicon-lineal-color-justicon/85/000000/external-football-sport-justicon-lineal-color-justicon.png",
          subject: "FOOTBALL",
          location: "Brazil",
          price: 2220,
          spaces: 5,
        },
        {
          id: 8,
          img: "https://img.icons8.com/external-justicon-lineal-color-justicon/85/000000/external-cricket-sport-justicon-lineal-color-justicon.png",
          subject: "CRICKET",
          location: "INDIA",
          price: 5100,
          spaces: 5,
        },
        {
          id: 9,
          img: "https://img.icons8.com/external-becris-flat-becris/85/000000/external-art-literary-genres-becris-flat-becris.png",
          subject: "ART & CRAFT",
          location: "Accra",
          price: 9000,
          spaces: 5,
        },
        {
          id: 10,
          img: "https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/85/000000/external-geography-geography-icongeek26-linear-colour-icongeek26.png",
          subject: "Geography",
          location: "Russia",
          price: 4020,
          spaces: 5,
        }
      ],
      cart: [],
      total: 0,
    };
  },

  methods: {
    addToCart(course) {
      if(course.spaces > 0){
        this.cart.push(course);
        this.total += course.price;
        course.spaces--;
      }
    },

    searching(event) {
      let value = event.target.value.toLowerCase();

      $(".single-lesson").each((i, ele) => {
        let filterableText = "";
        let hide = false;
        $(ele).addClass("d-none");

        $(ele)
          .find(".filterable-attribute")
          .each((i, ele2) => {
            filterableText +=
              " " + ele2.innerText.toLowerCase().replace(/\s\s+/g, " ");
          });

        show = filterableText.includes(value);

        if (show) {
          console.clear();
          $(ele).removeClass("d-none");
        }
      });
    },

    removeFromCart(course) {
      let index = this.cart.indexOf(course)
      this.cart.splice(index, 1)
      course.spaces++;
      this.total = this.total - course.price
    },

    resetVariable() {
      this.cart = [];
      this.total = 0;
    },

    checkout() {
      let msg = `Thanks ${this.person.name} your total price is .. (₦ ${this.total} naira only)`;
      alert(msg);
      this.resetVariable();
    },

    stopNumericInput(event) {
      let keyCode = event.keyCode ? event.keyCode : event.which;
      if (keyCode > 47 && keyCode < 58) {
        event.preventDefault();
      }
    },

    stopAlphabetsInput(event) {
      let keyCode = event.keyCode ? event.keyCode : event.which;
      console.log(keyCode);
      if (keyCode >= 48 && keyCode <= 58) {
        // Allow
      } else {
        event.preventDefault();
      }
    },

    dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    },

    toggleMainFilter(filter) {
      this.filters.map((e) => {
        e.checked = false;
        if (e == filter) {
          // Change State
          e.checked = true;

          this.applyFilter();
        }
      });
    },

    toggleSecondaryFilter(sfilter) {
      this.secondary_filters.map((e) => {
        e.checked = false;
        if (e == sfilter) {
          // Change State
          e.checked = true;

          this.applyFilter();
        }
      });
    },

    applyFilter() {
      let sign = this.secondary_filters.filter((obj) => {
        return obj.checked;
      })[0].sign;

      let filter = this.filters
        .filter((obj) => {
          return obj.checked;
        })[0]
        .name.toLowerCase();

      if (filter == "availability") {
        filter = "spaces";
      }

      this.lessons = this.lessons.sort(this.dynamicSort(sign + filter));
    },
  },
  
});

app.mount("#app");
