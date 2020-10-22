
<template>
	<div class="container">
		<img 
			alt="Casa Solaria" 
			src="./assets/casa_solaria.jpg"
			style="width:15%;"
		>

		<h1>Desayunos en Casa Solaria</h1>

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
		<div slot="emptystate">
			Loading reports
		</div>
		</vue-good-table>
			
	</div>
</template>

<script>
	import store from '../store';

	export default {
		name: 'reports',
		data() {
			return {
				orders: store.state.orders,
				table: store.state.table,
				store:store,
			}
		},
		mounted: function() {
			this.store.getOrders();
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
