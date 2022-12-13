<template>
  <div>
    <p>Code Snippet Output:</p>
    <pre>{{ output }}</pre>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import snippet from './code/sdk-spot-price';

export default {
  setup() {
    const output = ref('');
    // const test = snippet();

    // Run the code snippet and store the output in the output variable
    onMounted(async () => {
      output.value = await snippet();
    });

    return { output };
  },
};
</script>