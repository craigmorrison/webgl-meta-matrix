import {
  WebGLRenderer,
  Color,
  Scene,
  PerspectiveCamera,
} from './three-exports';
import { Text } from 'troika-three-text';

// Set up scene
const scene = new Scene();
scene.background = new Color(0x001900);

// Set up camera
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.y = 0;
camera.position.y = 0;
camera.position.z = 20;

// Set up renderer
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Render
function renderScene(sourceCodeText) {
  const lines = sourceCodeText.split(/\r?\n/g);

  const verticalLines = lines.slice(0, 400).map((line) => {
    return line
      .split('')
      .map((char) => char + '\n')
      .join('');
  });

  // Get random number in range
  function getRandomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Line properties
  function setRenderLineProps(renderLine, index) {
    renderLine.fontSize = 1;
    renderLine.fillOpacity = getRandomNumberInRange(0.3, 1);
    renderLine.color = 0x00ff00;
    renderLine.position.x = getRandomNumberInRange(-40, 40);
    renderLine.position.z = getRandomNumberInRange(-30, 0);
  }

  // Text
  const renderLines = verticalLines.map((line, index) => {
    const renderLine = new Text();
    scene.add(renderLine);

    // Set properties to configure:
    renderLine.text = line;
    setRenderLineProps(renderLine, index);
    renderLine.position.y = getRandomNumberInRange(20, 120);

    renderLine.sync();

    return renderLine;
  });

  // Animate line paths
  const animate = function () {
    renderLines.forEach((renderLine, index) => {
      if (renderLine.position.y >= -20) {
        renderLine.position.y -= getRandomNumberInRange(0.08, 0.16);
      } else {
        setRenderLineProps(renderLine, index);
        renderLine.position.y = getRandomNumberInRange(80, 120);
      }
    });
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();
}

// Get file and render
const scriptUrl = document.querySelector('script').src;
async function getSourceCodeText() {
  const response = await fetch(scriptUrl);
  return response.text();
}
getSourceCodeText()
  .then((sourceCodeText) => renderScene(sourceCodeText))
  .catch((error) => console.error(error));
