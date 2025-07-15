<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  buttonText?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
}>()

const inputValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val
  },
)

function emitUpdate() {
  emit('update:modelValue', inputValue.value)
  emit('submit')
}
</script>

<template>
  <div class="edit-field">
    <input
      v-model="inputValue"
      :placeholder="placeholder"
      class="overlay-input"
      @keyup.enter="emitUpdate"
    />
    <button class="beautiful-button" @click="emitUpdate">
      {{ buttonText }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.edit-field {
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.overlay-input {
  padding: 8px 16px;
  font-size: 1.2rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: rgba(45, 45, 64, 1);
  color: lightgrey;
  margin-right: 10px;
}

.beautiful-button {
  position: relative;
  display: inline-block;
  background: rgba(45, 45, 64, 1);
  color: white;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 18px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  animation: button-shimmer 2s infinite;
  transition: all 0.3s ease-in-out;
}

.beautiful-button:hover {
  background: rgba(45, 45, 64, 1);
  animation: button-particles 1s ease-in-out infinite;
  transform: translateY(-2px);
}

.beautiful-button:active {
  transform: scale(0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

@keyframes button-shimmer {
  0% {
    background-position: left top;
  }

  100% {
    background-position: right bottom;
  }
}

@keyframes button-particles {
  0% {
    background-position: left top;
  }

  100% {
    background-position: right bottom;
  }
}
@media (max-width: 600px) {
  .edit-field {
    width: 92vw;
    max-width: 98vw;
    left: 50%;
    transform: translateX(-50%);
    top: 10px;
    padding: 10px 6vw;
    gap: 8px;
  }
  .overlay-input {
    font-size: 1rem;
    padding: 14px 12px;
    min-width: 0;
    width: 60%;
  }
  .beautiful-button {
    font-size: 1rem;
    padding: 14px 0;
    width: 40%;
  }
}
</style>
