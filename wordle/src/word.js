

const words = [
  'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT',
  'AFTER', 'AGAIN', 'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT',
  'ALIEN', 'ALIGN', 'ALIKE', 'ALIVE', 'ALLEY', 'ALLOW', 'ALONE', 'ALONG',
  'ALTER', 'ANGEL', 'ANGER', 'ANGLE', 'ANGRY', 'ANIME', 'ANKLE', 'ANNEX',
  'APART', 'APPLE', 'APPLY', 'APRIL', 'APRON', 'ARENA', 'ARGUE', 'ARISE',
  'ARMOR', 'ARMY', 'AROMA', 'ARROW', 'ASSET', 'ATLAS', 'ATTIC', 'AUDIO',
  'AUDIT', 'AVOID', 'AWAKE', 'AWARD', 'AWARE', 'AWFUL', 'BADLY', 'BAKER',
  'BASIC', 'BASIS', 'BATCH', 'BEACH', 'BEARD', 'BEAST', 'BEGIN', 'BEING',
  'BELOW', 'BENCH', 'BIBLE', 'BIRTH', 'BLACK', 'BLADE', 'BLAME', 'BLAND',
  'BLANK', 'BLAST', 'BLAZE', 'BLEED', 'BLEND', 'BLESS', 'BLIND', 'BLOCK',
  'BLOOD', 'BLOOM', 'BLOWN', 'BLUES', 'BLUNT', 'BOARD', 'BOAST', 'BONUS',
  'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRAVE', 'BREAD', 'BREAK',
  'BREED', 'BRICK', 'BRIDE', 'BRIEF', 'BRING', 'BROAD', 'BROOK', 'BROWN',
];


export function getRandomWord(){
    const randomNumber = Math.floor(Math.random()*words.length);
    return words[randomNumber]
}