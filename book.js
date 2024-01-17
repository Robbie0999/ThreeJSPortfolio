// Import THREE.JS from modules.
import * as THREE from 'three';

const section = document.querySelector("section.readingGuide");

// Setting up a scene.
const scene = new THREE.Scene();

// Setting up a camera. I use the PerspectiveCamera, which is mostly used for creating 3D scenes. 
// The camera has 4 values: 'FOV' (in degrees), 'Aspect ratio' (width of element divided by height) and 'near' and 'far' (whatever is outside the values won't be rendered).
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Setting up a renderer. The size I would like to render the app is equal to the width and height of the browser window. 
// Renderer gets added to HTML-document as a canvas element.
const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio);
section.appendChild( renderer.domElement );

// Add texture loader (before creating object)
const loader = new THREE.TextureLoader()

const urls = [
  "images/RGSide.png", 
  "images/RGSpine.png",
  "images/RGTop.png",
  "images/RGBottom.png",
  "images/RGFront.png",
  "images/RGBack.png"
]

const materials = urls.map(url => {
  return new THREE.MeshLambertMaterial({
    map: loader.load(url)
  })
})

// Creating a box
// First variable is 'BoxGeomtery'; the skeleton of the object.
// Second variable is 'MeshLambertMaterial'; the look of the object for non-shiny objects.
// Thrid variable is 'Mesh'; adds the first two variables togheter.
const geometry = new THREE.BoxGeometry( 3.5, 5, 0.5 );
const cube = new THREE.Mesh( geometry, materials );

// The object will be added to the scene
scene.add( cube );

// Adding ambient lights; they light up the whole object
const ambient = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambient)

// Adding directional lights; they light up from a specific position (creates shadows)
const light = new THREE.DirectionalLight(0xFFCE5F, 1)
light.position.set(0, 0, 5)
scene.add(light)

// To make sure the object is not in the same place as the camera, I moved the position a bit.
camera.position.z = 10;

let currentTimeline = window.pageYOffset / 3000
let aimTimeline = window.pageYOffset / 3000

// Function that makes the renderer draw the scene(with object) and camera 
// everytime the browser is refreshed (loop).
// Anything that I would like to change to the object while its running has 
// to be in this function.
function animate() {
	requestAnimationFrame( animate );
  
  currentTimeline += (aimTimeline - currentTimeline) * 0.1

  const rx = currentTimeline * -0.5 + 0.5
  const ry = (currentTimeline * 0.9 + 0.1) * Math.PI * 2
  cube.rotation.set(rx, ry, 0)

	renderer.render( scene, camera );
}
animate();

window.addEventListener("scroll", function() {
  aimTimeline = window.pageYOffset / 3000
})

