import { Tier } from '../GameData/Hero/HeroModel';

const legendaryHeroInPremiumBoxRates = [
  0.0005, 0.003259027506, 0.01016053648, 0.02158894646, 0.05757052389, 0.07722007722, 0.1069518717, 0.176366843,
  0.2012072435, 0.2604166667, 0.2976190476, 0.3521126761, 0.4219409283, 0.4524886878, 0.5291005291, 0.5617977528,
  0.6535947712, 0.7299270073, 0.7936507937, 0.8620689655,
];

const uniqueHeroInPremiumBoxRates = [
  0.003333333333, 0.02259376412, 0.1231527094, 0.1663893511, 0.2212389381, 0.462962963, 0.4807692308, 0.641025641,
  0.8064516129, 0.8771929825,
];

const epicHeroInPremiumBoxRate = [0.01, 0.04918839154, 0.3215434084, 0.9900990099];

const userIdToOpenPremiumHeroBoxLegendaryCount = new Map();
const userIdToOpenPremiumHeroBoxUniqueCount = new Map();
const userIdToOpenPremiumHeroBoxEpicCount = new Map();
const rareHeroRate = 0.45;

// generate hero
export const generateRandomHero = (userId: string) => {
  // check if receive legendary hero
  if (!userIdToOpenPremiumHeroBoxLegendaryCount.has(userId)) {
    userIdToOpenPremiumHeroBoxLegendaryCount.set(userId, 0);
  }

  var openPremiumLegendaryCount = userIdToOpenPremiumHeroBoxLegendaryCount.get(userId);
  var rate = legendaryHeroInPremiumBoxRates[openPremiumLegendaryCount];
  const randomNumber = Math.random();
  if (randomNumber < rate) {
    return generateRandomLegendaryHero();
  }

  // increase legendary chance count by 1 if not receive legendary hero
  openPremiumLegendaryCount =
    openPremiumLegendaryCount >= legendaryHeroInPremiumBoxRates.length - 1
      ? legendaryHeroInPremiumBoxRates.length - 1
      : openPremiumLegendaryCount++;
  userIdToOpenPremiumHeroBoxLegendaryCount.set(userId, openPremiumLegendaryCount);

  // check if receive unique hero
  if (!userIdToOpenPremiumHeroBoxUniqueCount.has(userId)) {
    userIdToOpenPremiumHeroBoxUniqueCount.set(userId, 0);
  }

  var openPremiumUniqueCount = userIdToOpenPremiumHeroBoxUniqueCount.get(userId);
  rate = uniqueHeroInPremiumBoxRates[openPremiumUniqueCount];

  console.log(' generateRandomUniqueHero rate', rate);
  console.log('randomNumber', randomNumber);
  if (randomNumber < rate) {
    return generateRandomUniqueHero();
  }

  // increase unique hero chance if not receive in this time
  openPremiumUniqueCount =
    openPremiumUniqueCount >= uniqueHeroInPremiumBoxRates.length - 1
      ? uniqueHeroInPremiumBoxRates.length - 1
      : openPremiumUniqueCount++;
  userIdToOpenPremiumHeroBoxUniqueCount.set(userId, openPremiumUniqueCount);

  // check if receive epic hero
  if (!userIdToOpenPremiumHeroBoxEpicCount.has(userId)) {
    userIdToOpenPremiumHeroBoxEpicCount.set(userId, 0);
  }

  var openPremiumEpicCount = userIdToOpenPremiumHeroBoxEpicCount.get(userId);
  rate = epicHeroInPremiumBoxRate[openPremiumEpicCount];

  console.log(' generateRandomEpicHero rate', rate);
  console.log('randomNumber', randomNumber);

  if (randomNumber < rate) {
    return generateRandomEpicHero();
  }

  // increase Epic hero chance if not receive in this time
  openPremiumEpicCount =
    openPremiumEpicCount >= epicHeroInPremiumBoxRate.length - 1
      ? epicHeroInPremiumBoxRate.length - 1
      : openPremiumEpicCount++;
  userIdToOpenPremiumHeroBoxEpicCount.set(userId, openPremiumEpicCount);

  console.log(' generateRandomRareHero rate', rareHeroRate);
  console.log('randomNumber', randomNumber);
  // receive rare or normal hero
  if (randomNumber < rareHeroRate) {
    return generateRandomRareHero();
  }

  console.log(' generateRandomNormalHero rate', rareHeroRate);
  console.log('randomNumber', randomNumber);
  return generateRandomNormalHero();
};

function generateRandomLegendaryHero() {
  //Todo Generate legend hero with random id and properties
  return Tier[4];
}

function generateRandomUniqueHero() {
  return Tier[3];
}
function generateRandomEpicHero() {
  return Tier[2];
}

function generateRandomRareHero() {
  return Tier[1];
}

function generateRandomNormalHero() {
  console.log(' generateRandomNormalHero Common');
  return Tier[0];
}
