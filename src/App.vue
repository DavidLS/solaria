
<template>
	<div id="app" class="container">
		<img 
			alt="Casa Solaria" 
			src="./assets/casa_solaria.jpg"
			style="width:15%;"
		>

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

			<b-form-group
				id="input-group-6"
				label="Fecha"
				label-for="date-1"
				description="Date"
				class="text-left p-4"
			>
				<b-form-datepicker 
					id="date-1"
					v-model="form.date" 
					:min="min" 
					:max="max" 
					locale="en"
					class="w-50"
				/>
			</b-form-group>

			<b-form-group
				id="input-group-2"
				label="Cantidad de huéspedes en la habitación"
				label-for="input-2"
				description="Number of guests in the room"
				class="text-left p-4"
			>
				<b-form-select 
					v-model="form.guests" 
					:options="guestsOptions"
					required
					placeholder="Introduzca la cantidad de huéspedes"
					class="w-50"
				/>

			</b-form-group>

			<div v-if="form.guests > 0">
				<b-card no-body>
					<b-tabs 
						card
						@input="onTabSelect"
					>
						<b-tab v-for="n in parseInt(form.guests)" :key="'product_tab_'+n" :title="'Guest '+n">
							<b-card-text>
								<b-form-group
									:key="'menu_'+n"
									label="Menú"
									label-for="input-4"
									description="Seleccione menú"
									class="text-left p-4"
								>
									<b-form-select 
										class="w-50"
										@change="onMenuChanged"
									>
										<b-form-select-option :value="null" disabled>-- Por favor seleccione una opción --</b-form-select-option>
										<b-form-select-option v-for="type in menuTypes" :key="type.id" :value=type.id>{{ type.name }}</b-form-select-option>
									</b-form-select>
								</b-form-group>

								<b-list-group
									v-if="form.selectedMenuType[tabSelected] === '0'"
								>
									<b-list-group-item>Porción de pan blanco de molde.</b-list-group-item>
									<b-list-group-item>Porción de pan integral de molde.</b-list-group-item>
									<b-list-group-item>Porción de pastelería hecha en casa.</b-list-group-item>
									<b-list-group-item>Medialuna</b-list-group-item>
									<b-list-group-item>Yogur de la casa</b-list-group-item>
									<b-list-group-item>Porción de frutas frescas.</b-list-group-item>
									<b-list-group-item>Jugo de naranja.</b-list-group-item>
									<b-list-group-item>Huevos revueltos.</b-list-group-item>
									<b-list-group-item>Mantequilla.</b-list-group-item>
									<b-list-group-item>Café.</b-list-group-item>
									<b-list-group-item>Leche</b-list-group-item>
									<b-list-group-item>Agua caliente</b-list-group-item>
									<b-list-group-item>Te</b-list-group-item>
								</b-list-group>

								<b-list-group
									v-if="form.selectedMenuType[tabSelected] == 1"
								>
									<b-list-group-item>Porción de pan blanco de molde.</b-list-group-item>
									<b-list-group-item>Porción de huevo revuelto.</b-list-group-item>
									<b-list-group-item>Mermelada</b-list-group-item>
									<b-list-group-item>Mantequilla</b-list-group-item>
									<b-list-group-item>Jugo de naranja</b-list-group-item>
									<b-list-group-item>Café</b-list-group-item>
									<b-list-group-item>Leche</b-list-group-item>
									<b-list-group-item>Jugo</b-list-group-item>
									<b-list-group-item>Agua caliente</b-list-group-item>
								</b-list-group>

								<b-table 
									v-show="form.selectedMenuType[tabSelected] == 2"
									:key="'product_'+n"
									class="table thead-dark table-striped table-bordered table-hover"
									selectable
									select-mode="multi"
									:items="products"
									:fields="fields"
									@row-selected="onRowSelected"
								>
								<template v-slot:cell(selected)="{ rowSelected }">
									<template v-if="rowSelected">
										<span aria-hidden="true">&check;</span>
										<span class="sr-only">Selected</span>
									</template>
									<template v-else>
										<span aria-hidden="true">&nbsp;</span>
										<span class="sr-only">Not selected</span>
									</template>
								</template>
								</b-table>
							</b-card-text>
						</b-tab>
					</b-tabs>
				</b-card>
			</div>

			<pre>{{ JSON.stringify(form, null, '\t') }}</pre>

			<b-button type="submit" class="btn-lg btn-success float-left m-2 p-3" variant="primary">Submit</b-button>
			<b-button type="reset" class="btn-xs float-left m-2 p-3" variant="danger">Reset</b-button>
		</b-form>
	</div>
</template>

<script>
	import store from '../store';

	export default {
		name: 'app',
		components: {
		},
		data() {

			const now = new Date();
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			const minDate = new Date(today);
			minDate.setDate(minDate.getDate());
			const maxDate = new Date(today);
			maxDate.setDate(maxDate.getDate() + 4);

			return {
				form: {
					email: '',
					name: '',
					guests: 1,
					selectedMenuType: [[]],
					selectedProducts: [[]],
					date: today,
				},
				guestsOptions: [
					{ value: 1, text: "1 Huésped" },
					{ value: 2, text: "2 Huéspedes" },
					{ value: 3, text: "3 Huéspedes" },
					{ value: 4, text: "4 Huéspedes" },
				],
				store: store,
				products: store.state.products,
				menuTypes: store.state.menuTypes,
				show: true,

				fields: ['name', 'selected'],
				tabSelected: 0,

				min: minDate,
				max: maxDate,
			}
		},
		methods: {
			onMenuChanged(value){

				// const aux = {
				// 	value: value,
				// 	label: this.menuTypes.find(value => value === this.menuTypes.id),
				// 	label2: "AAAA"
				// };
				// this.$set(this.form.selectedMenuType, this.tabSelected, aux);

				this.$set(this.form.selectedMenuType, this.tabSelected, value);
			},
			onTabSelect(tabIndex){
				this.tabSelected = tabIndex;
			},
			onRowSelected(items) {
				this.$set(this.form.selectedProducts, this.tabSelected, items);
			},
			selectAllRows() {
				this.$refs.selectableTable.selectAllRows();
			},
			clearSelected() {
				this.$refs.selectableTable.clearSelected();
			},
			onSubmit(evt) {
				evt.preventDefault();
				alert(JSON.stringify(this.form));
			},
			onReset(evt) {
				evt.preventDefault();
				this.form.email = '';
				this.form.name = '';
				this.form.guests = null;
				this.show = false;
				this.$nextTick(() => {
					this.show = true;
				})
			}
		},
		mounted: function() {
			this.store.getProducts();
			this.store.getMenuTypes();
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
