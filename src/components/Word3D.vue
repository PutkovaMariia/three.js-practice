<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import EditField from './EditField.vue'

const inputValue = ref('')
const message = ref('Rotate Me')
const rendererContainer = ref<HTMLElement | null>(null)

let fontInstance: Font | null = null
let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let textMesh: THREE.Mesh | null = null
let controls: OrbitControls | null = null
let animationId: number

const autoRotationSpeed = 0.01

function onWindowResize() {
  if (!rendererContainer.value) return
  const width = rendererContainer.value.clientWidth
  const height = rendererContainer.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}
function updateText() {
  message.value = inputValue.value
}
function getResponsiveTextSize() {
  const width = window.innerWidth
  if (width < 500) return 0.5
  if (width < 900) return 1.2
  return 1.5
}
function createTextMesh() {
  if (!fontInstance) return
  if (textMesh) {
    scene.remove(textMesh)
    textMesh.geometry.dispose()
    if (Array.isArray(textMesh.material)) {
      textMesh.material.forEach((m) => m.dispose())
    } else {
      textMesh.material.dispose()
    }
  }
  const geometry = new TextGeometry(message.value, {
    font: fontInstance,
    size: getResponsiveTextSize(),
    height: 1,
    curveSegments: 8,
    bevelEnabled: false,
  })
  geometry.center()
  const material = new THREE.MeshNormalMaterial()
  textMesh = new THREE.Mesh(geometry, material)
  textMesh.scale.set(1, 1, 0.005)
  scene.add(textMesh)
}

onMounted(() => {
  if (!rendererContainer.value) return
  const container = rendererContainer.value
  const width = container.clientWidth
  const height = container.clientHeight

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, width / height, 1, 500)
  camera.position.set(0, 0, 10)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enablePan = false
  controls.enableZoom = true
  controls.target.set(0, 0, 0)
  controls.update()

  const loader = new FontLoader()
  loader.load(import.meta.env.BASE_URL + 'fonts/helvetiker_regular.typeface.json', (font) => {
    fontInstance = font as Font
    createTextMesh()
    animate()
  })

  function animate() {
    animationId = requestAnimationFrame(animate)
    if (textMesh) {
      textMesh.rotation.x += autoRotationSpeed
    }
    if (controls) controls.update()
    renderer.render(scene, camera)
  }

  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  renderer.dispose()
  if (textMesh) {
    textMesh.geometry.dispose()
    if (Array.isArray(textMesh.material)) {
      textMesh.material.forEach((m) => m.dispose())
    } else {
      textMesh.material.dispose()
    }
  }
  if (controls) controls.dispose()
  window.removeEventListener('resize', onWindowResize)
})

watch(message, () => {
  createTextMesh()
})
</script>

<template>
  <div ref="rendererContainer" class="three-container"></div>
  <EditField
    v-model="inputValue"
    placeholder="Edit Me"
    buttonText="Update Text"
    @submit="updateText"
  />
</template>

<style scoped lang="scss">
.three-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

:global(html),
:global(body),
:global(#app) {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
