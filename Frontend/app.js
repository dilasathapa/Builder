let chartCount = 0;

const canvas = new fabric.Canvas(
  "dashboardCanvas",
  {
    width: window.innerWidth,
    height: window.innerHeight - 70
  }
);

document
  .getElementById("addText")
  .addEventListener("click", () => {

    const text = new fabric.Textbox(
      "Double Click To Edit",
      {
        left: 100,
        top: 100,
        width: 250,
        fontSize: 24
      }
    );

    canvas.add(text);
    canvas.setActiveObject(text);

  });

//   bold
  document
  .getElementById("boldBtn")
  .addEventListener("click", () => {

    const obj = canvas.getActiveObject();

    if (!obj) return;

    obj.set(
      "fontWeight",
      obj.fontWeight === "bold"
        ? "normal"
        : "bold"
    );

    canvas.renderAll();

  });

//   italic

document
  .getElementById("italicBtn")
  .addEventListener("click", () => {

    const obj = canvas.getActiveObject();

    if (!obj) return;

    obj.set(
      "fontStyle",
      obj.fontStyle === "italic"
        ? "normal"
        : "italic"
    );

    canvas.renderAll();

  });

//   fontsize

document
  .getElementById("fontSize")
  .addEventListener("change", (e) => {

    const obj = canvas.getActiveObject();

    if (!obj) return;

    obj.set(
      "fontSize",
      parseInt(e.target.value)
    );

    canvas.renderAll();

  });

//   delete

window.addEventListener("keydown", (e) => {

    if (e.key !== "delete") return;

    const activeObjects =
        canvas.getActiveObjects();

    if (!activeObjects.length) return;

    activeObjects.forEach((obj) => {
        canvas.remove(obj);
    });

    canvas.discardActiveObject();
    canvas.requestRenderAll();

});

// image upload

document
  .getElementById("imageUpload")
  .addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

      fabric.Image.fromURL(
        event.target.result,
        function (img) {

          img.set({
            left: 150,
            top: 150
          });

          img.scaleToWidth(300);

          canvas.add(img);
          canvas.setActiveObject(img);

        }
      );

    };

    reader.readAsDataURL(file);
    e.target.value = "";

  });

//   chart

document
  .getElementById("addChart")
  .addEventListener("click", addChart);

function addChart() {

  const chartCanvas =
    document.createElement("canvas");

  chartCanvas.width = 500;
  chartCanvas.height = 300;

  const randomData = [
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100)
  ];

  new Chart(chartCanvas, {
    type: Math.random() > 0.5
    ? "bar"
    : "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May"
      ],
      datasets: [
        {
          label: `Dataset ${++chartCount}`,
          data: randomData
        }
      ]
    },
    options: {
      responsive: false,
      animation: false
    }
  });

  setTimeout(() => {

    const imageURL =
      chartCanvas.toDataURL("image/png");

    fabric.Image.fromURL(
      imageURL,
      function (img) {

        img.set({
          left: 200,
          top: 200
        });

        img.scaleToWidth(400);

        canvas.add(img);

      }
    );

  }, 300);
}

// save

document
  .getElementById("saveLayout")
  .addEventListener("click", saveLayout);

async function saveLayout() {
  try {
    const layout = JSON.stringify(canvas.toJSON());

    const response = await fetch(
      "../backend/save_layout.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: layout,
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Layout Saved Successfully!");
    }
  } catch (error) {
    console.error(error);
  }
}

// load layout

async function loadLayout() {
  try {
    const response = await fetch(
      "../backend/get_layout.php"
    );

    const data = await response.json();

    if (data && data.objects) {
      canvas.loadFromJSON(
        data,
        () => {
          canvas.renderAll();
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
}

loadLayout();

// clear canvas

document
  .getElementById("clearCanvas")
  .addEventListener("click", () => {

    if(confirm("Clear all elements?")){

      canvas.clear();

    }

  });


  // new dashboard

  document
  .getElementById("newDashboard")
  .addEventListener("click", () => {

    const confirmed = confirm(
      "Create a new dashboard? Unsaved changes will be lost."
    );

    if (!confirmed) return;

    canvas.clear();

    canvas.backgroundColor = "#fafafa";
    canvas.renderAll();

  });

  canvas.setWidth(
    window.innerWidth * 0.6
);

canvas.setHeight(
    window.innerHeight * 0.75
);