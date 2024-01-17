import * as THREE from 'three';

// Setting up a scene.
const scene = new THREE.Scene();

// Setting up a camera. I use the PerspectiveCamera, which is mostly used for creating 3D scenes. 
// The camera has 4 values: 'FOV' (in degrees), 'Aspect ratio' (width of element divided by height) and 'near' and 'far' (whatever is outside the values won't be rendered).
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// The camera gets a fixed position.
// The camera gets a focus.
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

// Setting up a renderer. The size I would like to render the app is equal to the width and height of the browser window. 
// Renderer gets added to HTML-document as a canvas element.
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Creating a line
// Variable is 'LineBasicMaterial'; the look of the line.
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

// Creating an array of points.
// This is the geometry of the line. Each line is a point with its value. This makes the top of an arrow.
const points = [];
points.push( new THREE.Vector3( - 5, 0, 0 ) );
points.push( new THREE.Vector3( 0, 5, 0 ) );
points.push( new THREE.Vector3( 5, 0, 0 ) );

// This line add the points (verticles) to the THREE.JS 'BufferGeometry' element.
const geometry = new THREE.BufferGeometry().setFromPoints( points );

// A line variable is created that add the geometry and material together.
const line = new THREE.Line( geometry, material );

// Add line variable to the scene.
// Rendering of the scene and camera for displaying line.
// Because it is static, there is no animation function.
scene.add( line );
renderer.render( scene, camera );