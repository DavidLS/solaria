
<template>
	<div id="app" class="container">
		<img alt="Vue logo" src="./assets/logo.png">

		<h1>Desayunos en Casa Solaria</h1>

		<b-form @submit="onSubmit" @reset="onReset" v-if="show">

			<b-form-group
				id="input-group-1"
				label="Número de habitación"
				label-for="input-1"
				description="Room number"
				class="text-left p-4"
			>
				<b-form-input
					id="input-1"
					v-model="form.name"
					required
					placeholder="Introduzca su número de habitación"
					class="w-50"
				></b-form-input>
			</b-form-group>

			<b-form-group
				id="input-group-2"
				label="Cantidad de huéspedes en la habitación"
				label-for="input-2"
				description="Number of guests in the room"
				class="text-left p-4"
			>
				<b-form-input
					id="input-2"
					v-model="form.guests"
					required
					placeholder="Introduzca la cantidad de huéspedes"
					class="w-50"
					type="number"
					min="0"
					max="4"
				></b-form-input>
			</b-form-group>

			<b-form-group
				id="input-group-3"
				label="E-Mail"
				label-for="input-3"
				description="Guest e-mail"
				class="text-left p-4"
			>
				<b-form-input
					id="input-3"
					v-model="form.email"
					required
					placeholder="Introduzca su e-mail"
					class="w-50"
					type="email"
				></b-form-input>
			</b-form-group>

			<b-button type="submit" class="btn-lg float-left m-2 p-3" variant="primary">Submit</b-button>
			<b-button type="reset" class="btn-xs float-left m-2 p-3" variant="danger">Reset</b-button>
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
					guests: null,
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
				this.form.guests = null
				this.form.food = null
				this.form.checked = []
				// Trick to reset/clear native browser form validation state
				this.show = false
				this.$nextTick(() => {
				this.show = true
				})
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
			})
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
