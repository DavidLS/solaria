
<template>
	<div id="app" class="container">
		<img alt="Vue logo" src="./assets/logo.png">
		<Test msg="Welcome to Your Vue.js App"/>

		<h1>Lista de productos</h1>
		<table id="product-list" class="table thead-dark table-striped table-bordered table-hover">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Name</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="product in products" :key="product.id">
					<th scope="row">{{ product.id }}</th>
					<td>{{ product.name }}</td>
				</tr>
			</tbody>
		</table>
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
				this.products.sort( (a, b) => parseInt(a.id) > parseInt(b.id) )
				console.log(this.products)
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
