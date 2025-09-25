export const locales = ["en", "hi"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const translations = {
  en: {
    nav: {
      posts: "Posts",
      library: "Library",
      about: "About",
      archive: "Archive",
    },
    posts: {
      title: "Welcome to My Blog",
      subtitle:
        "Thoughts on technology, philosophy, books, and life. Here you'll find my latest posts and some favorites to get you started.",
      featured: "Some Favorites To Get You Started",
      allPosts: "All Posts",
      backToPosts: "Back to Posts",
      readMore: "Read more",
    },
    library: {
      title: "Library",
      subtitle:
        "Every book I've read, organized by genre and year. Click on any book to read my detailed review and thoughts.",
      filterByGenre: "Filter by Genre",
      allBooks: "All Books",
      backToLibrary: "Back to Library",
      booksAbout: "Books about",
      rating: "Rating",
    },
    about: {
      title: "About Me",
      connect: "Connect",
      skills: "Skills & Technologies",
      interests: "Interests",
      currentFocus: "Current Focus",
    },
    search: {
      placeholder: "Search by title, author, tags, or genre...",
      title: "Search posts and books",
      noResults: "No results found for",
    },
    common: {
      loading: "Loading...",
      by: "by",
      year: "Year",
      genre: "Genre",
      tags: "Tags",
    },
  },
  hi: {
    nav: {
      posts: "पोस्ट",
      library: "पुस्तकालय",
      about: "परिचय",
      archive: "संग्रह",
    },
    posts: {
      title: "मेरे ब्लॉग में आपका स्वागत है",
      subtitle: "तकनीक, दर्शन, किताबों और जीवन पर विचार। यहाँ आपको मेरी नवीनतम पोस्ट और शुरुआत के लिए कुछ पसंदीदा मिलेंगी।",
      featured: "शुरुआत के लिए कुछ पसंदीदा",
      allPosts: "सभी पोस्ट",
      backToPosts: "पोस्ट पर वापस",
      readMore: "और पढ़ें",
    },
    library: {
      title: "पुस्तकालय",
      subtitle:
        "मैंने जो भी किताबें पढ़ी हैं, वे शैली और वर्ष के अनुसार व्यवस्थित हैं। मेरी विस्तृत समीक्षा और विचार पढ़ने के लिए किसी भी किताब पर क्लिक करें।",
      filterByGenre: "शैली के अनुसार फ़िल्टर करें",
      allBooks: "सभी किताबें",
      backToLibrary: "पुस्तकालय पर वापस",
      booksAbout: "के बारे में किताबें",
      rating: "रेटिंग",
    },
    about: {
      title: "मेरे बारे में",
      connect: "संपर्क",
      skills: "कौशल और तकनीकें",
      interests: "रुचियां",
      currentFocus: "वर्तमान फोकस",
    },
    search: {
      placeholder: "शीर्षक, लेखक, टैग या शैली से खोजें...",
      title: "पोस्ट और किताबें खोजें",
      noResults: "के लिए कोई परिणाम नहीं मिला",
    },
    common: {
      loading: "लोड हो रहा है...",
      by: "द्वारा",
      year: "वर्ष",
      genre: "शैली",
      tags: "टैग",
    },
  },
} as const

export function getTranslation(locale: Locale) {
  return translations[locale] || translations[defaultLocale]
}
