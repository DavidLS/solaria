
<template>
	<b-container>
		<div class="d-flex align-items-center mb-4">
			<img 
				alt="Casa Solaria" 
				src="./assets/casa_solaria.jpg"
				style="margin-right:20px;"
				width="80px"
			>

			<h1>Desayunos en Casa Solaria</h1>
		</div>

		<div v-show="!store.state.success && !store.state.error && !store.state.loading">
			<b-form @submit="onSubmit" @reset="onReset" v-if="show">

				<b-card
					no-body
				>
					<b-card-body>
						<b-row>
							<b-col md="6">
								<b-form-group
									id="input-group-1"
									label="Número de habitación"
									label-for="input-1"
									description="Room number"
									class="py-3"
								>
									<b-form-input
										id="input-1"
										v-model="form.name"
										required
										placeholder="Introduzca su número de habitación"
									></b-form-input>
								</b-form-group>
							</b-col>
							<b-col md="6">
								<b-form-group
									id="input-group-3"
									label="E-Mail"
									label-for="input-3"
									description="Guest e-mail"
									class="py-3"
								>
									<b-form-input
										id="input-3"
										v-model="form.email"
										required
										placeholder="Introduzca su e-mail"
										type="email"
									></b-form-input>
								</b-form-group>
							</b-col>
							<b-col md="6">
								<b-form-group
									id="input-group-6"
									label="Fecha"
									label-for="date-1"
									description="Date"
									class="py-3"
								>
									<b-form-datepicker 
										id="date-1"
										v-model="form.date" 
										@input="onDateChange"
										placeholder="Seleccione una fecha"
										:min="min" 
										:max="max" 
										locale="en"
										required
									/>
								</b-form-group>
							</b-col>
							<b-col md="6">
								<b-form-group
									id="input-group-6"
									label="Hora para desayunar"
									label-for="time-1"
									description="Breakfast time"
									class="py-3"
								>
									<b-form-select 
										v-model="form.time" 
										:options="filteredTimeWindows"
									/>
								</b-form-group>
							</b-col>
							<b-col md="6">
								<b-form-group 
									label="¿Dónde quiere desayunar?"
									description="Where do you want to have breakfast?"
									class="py-3"
									label-for="radio-group-2"
								>
									<b-form-radio-group
										id="radio-group-2"
										v-model="form.where"
										name="radio-sub-component"
									>
										<b-form-radio value="room">Habitación</b-form-radio>
										<b-form-radio value="dining">Comedor</b-form-radio>
									</b-form-radio-group>
								</b-form-group>
							</b-col>
						</b-row>
					</b-card-body>

					<hr class="m-0">
					
					<b-card-body>
						<b-row
							class="p-3"
						>
							<b-col md="6">
								<div 
									class="p-3"
									style="box-shadow: 0 0 10px #DCDCDC;"
								>
									<p
										class="text-center mb-4"
									>
										Cada huesped puede personalizar su menú a su gusto
									</p>
									<p
										class="text-center small"
									>
										Every host can choose a different menu.
									</p>
								</div>
							</b-col>
							<b-col md="6">
								<b-form-group
									label="Cantidad de huéspedes en la habitación"
									label-for="guestsQty"
									description="Number of guests in the room"
									class="py-3"
								>
									<b-form-spinbutton 
										id="guestsQty"
										v-model="form.guests" 
										min="1" 
										max="4"
										style="width: 50%;"
									/>

								</b-form-group>
							</b-col>
						</b-row>

						<div v-if="form.guests > 0">
							<b-card no-body>
								<b-tabs 
									card
									@input="onTabSelect"
								>
									<b-tab v-for="n in parseInt(form.guests)" :key="'product_tab_'+n" :title="'Huesped '+n">
										<b-card-text>
											<b-form-group
												:key="'menu_'+n"
												label="Menú"
												label-for="input-4"
												description="Seleccione menú"
												class="py-3"
											>
												<b-form-select 
													@change="onMenuChanged"
													:options="menuTypes"
													required
												>
												</b-form-select>
											</b-form-group>

											<b-list-group
												v-if="form.selectedMenuType[tabSelected] && form.selectedMenuType[tabSelected].value === '0'"
											>
												<b-list-group-item>Café</b-list-group-item>
												<b-list-group-item>Leche</b-list-group-item>
												<b-list-group-item>Agua caliente</b-list-group-item>
												<b-list-group-item>Té</b-list-group-item>
												<b-list-group-item>Yogur Solaria</b-list-group-item>
												<b-list-group-item>Porción de frutas frescas</b-list-group-item>
												<b-list-group-item>Jugo de fruta</b-list-group-item>
												<b-list-group-item>Porción de pan blanco de molde Solaria</b-list-group-item>
												<b-list-group-item>Porción de pan integral de molde Solaria</b-list-group-item>
												<b-list-group-item>Huevos revueltos</b-list-group-item>
												<b-list-group-item>Mantequilla</b-list-group-item>
												<b-list-group-item>Porción de pastelería Solaria</b-list-group-item>
											</b-list-group>

											<b-list-group
												v-if="form.selectedMenuType[tabSelected] && form.selectedMenuType[tabSelected].value == 1"
											>
												<b-list-group-item>Agua caliente</b-list-group-item>
												<b-list-group-item>Café</b-list-group-item>
												<b-list-group-item>Té</b-list-group-item>
												<b-list-group-item>Leche</b-list-group-item>
												<b-list-group-item>Jugo de fruta</b-list-group-item>
												<b-list-group-item>Porción de pan blanco de molde Solaria</b-list-group-item>
												<b-list-group-item>Porción de huevo revuelto</b-list-group-item>
												<b-list-group-item>Mermelada</b-list-group-item>
												<b-list-group-item>Mantequilla</b-list-group-item>
											</b-list-group>

											<b-list-group
												v-if="form.selectedMenuType[tabSelected] && form.selectedMenuType[tabSelected].value == 4"
											>
												<b-list-group-item>3 Galletas Artesanales</b-list-group-item>
												<b-list-group-item>1 Fruta</b-list-group-item>
												<b-list-group-item>1 Leche Saborizada</b-list-group-item>
												<b-list-group-item>1 Sandwich de Jamón queso</b-list-group-item>
												<b-list-group-item>1 Muffin</b-list-group-item>
											</b-list-group>

											<b-list-group
												v-if="form.selectedMenuType[tabSelected] && form.selectedMenuType[tabSelected].value == 2"
											>
												<b-list-group-item>Agua caliente</b-list-group-item>
												<b-list-group-item>Café</b-list-group-item>
												<b-list-group-item>Té</b-list-group-item>
												<b-list-group-item>Leche</b-list-group-item>
												<b-list-group-item>Granola Solaria</b-list-group-item>
												<b-list-group-item>Porción de frutas</b-list-group-item>
												<b-list-group-item>Yogurt natural Solaria</b-list-group-item>
												<b-list-group-item>Jugo de fruta</b-list-group-item>
												<b-list-group-item>Variedad de panes Solaria</b-list-group-item>
												<b-list-group-item>Mantequilla</b-list-group-item>
												<b-list-group-item>Huevo revuelto</b-list-group-item>
												<b-list-group-item>Jamón</b-list-group-item>
												<b-list-group-item>Queso</b-list-group-item>
												<b-list-group-item>Palta molida </b-list-group-item>
												<b-list-group-item>Mermelada Solaria</b-list-group-item>
												<b-list-group-item>Porción de pastelería Solaria</b-list-group-item>
												<b-list-group-item>Medialuna Solaria</b-list-group-item>
											</b-list-group>

											<!-- <b-table 
												v-show="form.selectedMenuType[tabSelected] && form.selectedMenuType[tabSelected].value == 2"
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
											</b-table> -->
										</b-card-text>
									</b-tab>
								</b-tabs>
							</b-card>
						</div>
					</b-card-body>
					
					<hr class="m-0">

					<b-card-body class="text-right">
						<b-button type="submit" class="btn-lg btn-success" variant="primary">Enviar</b-button>
						<!-- <b-button type="reset" class="btn-xs" variant="danger">Reset</b-button> -->
					</b-card-body>
				</b-card>
			</b-form>
		</div>
		<div v-show="store.state.loading">
			<b-card
			>
				<h3>Enviando</h3> 
				Por favor espere.
			</b-card>
		</div>
		<div v-show="store.state.success">
			<b-card
			>
				<h3>¡Muchas gracias!</h3>
				Desayuno pedido.
			</b-card>
		</div>
		<div v-show="store.state.error">
			<h2>We couldn't submit the order. Please try again later</h2>
		</div>
	</b-container>
</template>

<script>
	import store from '../store';

	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const todayString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
	const minDate = new Date(today);
	minDate.setDate(minDate.getDate());
	const maxDate = new Date(today);
	maxDate.setDate(maxDate.getDate() + 2);

	export default {
		name: 'home',
		data() {
			return {
				form: {
					email: '',
					name: '',
					guests: 1,
					selectedMenuType: [[]],
					//selectedProducts: [[]],
					//date: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
					date: null,
					time: null,
					where: "room",
				},
				store: store,
				//products: store.state.products,
				menuTypes: store.state.menuTypes,
				orders: store.state.orders,
				show: true,
				fields: [
					{
						key: 'name',
						label: 'Producto',
						sortable: false
					},
					{
						key: 'selected',
						label: 'Seleccione',
						sortable: false,
						tdClass:["text-center"],
						thClass:["text-center"],
					},
				],
				
				tabSelected: 0,

				success: store.state.success,
				error: store.state.error,
				loading: store.state.loading,

				min: minDate,
				max: maxDate,
			}
		},
		methods: {
			onDateChange(date){
				this.store.getOrders(date);
			},
			onMenuChanged(value){
				const values = this.menuTypes.map(function(o) { return o.value });
				const index = values.indexOf(value);
				let text = "";
				if(index != -1){
					text = this.menuTypes[index].text;
				}

				const aux = {
					value: value,
					text: text,
				};
				this.$set(this.form.selectedMenuType, this.tabSelected, aux);
			},
			onTabSelect(tabIndex){
				this.tabSelected = tabIndex;
			},
			// onRowSelected(items) {
			// 	this.$set(this.form.selectedProducts, this.tabSelected, items);
			// },
			// selectAllRows() {
			// 	this.$refs.selectableTable.selectAllRows();
			// },
			// clearSelected() {
			// 	this.$refs.selectableTable.clearSelected();
			// },
			onSubmit(event) {
				event.preventDefault();

				const rawSelectedMenuType = this.form.selectedMenuType;
				let selectedMenuType = [];
				rawSelectedMenuType.forEach(menuTypeRaw => {
					const index = selectedMenuType.findIndex(function(item) {
						return item.id === menuTypeRaw.value;
					});

					if(index !== -1){
						selectedMenuType[index].qty++;
					}else{
						const menuType = {
							id: menuTypeRaw.value,
							name: menuTypeRaw.text,
							qty: 1,
						};
						selectedMenuType.push(menuType);
					}
				});

				// const rawSelectedProducts = this.form.selectedProducts;
				// let selectedProducts = [];
				// rawSelectedProducts.forEach(productsRaw => {
					
				// 	productsRaw.forEach(guest => {
				// 		const index = selectedProducts.findIndex(function(item) {
				// 			return item.id === guest.id;
				// 		});
	
				// 		if(index !== -1){
				// 			selectedProducts[index].qty++;
				// 		}else{
				// 			const product = {
				// 				id: guest.id,
				// 				name: guest.name,
				// 				qty: 1,
				// 			};
				// 			selectedProducts.push(product);
				// 		}
				// 	});
				// });

				const order = {
					email: this.form.email,
					name: this.form.name,
					guests: this.form.guests,
					selectedMenuType: selectedMenuType,
					//selectedProducts: selectedProducts,
					time: this.form.time,
					date: this.form.date,
					where: this.form.where,
				}
				this.store.setOrder(order);
			},
			onReset(event) {
				event.preventDefault();
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
			//this.store.getProducts();
			this.store.getMenuTypes();
		},
		computed:{
			filteredTimeWindows: function () {
				const orders = store.state.orders;

				let choicesRaw = [
					{ value: null, text: 'Seleccione un horario', count: 2},
					{ value: '08:00', text: '08:00', count: 2 },
					{ value: '08:30', text: '08:30', count: 2 },
					{ value: '09:00', text: '09:00', count: 2 },
					{ value: '09:30', text: '09:30', count: 2 },
					{ value: '10:00', text: '10:00', count: 2 },
					{ value: '10:30', text: '10:30', count: 2 },
					{ value: '11:00', text: '11:00', count: 2 },
				];

				orders.forEach(order => {
					let key = choicesRaw.findIndex(function(choice, index) {
						if(choice.value == order.time)
							return true;
					});

					if(key > 0){
						choicesRaw[key].count--;
					}

				});

				let choices = [];
				choicesRaw.forEach(choice => {
					if(choice.count > 0){
						choices.push(choice);
					}
				});

				return choices;
			}
		}
	}
</script>