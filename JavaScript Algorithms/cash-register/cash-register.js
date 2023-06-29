function checkCashRegister(price, cash, cid) {
	let conversion = {
		"ONE HUNDRED": 100,
		"TWENTY": 20,
		"TEN": 10,
		"FIVE": 5,
		"ONE": 1,
		"QUARTER": 0.25,
		"DIME": 0.1,
		"NICKEL": 0.05,
		"PENNY": 0.01,
	};
	let currency = Object.keys(conversion);
	let totalCid = 0;
	let change = [];
	let status = "";

	for (let index in cid) {
		totalCid += Math.round(cid[index][1] * 100);
	}

	totalCid = totalCid / 100;

	let totalChange = (cash * 100 - price * 100) / 100;
	let restantChange = totalChange;
	let restantCid = [];

	if (totalChange == totalCid) {
		status = "CLOSED";
	} else {
		status = "OPEN";
	}

	for (let index in currency) {
		if (conversion[currency[index]] <= restantChange) {
			let quantity = Math.floor(restantChange / conversion[currency[index]]);
			let money = conversion[currency[index]] * quantity;

			for (let i in cid) {
				if (cid[i][0] == currency[index]) {
					if (cid[i][1] < money) money = cid[i][1];
					break;
				}
			}

			if (money > 0) {
				change.push([currency[index], money]);
			} else {
				restantCid.push([currency[index], 0]);
			}

			restantChange = (Math.round(restantChange * 100) - Math.round(money * 100)) / 100;
		} else { restantCid.push([currency[index], 0]); }
	}

	if (totalChange > totalCid || restantChange > 0.01) return { status: "INSUFFICIENT_FUNDS", change: [] };
	if (status == "CLOSED") change = change.concat(restantCid.reverse());
	return { status, change };
}