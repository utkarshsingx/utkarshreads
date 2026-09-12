/**
 * One block of an artwork's story. A bare string is a paragraph; the object
 * forms carry the in-progress photos, numbered plans and poems a longer
 * story is built from.
 */
export type StoryBlock =
  | string
  | { image: string; alt: string }
  | { list: string[] }
  | { poem: string[] }

export type Artwork = {
  slug: string
  title: string
  image: string
  year: string
  /** Pull quote under the image on the artwork's own page, and its share description. */
  memory: string
  /** Long form, shown on the artwork's own page. */
  story: StoryBlock[]
}

const koi = "/images/art/among-the-koi"

export const artworks: Artwork[] = [
  {
    slug: "among-the-koi",
    title: "Among the Koi",
    image: `${koi}/among-the-koi-cover.jpg`,
    year: "2026",
    memory: "I exhaled the sky and learned to breathe in cobalt.",
    story: [
      "It’s the 9th of September, and it’s that time of year when it rains all day and you are home, just chilling and scrolling reels, watching some shows and playing with your pup. So it’s been that for me as well. I slept a little too late, finally waking up on my alarm, had one of those morning meetings, and then video-called friends and began the day, how my day usually starts.",
      "So this day was not an exception, but today, due to the rain, the lights were completely off. It happens in my town: when the lights go off there is, like, no network. You can’t scroll anymore or call anyone, and suddenly you are back in the Stone Age with just you and your mind to ponder.",
      "I went to my room searching for stuff I could play with my pup. There’s a wooden cupboard where I keep certain clothes I wear every day, my grooming kit (perfumes, face wash and trimmer), small gym stuff, and, in a separate section, playtoys for my pup that I had kept there a day before. Reaching into it, I saw my art supplies, which I had kept a while back when I moved back from college but hadn’t used in over a year. So what did I find?",
      "Some charcoal sticks, a pouch of different-sized erasers, different shades of pencil, and, around a corner, my colored material, which I, like, never used. I just bought it for some fancy competition I conducted back when I was my art club’s president. Before my old memories could flood me, what I found in the corner was a set of crayons I used as a kid but just carried around like a souvenir.",
      "I was always into art in general. Whatever I found that could help me make some kind of beautiful thing, I used it to make art. Looking back, I used to make architectural designs using matchsticks and candle wax, with a wedding card as the base because it was much stronger than regular paper. I used to steal candles from the pooja place, burn them, and use their wax to create a small home for myself out of matchsticks. And these used to awe me so much that using these little things I could create something visually soo big and beautiful.",
      "You know, as a child I also couldn’t distinguish between crayons and oil pastels. We used to have those drawing classes where we bought sketchbooks and were given the task of making some drawings using colored crayons. Back then I didn’t have the luxury of buying those, but I had some friends I used to borrow colors from, and since I was good at drawing, my friends were also eager to see what I would make out of it.",
      "And so I did: on an A4-sized sheet I made a flower garden with lilies, roses, sunflowers, daisies, tulips and all sorts of green grasses. The best thing out of that was the reactions I got from people when they saw it. I could tell they really liked it; my drawing teacher even showed it to the whole class, which made me happy and made me draw more and more often.",
      "Now, as an adult, picking them up, the difference was immediate. The crayons felt light and defensive; they drew boundaries. Meanwhile the wax: messy, buttery, and unapologetic. The pastels felt dense, heavy, almost willing to melt under the warmth of my fingers. It was like I wasn’t holding wax; I was holding soft, creamy paint bound into a stick, waiting for a second chance.",
      "As I looked through them, I had this feeling of wanting to witness it again, now, by adding some colored artwork to my sketchbook. So without second thoughts I offered Pyari her toy bone and made haste with oil pastels and crayons in my hand. It was the day I made my first art with oil pastels and crayons.",
      "So I gathered all my supplies and stuff: the things I usually keep around when I draw, like my pencil pouch, sketchbook, scrapers and blending tools. For blending I had those paper blenders that smudge charcoal, but I never had any for oil pastels. I knew I had fingers I could use to smudge, but I didn’t wanna mess up my fingers too much, so I got one of those cotton ear buds. I’m all set and ready to start.",
      "Turning to a new page in my sketchbook, before I began I put paper tape around the page so I could get those crisp edges after I finished. It’s one thing I learned with charcoal art, and it works like a charm. Whenever I draw, I generally make the outline first so my proportions don’t fall into shambles.",
      "For the outline I tend to be free with my hand and go with the flow, just, like, having a basic idea. It will go something like this:",
      {
        list: [
          "Okay, so the face will be the central part of this artwork, looking like a drowning person.",
          "Then in the corner I can add a flower.",
          "There will be 3-4 fishes swimming around the face of my character.",
          "Many other small lotus leaves and lily pads scattered around the scene.",
          "Finally, the swirling waves happening due to movements inside the river.",
        ],
      },
      "As I began with phase 1, I started with blue, red and skin-colored oil pastels and drew her face freely, after which I would smudge it with cotton buds and a bit of fingers :p",
      {
        image: `${koi}/01-first-strokes.jpg`,
        alt: "First strokes: the face blocked in with blue, red and skin-colored oil pastel, while the koi, lily pads and flower are still pencil outlines",
      },
      "Usually, when people see this stage, they think it looks ugly. But I like to view it like carbon being molded into a diamond.",
      "This is after my first smudge. Not the best in the world, but yes, it’s on this path.",
      {
        image: `${koi}/02-first-smudge.jpg`,
        alt: "The face after the first smudge, its colors softened, with the rest of the page still in pencil",
      },
      "And time to add more colors: I added a tint of yellow shreds to her face and colored the fishies as well.",
      {
        image: `${koi}/03-yellow-and-koi.jpg`,
        alt: "Yellow worked into the face, dark outlines around the features, and the first two koi colored orange",
      },
      "I proceeded to phase 2 and phase 3 and added more lilies and fishies. It’s looking beautiful now.",
      "Also, if you notice, I messed up at one point with the lily pads, but it happens too often in art. You mess up, but that’s not the end of the world. It’s just part of the process that makes art much more beautiful.",
      {
        image: `${koi}/04-lilies-and-koi.jpg`,
        alt: "Green lily pads, a yellow flower and more orange koi added around the face on the white page",
      },
      "On to phase 4 and adding those swirling waves. It was the fun part, drawing dashes and dots, which would be followed by much-needed smudging.",
      {
        image: `${koi}/05-wave-dashes.jpg`,
        alt: "Light and dark blue dashes drawn across the white spaces between the face, koi and lily pads",
      },
      "Okay, so after smudging it looked like this, and my hands are full blue now along with the cotton ear buds. My hands are messy now, but it was worth it. The artwork looks much more complete, we can say now.",
      {
        image: `${koi}/06-waves-smudged.jpg`,
        alt: "The wave dashes smudged into a continuous light blue pond",
      },
      "Now we can proceed to the multi-layering I talked about. This will give it more depth.",
      "Okay, so on the 2nd layer I added a darker shade of blue on our light blue swirly base layer, and also added some dark orange shades on the fishies.",
      {
        image: `${koi}/07-second-layer.jpg`,
        alt: "A second layer of darker blue swirled over the light blue water",
      },
      "On the 3rd layer I added a brown-colored layer on the waves to show more depth and contrast, and also black outlines on the fishes and petals. After this layer we can see our carbon turning into a diamond :)",
      {
        image: `${koi}/08-third-layer.jpg`,
        alt: "A third layer adding brown into the waves, with black outlines on the koi and the flower petals",
      },
      "I wanted to add more whites to our artwork to make some features pop out, but I couldn’t, as the layers kept saying no to me. So I had some poster colors and brushes lying around; at first I was skeptical whether it would work, but I gave it a try and started with the fishies’ scales, and coloring them turned out to be a verryyy good decision. So I proceeded to work on their eyes, and that really gave my fishes really good vibes. Moreover, I added whites on the lily pads and swirling waves, and also on our character’s teeth and her lip gloss.",
      {
        image: `${koi}/09-poster-color-whites.jpg`,
        alt: "White poster color on the koi stripes and eyes, the lily pads and the ripples, with the oil pastel box beside the page",
      },
      "I peeled off the paper tape carefully, getting our crisp borders, and voilà, the artwork is ready 😋",
      "Easy-peezyy",
      {
        image: `${koi}/10-tape-peeled.jpg`,
        alt: "The finished piece with the tape peeled away, leaving a clean white border around the painting",
      },
      "I’m really satisfied with how it all went down, and guess what? It’s sunset already. The lights did come back, and the clouds have cleared now.",
      "And I’m enjoying my small sunset with my new artwork in my hands, and I am loving it :)",
      "A small piece I wrote on this artwork:",
      {
        poem: [
          "I exhaled the sky",
          "and learned to breathe in cobalt.",
          "Orange koi orbit like small, wet suns,",
          "while time ripples outward,",
          "and the water forgets my name.",
        ],
      },
      "A couple of pics from my balcony: the clouds seem like orange mountains :p",
      {
        image: `${koi}/11-balcony-clouds-cropped.jpg`,
        alt: "Sunset-lit clouds glowing orange under a grey-blue sky, a rooftop edge in silhouette",
      },
      {
        image: `${koi}/12-balcony-clouds-roof.jpg`,
        alt: "Orange clouds rising behind the dark corner of a brick building with a ladder, seen from the balcony",
      },
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
