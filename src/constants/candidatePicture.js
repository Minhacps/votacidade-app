const getPicture = (cityPath, candidateNumber) =>
  `https://minhacps.github.io/vota-tse-crawler/candidates-data/2020/pictures${cityPath}/${String(
    candidateNumber,
  ).trim()}.jpg`;

export default getPicture;
