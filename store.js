import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.VUE_APP_ENV_VARIABLE,
	authDomain: "solaria-69e24.firebaseapp.com",
	databaseURL: "https://solaria-69e24.firebaseio.com",
	projectId: "solaria-69e24",
	storageBucket: "solaria-69e24.appspot.com",
	messagingSenderId: "800252403030",
	appId: "1:800252403030:web:3ba62953ff730152350af7"
  };

firebase.initializeApp(firebaseConfig);

let store = {
	debug: true,
	state: {
		products: [],
		menuTypes: [],
		orders: [],
		success: false,
		error: false,
		loading: false,
		table: {columns: [], rows: []},
	},

	setProductsAction(products){
		this.state.products.splice(0,this.state.products.length);
		products.forEach(element => {
			this.state.products.push(element);
		});
	},
	getProducts(){
		var storeAux = this;
		firebase.firestore().collection('products').orderBy("name").get()
			.then(snapshot => {
				let products = [];
				snapshot.forEach(doc => {
					let item = doc.data()
					item.id = doc.id
					products.push(item)
				});
				products.sort( (a, b) => parseInt(a.id) > parseInt(b.id) )
				storeAux.setProductsAction(products);
			})
	},
	setMenuTypesAction(types){
		this.state.menuTypes.splice(0,this.state.menuTypes.length);
		types.forEach(element => {
			this.state.menuTypes.push(element);
		});
	},
	getMenuTypes(){
		var storeAux = this;
		firebase.firestore().collection('types').get()
			.then(snapshot => {
				let types = [];
				snapshot.forEach(doc => {
					let item = doc.data()
					item.id = doc.id
					types.push(item)
				});
				types.sort( (a, b) => parseInt(a.id) > parseInt(b.id) );

				types.unshift({disabled: true, value: null, text:"-- Por favor seleccione una opción --"});
				storeAux.setMenuTypesAction(types);
			})
	},
	setOrder(order){
		const storeAux = this;
		storeAux.state.loading = true;
		firebase.firestore().collection('orders').add(
			order
		)
			.then(function() {
				storeAux.state.success = true;
				storeAux.state.loading = false;
				setTimeout(function () { window.location.reload(); }, 10000);
			})
			.catch(function(error) {
				storeAux.state.error = true;
				storeAux.state.loading = false;
				storeAux.state.errorObj = error;
			});
	},
	getOrders(date){
		var storeAux = this;
		firebase.firestore().collection('orders').where("date", "==", date)
		.get()
		.then(function(snapshot) {

			let orders = [];
			snapshot.forEach(doc => {
				let item = doc.data()
				item.id = doc.id
				orders.push(item)
			});

			storeAux.setOrdersAction(orders);
		})
		.catch(function(error) {
			// eslint-disable-next-line
			console.log("Error getting documents: ", error);
		});
	},
	setOrdersAction(orders){
		this.state.orders.splice(0, this.state.orders.length);
		this.state.table.rows.splice(0, this.state.table.rows.length);
		this.state.table.columns.splice(0, this.state.table.columns.length);

		orders.forEach(element => {
			this.state.orders.push(element);
		});
		this.processOrdersAction();
	},
	processOrdersAction(){
		var storeAux = this;

		let columns=[
			{
				label: 'Horario',
				field: 'time',
				id: "horario",
				sortable: true,
			},
			{
				label: 'Habitación',
				field: 'room',
				id: "habitacion",
				sortable: true,
			},
			{
				label: 'Huespedes',
				field: 'guests',
				id: "huespedes",
				sortable: false,
			},
		];

		storeAux.state.menuTypes.forEach(element => {
			if(element.value){
				columns.push({
					label: element.text,
					field: slugify(element.text),
					id: {
						id: element.value,
						type: "menuType"
					},
				});
			}
		});

		let rows = [];
		
		const rawOrders = storeAux.state.orders;
		const products = [];
		
		let counter = 1;
		rawOrders.forEach(order => {
	
			let row = {
				time: order.time,
				id: counter,
				email: order.email,
				room: order.name,
				guests: order.guests,
			}
			counter++;

			order.selectedProducts.forEach(productRaw => {
				const productInColumn = products.findIndex(function(item) {
					return item.id === productRaw.id;
				});
	
				if(productInColumn === -1){
					const product = {
						id: {
							id: productRaw.id,
							type: "product",
						},
						label: productRaw.name,
						field: slugify(productRaw.name),
					};
					products.push(product);
				}

				const slug = slugify(productRaw.name);
				row[slug]= productRaw.qty;
			});

			order.selectedMenuType.forEach(menuType => {
				const slug = slugify(menuType.name);
				row[slug]= menuType.qty;
			})

			rows.push(row);
		});

		//columns
		storeAux.state.table.columns.splice(0, storeAux.state.table.columns);
		columns.forEach(element => {
			storeAux.state.table.columns.push(element);
		});
		products.forEach(element => {
			storeAux.state.table.columns.push(element);
		});

		//rows
		function compareRows(a, b) {
			if (parseInt(a.time) < parseInt(b.time) || !b.time)
				return -1;
			if (parseInt(a.time) > parseInt(b.time))
				return 1;
			return 0;
		}
		rows.sort(compareRows);

		storeAux.state.table.rows.splice(0, storeAux.state.table.rows);
		rows.forEach(element => {
			storeAux.state.table.rows.push(element);
		});

	},
}

function slugify(text) {
	const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;"
	const to = "aaaaaeeeeeiiiiooooouuuunc------"

	const newText = text.split('').map(
		(letter, i) => letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)))

	return newText
		.toString()                     // Cast to string
		.toLowerCase()                  // Convert the string to lowercase letters
		.trim()                         // Remove whitespace from both sides of a string
		// eslint-disable-next-line
		.replace(/\s+/g, '-')           // Replace spaces with -
		// eslint-disable-next-line
		.replace(/&/g, '-y-')           // Replace & with 'and'
		// eslint-disable-next-line
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		// eslint-disable-next-line
		.replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

export default store;