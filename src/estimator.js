/* eslint-disable no-tabs */
const covid19ImpactEstimator = (data) => {
	let factor;
	const time = data.timeToElapse;
	const impact = {};
	const severeImpact = {};

	if (data.periodType === 'days') {
		factor = Math.trunc(time / 3);
	} else if (data.periodType === 'weeks') {
		factor = Math.trunc((time * 7) / 3);
	} else if (data.periodType === 'months') {
		factor = Math.trunc((time * 30) / 3);
	}
	(impact as any).currentlyInfected = data.reportedCases * 10;
	(severeImpact as any).currentlyInfected = data.reportedCases * 50;
	(impact as any).infectionsByRequestedTime = (impact as any).currentlyInfected * 2 ** factor;
	(severeImpact as any).infectionsByRequestedTime =
		(severeImpact as any).currentlyInfected * 2 ** factor;

	(impact as any).severeCasesByRequestedTime = Math.trunc(
		(impact as any).infectionsByRequestedTime * 0.15
	);
	(severeImpact as any).severeCasesByRequestedTime = Math.trunc(
		(severeImpact as any).infectionsByRequestedTime * 0.15
	);
	(impact as any).hospitalBedsByrequestedTime =
		(impact as any).severeCasesByRequestedTime *
		Math.trunc(data.totalhospitalBeds * 0.35);
	(severeImpact as any).hospitalBedsByrequestedTime =
		(severeImpact as any).severeCasesByRequestedTime *
		Math.trunc(data.totalhospitalBeds * 0.35);

	(impact as any).casesForICUByRequestedTime = Math.trunc(
		(impact as any).infectionsByRequestedTime * 0.5
	);
	(severeImpact as any).casesForICUByRequestedTime = Math.trunc(
		(severeImpact as any).infectionsByRequestedTime * 0.5
	);
	(impact as any).casesForVentilatorsByRequestedTime = Math.trunc(
		(impact as any).infectionsByRequestedTime * 0.2
	);
	(severeImpact as any).casesForVentilatorsByRequestedTime = Math.trunc(
		(severeImpact as any).infectionsByRequestedTime * 0.2
	);
	let period;
	if (data.periodType === 'days') {
		period = 1;
	} else if (data.periodType === 'weeks') {
		period = 7;
	} else if (data.periodType === 'months') {
		period = 30;
	}
	(impact as any).dollarsInFlight = Math.trunc(
		((impact as any).infectionsByRequestedTime *
			data.avgDailyIncomePopulation *
			data.avgDailyIncomeInUSD) /
		period
	);
	(severeImpact as any).dollarsInFlight = Math.trunc(
		((severeImpact as any).infectionsByRequestedTime *
			data.avgDailyIncomePopulation *
			data.avgDailyIncomeInUSD) /
		period
	);
	const output = {
		data,
		impact,
		severeImpact
	};
	return output;
};

export default covid19ImpactEstimator;
