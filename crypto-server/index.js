const fs = require("fs");
const express = require("express");
const app = express();
const eta = require("eta");
const bodyParser = require('body-parser');
const dayjs = require('dayjs')
const mysql = require('mysql2/promise');

app.engine("eta", eta.renderFile);
eta.configure({
	views: "./views",
	cache: false
});

app.set("views", "./views");
app.set("view cache", false);
app.set("view engine", "eta");
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json())
const cors = require('cors');
const { log } = require("console");
app.use(cors())

let connection;
async function initMySQL() {
	connection = await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'crypto_banc'
	});
}

// Les requetes dans la base de données
async function loadInvestments(where = "1=1", orderBy = "description") {
	const [rows, fields] = await connection.query('SELECT * FROM investments');
	return rows;
}
async function loadEarnings() {
	const [rows, fields] = await connection.query('SELECT * FROM earnings');
	return rows;
}

async function loadOneInvestment(id) {
	const investment = await connection.query('SELECT * FROM investments WHERE id =?', [id]);
	console.log('investment', investment);
	return investment[0];
}

async function loadProduct(id) { }
async function addProduct(product) { }
async function updateProduct(id, product) { }
async function removeProduct(id) { }

// Premier Page
app.get("/", function (req, res) {
	res.redirect("/office/investments");
});

// GET Investments
// app.get("/investments", async function (req, res) {
// 	let investments = await loadInvestments();
// 	let investmentSum = 0;
// 
// 	for (let i = 0; i < investments.length; i++) {
// 		investmentSum = investmentSum + investments[i].sum;
// 	}
// 
// 	res.render('investmentsList.eta', {
// 		investments, investmentSum
// 	});
// });

app.get("/details/:id", async function (req, res) { });

// Les requêtes REST du backoffice VUE
app.get("/office/investments", async function (req, res) {
	let investments = await loadInvestments();

	investments.forEach(element => {
		element.date = dayjs(element.date).format("DD/MM/YYYY");
	});

	res.send(investments);
});
app.get("/office/earnings", async function (req, res) {
	let earnings = await loadEarnings();

	earnings.forEach(element => {
		element.date = dayjs(element.date).format("DD/MM/YYYY");
	});

	res.send(earnings);
});

app.get("/office/investments/:id", async function (req, res) {
	let investment = await loadOneInvestment(req.params.id);

	investment.date = dayjs(investment.date).format("DD/MM/YYYY")
	res.send(investment);
});




app.get("/office/products/:id", function (req, res) { })
app.post("/office/products", function (req, res) { });
app.put("/office/products/:id", function (req, res) { });
app.delete("/office/products/:id", function (req, res) { });


app.listen(8000, async function () {
	console.log("listening on port 8000");
	await initMySQL();
});