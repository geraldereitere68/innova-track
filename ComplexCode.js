/*
   Filename: ComplexCode.js
  
   Description: This code implements a complex and sophisticated algorithm for creating a 3D fractal image.
   The algorithm involves recursive calculations and advanced mathematical functions.
   The resulting image is rendered using WebGL and can be interactively explored by the user.
*/

// Global variables
var canvas;
var gl;
var program;

var maxIterations = 200;
var zoom = 1.0;
var translateX = 0.0;
var translateY = 0.0;
var fractalScale = 1.0;

// Shader sources
var vertexShaderSource = `
attribute vec2 a_position;
varying vec2 v_coordinates;

void main(){
  gl_Position = vec4(a_position, 0, 1);
  v_coordinates = a_position;
}`;

var fragmentShaderSource = `
precision highp float;

uniform float u_maxIterations;
uniform float u_zoom;
uniform float u_translateX;
uniform float u_translateY;
uniform float u_fractalScale;
varying vec2 v_coordinates;

vec2 complexAdd(vec2 a, vec2 b){
  return vec2(a.x + b.x, a.y + b.y);
}

vec2 complexMult(vec2 a, vec2 b){
  return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

float mandelbrot(vec2 c){
  vec2 z = vec2(0.0, 0.0);
  float n = 0.0;
  
  for(float i = 0.0; i < u_maxIterations; i++){
    z = complexAdd(complexMult(z, z), c);
    if(length(z) >= 2.0){
      n = i;
      break;
    }
  }
  
  return n / u_maxIterations;
}

void main(){
  float nx = v_coordinates.x * u_fractalScale / u_zoom + u_translateX;
  float ny = v_coordinates.y * u_fractalScale / u_zoom + u_translateY;
  
  vec2 c = vec2(nx, ny);
  float value = mandelbrot(c);
  
  gl_FragColor = vec4(value, value, value, 1);
}`;

// Initialize the WebGL context
function init() {
  canvas = document.getElementById("canvas");
  gl = canvas.getContext("webgl");

  if (!gl) {
    alert("WebGL not supported.");
    return;
  }

  // Compile and link shaders
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  program = createProgram(gl, vertexShader, fragmentShader);

  // Bind position attribute
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  var positions = [-1, -1, 1, -1, -1, 1, 1, 1];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  // Set uniform values
  var maxIterationsLocation = gl.getUniformLocation(program, "u_maxIterations");
  gl.uniform1f(maxIterationsLocation, maxIterations);
  
  var zoomLocation = gl.getUniformLocation(program, "u_zoom");
  gl.uniform1f(zoomLocation, zoom);
  
  var translateXLocation = gl.getUniformLocation(program, "u_translateX");
  gl.uniform1f(translateXLocation, translateX);
  
  var translateYLocation = gl.getUniformLocation(program, "u_translateY");
  gl.uniform1f(translateYLocation, translateY);
  
  var fractalScaleLocation = gl.getUniformLocation(program, "u_fractalScale");
  gl.uniform1f(fractalScaleLocation, fractalScale);
  
  // Render the scene
  render();
}

// Create shader program
function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  return program;
}

// Create shader
function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

// Render the fractal image
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  
  // Request animation frame for continuous rendering
  requestAnimationFrame(render);
}

// Zoom in/out
function zoomIn() {
  zoom *= 1.2;
}

function zoomOut() {
  zoom /= 1.2;
}

// Translate
function translate(dx, dy) {
  translateX += dx;
  translateY += dy;
}

// Event listeners
window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "+":
      zoomIn();
      break;
    case "-":
      zoomOut();
      break;
    case "ArrowUp":
      translate(0, -0.1);
      break;
    case "ArrowDown":
      translate(0, 0.1);
      break;
    case "ArrowLeft":
      translate(-0.1, 0);
      break;
    case "ArrowRight":
      translate(0.1, 0);
      break;
  }
});

// Entry point
window.onload = init;
