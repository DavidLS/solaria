
<template>
	<div class="container">
		<img 
			alt="Casa Solaria" 
			src="./assets/casa_solaria.jpg"
			style="width:15%;"
		>

		<h1>Desayunos en Casa Solaria</h1>


		<b-form>
			<b-form-group
				id="input-group-6"
				label="Fecha"
				label-for="date-1"
				description="Date"
				class="text-left p-4"
			>
				<b-form-datepicker 
					@input="dateSelected"
					id="date-1"
					v-model="date" 
					locale="en"
					class="w-50"
					required
				/>
			</b-form-group>
		</b-form>

		<vue-good-table
			:columns="table.columns"
			:rows="table.rows"
			styleClass="vgt-table striped condensed"
			compactMode
		>
		<div slot="table-actions">
			<b-button variant="outline-primary">
				Print
			</b-button>
		</div>
		</vue-good-table>
	</div>
</template>

<script>
	import store from '../store';

	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	export default {
		name: 'reports',
		data() {
			return {
				orders: store.state.orders,
				table: store.state.table,
				store:store,
				date: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
			}
		},
		methods:{
			dateSelected: function (date) {
				this.store.getOrders(date);
			},
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
