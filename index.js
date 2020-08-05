const cors = require("cors");
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(cors());
const jsonParser = bodyParser.json();

app.get("/test", (req, res) => {
	res.json({ ok: true });
	return;
});

app.listen(port, () => {
	console.log("Listening to port ", port);
});

app.post("/encrypt", jsonParser, (req, res) => {
	const { vueltas, mensaje } = req.body;
	let mensajearr = mensaje.split("");
	let encodedMesaje = [];

	let position = 0;
	while (mensajearr.length > 0) {
		let subArr = [];
		for (let i = 0; i < vueltas; i++) {
			let elem = mensajearr[0];
			subArr.push(elem ? elem : " ");
			mensajearr.shift();
		}
		encodedMesaje[position] = subArr;
		position++;
	}
	let finalMessage = [];
	for (let i = 0; i < encodedMesaje[0].length; i++) {
		finalMessage.push([]);
		for (let j = 0; j < vueltas; j++) {
			finalMessage[i].push("");
		}
	}
	let finalMensaje2 = "";
	for (let i = 0; i < encodedMesaje.length; i++) {
		for (let j = 0; j < encodedMesaje[i].length; j++) {
			let elem = encodedMesaje[i][j];
			finalMessage[j][i] = elem;
		}
	}
	for (let i = 0; i < finalMessage.length; i++) {
		for (let j = 0; j < finalMessage[i].length; j++) {
			let elem = finalMessage[i][j];
			finalMensaje2 += elem;
		}
	}

	res.json({ mensaje: finalMensaje2 });
});

app.post("/decrypt", jsonParser, (req, res) => {
	const { vueltas, mensaje } = req.body;
	let mensajearr = mensaje.split("");
	let encodedMesaje = [];
	let newVueltas = Math.round(mensajearr.length / vueltas);

	let position = 0;
	while (mensajearr.length > 0) {
		let subArr = [];
		for (let i = 0; i < newVueltas; i++) {
			let elem = mensajearr[0];
			elem ? subArr.push(elem) : null;
			mensajearr.shift();
		}
		encodedMesaje[position] = subArr;
		position++;
	}

	let finalMessage = [];

	for (let i = 0; i < newVueltas; i++) {
		finalMessage.push([]);
		for (let j = 0; j < vueltas; j++) {
			finalMessage[i].push("");
		}
	}
	let finalMensaje2 = "";
	for (let i = 0; i < encodedMesaje.length; i++) {
		for (let j = 0; j < encodedMesaje[i].length; j++) {
			let elem = encodedMesaje[i][j];
			finalMessage[j][i] = elem;
		}
	}
	for (let i = 0; i < finalMessage.length; i++) {
		for (let j = 0; j < finalMessage[i].length; j++) {
			let elem = finalMessage[i][j];

			finalMensaje2 += elem;
		}
	}
	res.json({ finalMensaje2 });
});
