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
		database: 'invest_banc'
	});
}

// Les requetes dans la base de données
async function loadInvestments(where = "1=1", orderBy = "description") {
	const [rows, fields] = await connection.query('SELECT * FROM investments');
	return rows;
}
async function loadOneInvestment(id) {
	const investment = await connection.query('SELECT * FROM investments WHERE id =?', [id]);
	return investment[0][0];
}
async function deleteOneInvestment(id) {
	const investment = await connection.query('DELETE FROM investments WHERE id =?', [id]);
	console.log("del item", investment);
	return investment;
}
async function updateOneInvestment(id, body) {
	console.log("updateOneInvestment");
	const investment = await connection.query('UPDATE investments SET description=?, date=?, sum=? WHERE id =?', [body.description, body.date, body.sum, id])
	console.log("update item", investment);
	return investment;
}
async function addNewInvestment(newObj) {
	console.log("newObj", newObj);
	// INSERT INTO table_name(column_1, column_2, column_3) VALUES
	const newInvestment = await connection.query(`INSERT INTO investments (description, date, sum) VALUES ('${newObj.description}', '${newObj.date}', ${newObj.sum})`);
	console.log('newInvestment', newInvestment);
	return newInvestment[0];
}


async function loadEarnings() {
	const [rows, fields] = await connection.query('SELECT * FROM earnings');
	return rows;
}
async function addNewEarning(newObj) {
	console.log("newObj", newObj);
	// INSERT INTO table_name(column_1, column_2, column_3) VALUES
	const newEarning = await connection.query(`INSERT INTO earnings (description, date, sum) VALUES ('${newObj.description}', '${newObj.date}', ${newObj.sum})`);
	console.log('newEarning', newEarning);
	return newEarning[0];
}

async function loadOneEarning(id) {
	const earning = await connection.query('SELECT * FROM earnings WHERE id =?', [id])
	return earning[0][0];
}

async function updateOneEarning(id, body) {
	const earning = await connection.query(`UPDATE earnings SET description=?, date=?, sum=? WHERE id=?`, [body.description, body.date, body.sum, id]);
	console.log("earning", earning);
	return earning;
}

async function deleteOneEarning(id) {
	const earning = await connection.query('DELETE FROM earnings WHERE id=?', [id]);
	return earning;
}


//// ROUTER /////////////////////////////
//  Premier Page
app.get("/", function (req, res) {
	console.log("redirect");
	res.redirect("/investments");
});

// Les requêtes REST du backoffice VUE
// LOAD INVESTMENTS AND EARNINGS 
app.get("/investments", async function (req, res) {
	let investments = await loadInvestments();
	investments.forEach(element => {
		element.date = dayjs(element.date).format("DD/MM/YYYY");
	});
	res.send(investments);
});
app.get("/earnings", async function (req, res) {
	let earnings = await loadEarnings();
	earnings.forEach(element => {
		element.date = dayjs(element.date).format("DD/MM/YYYY");
	});
	res.send(earnings);
});

// CRUD INVESTMENTS
app.get("/investments/:id", async function (req, res) {
	let investment = await loadOneInvestment(req.params.id);
	investment.date = dayjs(investment.date).format("YYYY-MM-DD");
	console.log("GET invest", investment);
	res.send(investment);
});
app.post("/investments/0", async function (req, res) {
	if (req.body.description && req.body.date && req.body.sum) {
		let newInvestment = await addNewInvestment(req.body);
		res.send(newInvestment);
	} else {
		res.send({ message: "error" });
	}
});
app.put("/investments/:id", async function (req, res) {
	console.log("updateOneInvestment POST");
	let investment = await updateOneInvestment(req.params.id, req.body);
	console.log(req.params.id);
	console.log(req.body);
	res.send(investment);
})
app.delete("/investments/:id", async function (req, res) {
	let investment = await deleteOneInvestment(req.params.id);
	console.log(req.params.id);
	res.send(investment);
});


// CRUD EARNINGS
app.get("/earnings/:id", async function (req, res) {
	let earning = await loadOneEarning(req.params.id);
	earning.date = dayjs(earning.date).format("YYYY-MM-DD");
	console.log("GET earning", earning);
	res.send(earning);
})
app.post("/earnings/0", async function (req, res) {
	if (req.body.description && req.body.date && req.body.sum) {
		let newEarning = await addNewEarning(req.body);
		res.send(newEarning);
	} else {
		res.send({ message: "error" });
	}
});
app.put("/earnings/:id", async function (req, res) {
	let updateEarning = await updateOneEarning(req.params.id, req.body);
	res.send(updateEarning);
})
app.delete("/earnings/:id", async function (req, res) {
	let earning = await deleteOneEarning(req.params.id);
	console.log("Delete")
	res.send(earning);
})



// app.get("/office/products/:id", function (req, res) { })
// app.post("/office/products", function (req, res) { });
// app.put("/office/products/:id", function (req, res) { });
// app.delete("/office/products/:id", function (req, res) { });


app.listen(8000, async function () {
	console.log("listening on port 8000");
	await initMySQL();
});