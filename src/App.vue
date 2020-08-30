
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Test msg="Welcome to Your Vue.js App"/>
	
		{{products}}
  </div>
</template>

<script>
	import Test from './components/Test.vue'
	import { db } from '../fire';

	export default {
		name: 'app',
		components: {
			Test
		},
		data() {
			return {
				products: []
			}
		},
		created: function() {
			db.collection('products').get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					let item = doc.data()
					item.id = doc.id
					this.products.push(item)
				})
			})
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
