<template>
  <div id="test">
    {{ message }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'hello world',
    }
  }
}
</script>

<style>
  #test {
    background: transparent;
  }
</style>
