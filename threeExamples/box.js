// Import THREE.JS from modules.
import * as THREE from 'three';

// Setting up a scene.
const scene = new THREE.Scene();

// Setting up a camera. I use the PerspectiveCamera, which is mostly used for creating 3D scenes. 
// The camera has 4 values: 'FOV' (in degrees), 'Aspect ratio' (width of element divided by height) and 'near' and 'far' (whatever is outside the values won't be rendered).
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Setting up a renderer. The size I would like to render the app is equal to the width and height of the browser window. 
// Renderer gets added to HTML-document as a canvas element.
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Creating a box
// First variable is 'BoxGeomtery'; the skeleton of the object.
// Second variable is 'MeshBasicMaterial'; the look of the object (use hex-values).
// Thrid variable is 'Mesh'; adds the first two variables togheter.
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

// The object will be added to the scene
scene.add( cube );

// To make sure the object is not in the same place as the camera, I moved the position a bit.
camera.position.z = 5;

// Function that makes the renderer draw the scene(with object) and camera everytime the browser is refreshed (loop).
// Anything that I would like to change to the object while its running has to be in this function.
function animate() {
	requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();

