export type Artwork = {
  slug: string
  title: string
  image: string
  year: string
  medium: string
  /** Short line revealed when you hover the tile in the grid. */
  memory: string
  /** Long form, shown on the artwork's own page. */
  story: string[]
}

export const artworks: Artwork[] = [
  {
    slug: "half-light",
    title: "Half-Light",
    image:
      "https://res.cloudinary.com/dawxgroba/image/upload/v1786331040/624098996_18141474193472213_7796658356149480653_n_cbstok.jpg",
    year: "2023",
    medium: "Graphite and ink on toned grey paper",
    memory: "I stopped before it was finished. The light kept eating her.",
    story: [
      "A figure in a messy bun and a shirt three sizes too big, standing in that particular way you stand when you are not posing for anyone.",
      "Half of her is rendered — the hair, the folds of the sleeve, the belt, the pockets. The other half has been eaten by a band of white running straight down her front. That was not a mistake. Toned paper lets you draw with an eraser, and once I pulled that highlight through her, finishing the rest felt like arguing with it.",
      "So it stays unfinished on the right. It reads as light. It also reads as someone half-there, which is closer to what I wanted anyway.",
    ],
  },
  {
    slug: "dandelion",
    title: "Dandelion",
    image:
      "https://res.cloudinary.com/dawxgroba/image/upload/v1786331040/618921212_18058821260655650_8145429875105098442_n_esyve4.jpg",
    year: "2022",
    medium: "Graphite with coloured pencil on cartridge paper",
    memory: "One orange pencil. That was the entire colour budget.",
    story: [
      "Almost all graphite, and then a single warm orange pencil dragged through the hair, along the jaw, across the lip. Nothing else in the drawing is coloured.",
      "It is a cheap trick and it works every time: the eye goes straight to the warmth because there is nowhere else for it to go. The rest of the piece can stay quiet.",
      "The dandelion in the bottom left came last, mostly because the empty corner was bothering me. It ended up being the part people ask about.",
    ],
  },
  {
    slug: "butterfly-hashira",
    title: "Butterfly Hashira",
    image:
      "https://res.cloudinary.com/dawxgroba/image/upload/v1786331041/649862991_18037290176768300_8370676747098605632_n_sasj8t.webp",
    year: "2023",
    medium: "0.5mm mechanical pencil on toned paper",
    memory: "Every butterfly is its own tiny drawing. There are more than thirty.",
    story: [
      "Shinobu Kocho, mid-turn, with her haori opening into wings behind her.",
      "The butterflies were the whole job. Each one has a full wing pattern, and they had to get smaller and looser as they moved out from her so the eye would read depth instead of clutter. Drawing the same shape thirty times at shrinking scale is a strange kind of meditation — by the twentieth one your hand knows it better than you do.",
      "Shot in afternoon sun with jasmine from the balcony sitting on the corner of the page. The flowers were not planned. They were just there, and they smelled like the room I drew this in.",
    ],
  },
  {
    slug: "iris",
    title: "Iris",
    image:
      "https://res.cloudinary.com/dawxgroba/image/upload/v1786331041/651596362_18092879897084455_8711306822846071759_n_kbcyku.jpg",
    year: "2021",
    medium: "Graphite on smooth paper",
    memory: "The white in an eye is never white. That was the lesson.",
    story: [
      "The drawing that taught me value. Not shape, not proportion — value.",
      "Everything convincing in an eye lives in the contrast: the darkest dark is the pupil, the brightest bright is one small catchlight, and every other tone has to be squeezed carefully in between. The sclera looks white until you put an actual white next to it and realise it is a mid grey with a shadow arcing over the top of it.",
      "The lashes are drawn as flicks from root to tip, fast, so they taper on their own. Slow down and they turn into wire.",
    ],
  },
  {
    slug: "crows-and-silence",
    title: "Crows and Silence",
    image:
      "https://res.cloudinary.com/dawxgroba/image/upload/v1786331041/652685154_18110379130704127_1898351548998042044_n_zkzlcd.webp",
    year: "2023",
    medium: "0.5mm mechanical pencil on A4",
    memory: "Finger to the lips. The loudest quiet gesture in anime.",
    story: [
      "Itachi, with crows breaking out of the frame behind him and a Sharingan sitting above his head like a sun.",
      "The composition is built on radiating lines — everything points outward from the centre of his forehead, so the eye keeps returning there no matter where it wanders. The clouds along the bottom are the only curves in the piece; without them the whole thing would feel like a spike.",
      "It is a character built entirely on withheld information, so the finger over the mouth was the only pose worth drawing.",
    ],
  },
  {
    slug: "grain",
    title: "Grain",
    image:
      "https://res.cloudinary.com/dawxgroba/image/upload/v1786331041/651175483_18105759796860698_5494982387955650673_n_ukunmt.jpg",
    year: "2021",
    medium: "Graphite and blending stump on smooth paper",
    memory: "Drawn mostly by taking graphite away, not putting it down.",
    story: [
      "Lips, close enough that they stop being lips and turn into terrain.",
      "The method was backwards from how it looks. I laid down a flat mid-grey over the whole shape with a stump, then cut every crease out of it with a sharpened eraser, then went back in with pencil to deepen the darks. All those pale cracks are erased, not drawn.",
      "Once you are working at this scale you are not drawing a mouth any more. You are drawing dry skin, and light sitting in the bottom of a groove, and the small wet line where the two halves meet.",
    ],
  },
  {
    slug: "pain",
    title: "Pain",
    image:
      "https://res.cloudinary.com/dawxgroba/image/upload/v1786331044/657344142_18311354329285958_5391800548972526953_n_zqohrt.webp",
    year: "2022",
    medium: "Graphite in a sketchbook",
    memory: "A sketchbook page, done in one sitting, never redrawn.",
    story: [
      "Straight into the sketchbook — no transfer, no grid, no second attempt.",
      "The hair is the giveaway that this was fast: sharp flat planes, hard edges, no rendering inside the shapes. It works because the face underneath is the opposite — soft gradients, the rippled rings in the eyes, the small shadows under the piercings.",
      "The floating debris in the background is doing all the storytelling. Remove it and he is just a man scowling. Leave it and the ground is coming apart around him.",
    ],
  },
  {
    slug: "kalpana",
    title: "Kalpana",
    image:
      "https://res.cloudinary.com/dawxgroba/image/upload/v1786331043/656232602_18582718924041886_3110195844356389176_n_c2ounz.webp",
    year: "2021",
    medium: "Graphite on paper",
    memory: "\"If you want to do something, what does it matter where you are ranked?\"",
    story: [
      "Kalpana Chawla in the flight suit, flag behind her, mission patch on the chest.",
      "Portraits of real people are unforgiving in a way that stylised faces are not. You can miss by two millimetres on the corner of a mouth and the whole likeness collapses, and the only fix is to erase and go again. The smile here took more attempts than the entire spacesuit did.",
      "I wrote her line under the drawing because that was the point of drawing it. It is a good sentence to have on a wall on the days the work is not going anywhere.",
    ],
  },
  {
    slug: "crosses",
    title: "Crosses",
    image:
      "https://res.cloudinary.com/dawxgroba/image/upload/v1786331040/583893491_18047501765693520_3312303426686389351_n_o8geyh.webp",
    year: "2022",
    medium: "Graphite and charcoal on paper",
    memory: "The darkest thing I have drawn, and the fastest.",
    story: [
      "Heavy black bangs, loose strands falling across the face, small crosses marked under the eyes and on the cheek, one hand up under the chin.",
      "The whole page is pushed dark. There is no white left anywhere — even the background is a worked grey — so the only light in the piece is on her face and knuckles, and it has to carry everything.",
      "The strands crossing over her eyes were laid in last, in single unbroken pulls. Drawing over a finished face after hours of work is a small act of nerve. It is also the only reason the piece has any tension in it.",
    ],
  },
  {
    slug: "first-digital-eye",
    title: "First Digital Eye",
    image:
      "https://res.cloudinary.com/dawxgroba/image/upload/v1786331043/681343023_18066868943693520_8447329337217888576_n_l3s4km.jpg",
    year: "2024",
    medium: "Digital painting",
    memory: "Thirty years of graphite habits, unlearned in one file.",
    story: [
      "The first time the eye study got made in colour, on a screen.",
      "Everything I knew from pencil had to be re-earned. Skin is not one colour — there is red pooling in the waterline, cool grey in the whites, gold and green fighting inside the same iris. Graphite lets you ignore all of that. Paint does not.",
      "The lashes are the one place the old habit transferred cleanly: still single tapering strokes, still drawn root to tip, still fast. Some things do not change when you swap the tool.",
    ],
  },
]

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((artwork) => artwork.slug === slug)
}

export function getAdjacentArtworks(slug: string) {
  const index = artworks.findIndex((artwork) => artwork.slug === slug)
  if (index === -1) return { previous: undefined, next: undefined }
  return {
    previous: index > 0 ? artworks[index - 1] : undefined,
    next: index < artworks.length - 1 ? artworks[index + 1] : undefined,
  }
}
