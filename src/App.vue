
<template>
	<div id="app" class="container">
		<img alt="Vue logo" src="./assets/logo.png">

		<h1>Lista de productos</h1>

		<b-form @submit="onSubmit" @reset="onReset" v-if="show">
			<b-form-group
				id="input-group-1"
				label="Email address:"
				label-for="input-1"
				description="We'll never share your email with anyone else."
			>
			<b-form-input
				id="input-1"
				v-model="form.email"
				type="email"
				required
				placeholder="Enter email"
			/>
			</b-form-group>

			<b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
				<b-form-input
					id="input-2"
					v-model="form.name"
					required
					placeholder="Enter name"
				/>
			</b-form-group>

			<b-form-group id="input-group-3" label="Food:" label-for="input-3">
				<b-form-select
				id="input-3"
				v-model="form.food"
				:options="foods"
				required
				/>
			</b-form-group>

			<b-form-group id="input-group-4">
				<b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
					<b-form-checkbox value="me">Check me out</b-form-checkbox>
					<b-form-checkbox value="that">Check that out</b-form-checkbox>
				</b-form-checkbox-group>
			</b-form-group>

			<b-button type="submit" variant="primary">Submit</b-button>
			<b-button type="reset" variant="danger">Reset</b-button>
		</b-form>

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
				form: {
					email: '',
					name: '',
					food: null,
					checked: []
				},
				foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
				products: [],
				show: true,
			}
		},
		methods: {
			onSubmit(evt) {
				evt.preventDefault()
				alert(JSON.stringify(this.form))
			},
			onReset(evt) {
				evt.preventDefault()
				// Reset our form values
				this.form.email = ''
				this.form.name = ''
				this.form.food = null
				this.form.checked = []
				// Trick to reset/clear native browser form validation state
				this.show = false
				this.$nextTick(() => {
				this.show = true
				})
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
