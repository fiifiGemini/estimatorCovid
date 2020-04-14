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
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** factor;

  impact.severeCasesByRequestedTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.15
  );
  severeImpact.severeCasesByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.15
  );
  impact.hospitalBedsByrequestedTime = impact.severeCasesByRequestedTime
  * Math.trunc(data.totalhospitalBeds * 0.35);
  severeImpact.hospitalBedsByrequestedTime = severeImpact.severeCasesByRequestedTime
  * Math.trunc(data.totalhospitalBeds * 0.35);

  impact.casesForICUByRequestedTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.5
  );
  severeImpact.casesForICUByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.5
  );
  impact.casesForVentilatorsByRequestedTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.2
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.2
  );
  let period;
  if (data.periodType === 'days') {
    period = 1;
  } else if (data.periodType === 'weeks') {
    period = 7;
  } else if (data.periodType === 'months') {
    period = 30;
  }
  impact.dollarsInFlight = Math.trunc(
    (impact.infectionsByRequestedTime
    * data.avgDailyIncomePopulation
    * data.avgDailyIncomeInUSD)
    / period
  );
  severeImpact.dollarsInFlight = Math.trunc(
    (severeImpact.infectionsByRequestedTime
    * data.avgDailyIncomePopulation
    * data.avgDailyIncomeInUSD)
    / period
  );
  const output = {
    data,
    impact,
    severeImpact
  };
  return output;
};

export default covid19ImpactEstimator;
