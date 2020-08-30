
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Test msg="Welcome to Your Vue.js App"/>
	
		{{products}}
  </div>
</template>

<script>
	import Test from './components/Test.vue'
	import db from "../fire.js";

	let productsRef = db.ref("products");

	export default {
		name: 'app',
		components: {
			Test
		},
		data() {
			return {
				products: [],
			}
		},
		firebase: {
			products: productsRef
		},
	}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
