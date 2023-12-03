export default class Day {
    constructor(maxTempC, minTempC, maxTempF, minTempF, conditions, icon, date) {
      this.maxTempC = maxTempC;
      this.minTempC = minTempC;
      this.maxTempF = maxTempF;
      this.minTempF = minTempF;
      this.conditions = conditions;
      this.icon = icon;
      this.date = date;
    }
}