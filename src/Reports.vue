
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

		<b-card
			no-body
		>
			<b-card-body>
				<b-form>
					<b-form-group
						id="input-group-6"
						label="Fecha"
						label-for="date-1"
						description="Date"
						class="py-3"
					>
						<b-form-datepicker 
							@input="dateSelected"
							id="date-1"
							v-model="date" 
							locale="en"
							required
						/>
					</b-form-group>
				</b-form>

				<data-table v-bind="bindings"/>
			</b-card-body>
		</b-card>
	</b-container>
</template>

<script>
	import store from '../store';

	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const todayString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

	export default {
		name: 'reports',
		data() {
			return {
				orders: store.state.orders,
				table: store.state.table,
				store:store,
				date: todayString,
			}
		},
		methods:{
			dateSelected: function (date) {
				this.store.getOrders(date);
			},
		},
		mounted: function() {
			this.store.getMenuTypes();
			this.store.getOrders(todayString);
		},
		computed: {
			bindings() {
				const newColumns = [];

				this.store.state.table.columns.forEach(element => {
					newColumns.push({
						key: element.field,
						title: element.label,
						sortable: false,
						searchable: false,
					});
				});

				return {
					data: this.store.state.table.rows,
					sortingMode: "multiple",
					actionMode: "disabled",
					showSearchFilter: false,
					showPagination: false,
					perPageSizes: [1000],
					showPerPage: false,
					showEntriesInfo: true,
					columns: newColumns,
				};
			},
		}
	}
</script>