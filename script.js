const filters = {
  brightness: { value: 100, min: 0, max: 200, unit: "%" },
  contrast: { value: 100, min: 0, max: 200, unit: "%" },
  saturation: { value: 100, min: 0, max: 200, unit: "%" },
  hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
  blur: { value: 0, min: 0, max: 200, unit: "px" },
  grayscale: { value: 0, min: 0, max: 100, unit: "%" },
  sepia: { value: 0, min: 0, max: 100, unit: "%" },
  opacity: { value: 100, min: 0, max: 100, unit: "%" },
  invert: { value: 0, min: 0, max: 100, unit: "%" }
};

const filtersContainer = document.querySelector(".filter");
const canvas = document.querySelector(".image-canvas");
const imageInput = document.querySelector("#image-input");
const placeholder = document.querySelector('.img-container')
const imageCanvas = document.querySelector('.image-canvas')

const canvasCtx = canvas.getContext("2d");

let image = null;

// Create filter sliders
function createFilterElement(name, filter) {
  const div = document.createElement("div");
  div.classList.add("filter-item");

  const p = document.createElement("p");
  p.innerText = name;

  const input = document.createElement("input");
  input.type = "range";
  input.min = filter.min;
  input.max = filter.max;
  input.value = filter.value;
  input.id = name;

  div.append(p, input);

  input.addEventListener("input", () => {
    filters[name].value = Number(input.value);
    applyFilters();
  });

  return div;
}

// Render all filter sliders
if (filtersContainer) {
  Object.keys(filters).forEach((name) => {
    filtersContainer.appendChild(
      createFilterElement(name, filters[name])
    );
  });
}

// Upload image
imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
   placeholder.style.display = "none"
   imageCanvas.style.display = "block"

  if (!file) return;

  const img = new Image();
  const imageUrl = URL.createObjectURL(file);

  img.onload = () => {
    image = img;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const placeholder = document.querySelector(".img-container");

    if (placeholder) {
      placeholder.style.display = "none";
    }

    applyFilters();
    URL.revokeObjectURL(imageUrl);
  };

  img.onerror = () => {
    URL.revokeObjectURL(imageUrl);
    console.error("Image could not be loaded.");
  };

  img.src = imageUrl;
});

// Apply all filters
function applyFilters() {
  if (!image) return;

  const f = filters;

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  canvasCtx.filter = `
    brightness(${f.brightness.value}%)
    contrast(${f.contrast.value}%)
    saturate(${f.saturation.value}%)
    hue-rotate(${f.hueRotation.value}deg)
    blur(${f.blur.value}px)
    grayscale(${f.grayscale.value}%)
    sepia(${f.sepia.value}%)
    opacity(${f.opacity.value}%)
    invert(${f.invert.value}%)

  `;

  canvasCtx.drawImage(
    image,
    0,
    0,
    canvas.width,
    canvas.height
  );
  canvasCtx.filter = "none";
}