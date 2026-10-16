let filters = {
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
const downloadButton = document.querySelector("#download-btn")

const canvasCtx = canvas.getContext("2d");
const reset = document.querySelector('#reset-btn')
const presetContainer = document.querySelector('.preset')

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
function creatFilter(){

  if (filtersContainer) {
  Object.keys(filters).forEach((name) => {
    filtersContainer.appendChild(
      createFilterElement(name, filters[name])
    );
  });
}
}
creatFilter()

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


reset.addEventListener("click", () => {
  
  Object.keys(filters).forEach((name) => {
    const filter = filters[name];

    if (name === "brightness" ||
        name === "contrast" ||
        name === "saturation" ||
        name === "opacity") {
      filter.value = 100;
    } else {
      filter.value = 0;
    }
  });

  // Update slider positions
  filtersContainer.innerHTML = "";
  creatFilter();

  // Apply reset filters to the image
  applyFilters();
});
downloadButton.addEventListener("click", ()=>{
  const link = document.createElement("a")
  link.download =  "edited-image.png"
  link.href = imageCanvas.toDataURL("image/png")
  link.click()

})


const presets = {
  original: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  drama: {
    brightness: 90,
    contrast: 150,
    saturation: 125,
    hueRotation: 0,
    blur: 0,
    grayscale: 10,
    sepia: 5,
    opacity: 100,
    invert: 0
  },

  oldSchool: {
    brightness: 105,
    contrast: 90,
    saturation: 75,
    hueRotation: 0,
    blur: 0,
    grayscale: 10,
    sepia: 45,
    opacity: 100,
    invert: 0
  },

  vintage: {
    brightness: 110,
    contrast: 85,
    saturation: 80,
    hueRotation: 350,
    blur: 0,
    grayscale: 5,
    sepia: 30,
    opacity: 100,
    invert: 0
  },

  cinematic: {
    brightness: 90,
    contrast: 125,
    saturation: 115,
    hueRotation: 345,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0
  },

  blackAndWhite: {
    brightness: 105,
    contrast: 125,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  warm: {
    brightness: 110,
    contrast: 105,
    saturation: 115,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    opacity: 100,
    invert: 0
  },

  cool: {
    brightness: 100,
    contrast: 115,
    saturation: 110,
    hueRotation: 190,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  faded: {
    brightness: 115,
    contrast: 75,
    saturation: 80,
    hueRotation: 0,
    blur: 0,
    grayscale: 5,
    sepia: 10,
    opacity: 100,
    invert: 0
  },

  vivid: {
    brightness: 105,
    contrast: 120,
    saturation: 160,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  dreamy: {
    brightness: 115,
    contrast: 90,
    saturation: 110,
    hueRotation: 0,
    blur: 1,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0
  },
    // Aesthetic presets
  softGlow: {
    brightness: 110, contrast: 90, saturation: 110,
    hueRotation: 0, blur: 0, grayscale: 0,
    sepia: 8, opacity: 100, invert: 0
  },

  moody: {
    brightness: 85, contrast: 135, saturation: 80,
    hueRotation: 0, blur: 0, grayscale: 5,
    sepia: 12, opacity: 100, invert: 0
  },

  pastelDream: {
    brightness: 115, contrast: 80, saturation: 85,
    hueRotation: 5, blur: 0, grayscale: 0,
    sepia: 8, opacity: 100, invert: 0
  },

  goldenHour: {
    brightness: 110, contrast: 105, saturation: 125,
    hueRotation: 350, blur: 0, grayscale: 0,
    sepia: 25, opacity: 100, invert: 0
  },

  roseGold: {
    brightness: 108, contrast: 95, saturation: 105,
    hueRotation: 345, blur: 0, grayscale: 0,
    sepia: 18, opacity: 100, invert: 0
  },

  lavenderHaze: {
    brightness: 108, contrast: 90, saturation: 90,
    hueRotation: 270, blur: 0, grayscale: 0,
    sepia: 5, opacity: 100, invert: 0
  },

  // Modern photography
  editorial: {
    brightness: 100, contrast: 125, saturation: 85,
    hueRotation: 0, blur: 0, grayscale: 0,
    sepia: 5, opacity: 100, invert: 0
  },

  urbanNight: {
    brightness: 75, contrast: 145, saturation: 120,
    hueRotation: 200, blur: 0, grayscale: 0,
    sepia: 0, opacity: 100, invert: 0
  },

  cyberpunk: {
    brightness: 90, contrast: 140, saturation: 150,
    hueRotation: 280, blur: 0, grayscale: 0,
    sepia: 0, opacity: 100, invert: 0
  },

  arcticBlue: {
    brightness: 105, contrast: 110, saturation: 85,
    hueRotation: 190, blur: 0, grayscale: 0,
    sepia: 0, opacity: 100, invert: 0
  },

  // Film and retro
  polaroid: {
    brightness: 110, contrast: 85, saturation: 80,
    hueRotation: 0, blur: 0, grayscale: 0,
    sepia: 22, opacity: 100, invert: 0
  },

  retroFilm: {
    brightness: 105, contrast: 90, saturation: 75,
    hueRotation: 5, blur: 0, grayscale: 8,
    sepia: 30, opacity: 100, invert: 0
  },

  dustyFilm: {
    brightness: 112, contrast: 78, saturation: 65,
    hueRotation: 0, blur: 0, grayscale: 12,
    sepia: 18, opacity: 100, invert: 0
  },

  noir: {
    brightness: 85, contrast: 160, saturation: 0,
    hueRotation: 0, blur: 0, grayscale: 100,
    sepia: 0, opacity: 100, invert: 0
  },

  // Social media looks
  instagramPop: {
    brightness: 105, contrast: 115, saturation: 135,
    hueRotation: 0, blur: 0, grayscale: 0,
    sepia: 5, opacity: 100, invert: 0
  },

  cleanAesthetic: {
    brightness: 108, contrast: 98, saturation: 105,
    hueRotation: 0, blur: 0, grayscale: 0,
    sepia: 0, opacity: 100, invert: 0
  },

  beachVibes: {
    brightness: 112, contrast: 95, saturation: 120,
    hueRotation: 185, blur: 0, grayscale: 0,
    sepia: 8, opacity: 100, invert: 0
  },

  forestMood: {
    brightness: 92, contrast: 115, saturation: 110,
    hueRotation: 85, blur: 0, grayscale: 0,
    sepia: 10, opacity: 100, invert: 0
  },

  fadedRose: {
    brightness: 112, contrast: 82, saturation: 75,
    hueRotation: 340, blur: 0, grayscale: 8,
    sepia: 15, opacity: 100, invert: 0
  },

  midnight: {
    brightness: 65, contrast: 140, saturation: 110,
    hueRotation: 220, blur: 0, grayscale: 0,
    sepia: 0, opacity: 100, invert: 0
  }
};

Object.keys(presets).forEach(presetsName=>{
  const presetButton = document.createElement("button")
  presetButton.classList.add('btn')
  presetButton.innerText = presetsName;
  presetContainer.appendChild(presetButton)

  presetButton.addEventListener("click", ()=>{
    const preset = presets[presetsName]

     console.log(preset);
     Object.keys(preset).forEach(filterName=>
     {
      filters[filterName].value = preset[filterName]
     }
     )
     applyFilters()
     filtersContainer.innerHTML = ""
    creatFilter()
  })
})