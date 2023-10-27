<script setup>
//import InputLabel from './InputLabel.vue';
import TabsComponent from './ve8020/TabsComponent.vue';

/* function handleSubmit(e) {
  const formData = new FormData(e.target);
  for (let [name, value] of formData.entries()) {
    console.log(`${name}: ${value}`);
  }
} */
</script>

<template>
  <div>
    <TabsComponent />

    <!-- El resto de tu contenido, como el formulario -->
  </div>
  <!--   <form @submit.prevent="handleSubmit">
    <InputLabel>
      BPT token address:
      <Input placeholder="0x..." name="bptAddress" />
    </InputLabel>
    <InputLabel>
      VeToken Name:
      <Input placeholder="veTokenName" name="veTokenName" />
    </InputLabel>
    <InputLabel>
      VeToken Symbol:
      <Input placeholder="symbol" name="veTokenSymbol" />
    </InputLabel>
    <InputLabel>
      Distribution Start Time:
      <Input type="date" name="startTime" />
    </InputLabel>
    <InputLabel>
      Rewards Distribution Tokens:
      <Input placeholder="0x..." name="rewardTokens" />
    </InputLabel>
    <button type="submit" class="submit-button">Submit</button>
  </form> -->
</template>

<style scoped>
.submit-button {
  background-color: #384aff;
  border: 0;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  width: 100%;
  padding: 14px 16px;
}
</style>