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

	setOrder(form){
		const storeAux = this;
		console.log("form");
		console.log(form);
	}


}

export default store;