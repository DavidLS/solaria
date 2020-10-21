
<template>
	<div class="container">
		<img 
			alt="Casa Solaria" 
			src="./assets/casa_solaria.jpg"
			style="width:15%;"
		>

		<h1>Desayunos en Casa Solaria</h1>
		

	</div>
</template>

<script>
	import store from '../store';

	export default {
		name: 'reports',
		data() {
			return {
				orders: store.state.orders,
				store:store,
			}
		},
		// mounted: function() {
		// 	this.store.getOrders();
		// },
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
