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
		loading: true,
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
			})
			.catch(function(error) {
				storeAux.state.error = true;
				storeAux.state.loading = false;
				storeAux.state.errorObj = error;
			});
	},
	getOrders(date="2020-10-21"){
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
		orders.forEach(element => {
			this.state.orders.push(element);
		});
		this.processOrdersAction();
	},
	processOrdersAction(){
		var storeAux = this;
		let columns=[
			{
				label: 'Habitación',
				field: 'room',
				id: -1,
			},
			{
				label: 'Huespedes',
				field: 'guests',
				id: -1,
			},
			{
				label: 'Continental',
				field: 'continental',
				id: 0,
			},
			{
				label: 'Americano',
				field: 'americano',
				id: 1,
			},
			{
				label: 'Solaria',
				field: 'solaria',
				id: 3,
			},
		]

		const products = [];
		const rawOrders = this.state.orders;
		rawOrders.forEach(order => {

			order.selectedProducts.forEach(productRaw => {
				const productInColumn = products.findIndex(function(item) {
					return item.id === productRaw.id;
				});
	
				if(productInColumn === -1){
					const product = {
						id: productRaw.id,
						label: productRaw.name,
						field: slugify(productRaw.name),
					};
					products.push(product);
				}
			});
		});

		columns.forEach(element => {
			storeAux.state.table.columns.push(element);
		});
		products.forEach(element => {
			storeAux.state.table.columns.push(element);
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
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/&/g, '-y-')           // Replace & with 'and'
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

export default store;