# 🎵 Song Promotion Kit Generator

![GitHub](https://img.shields.io/github/license/jpapad/song-promotion-kit-generator)
![Stars](https://img.shields.io/github/stars/jpapad/song-promotion-kit-generator)
![GitHub last commit](https://img.shields.io/github/last-commit/jpapad/song-promotion-kit-generator)

<p align="center">
  <img src="https://raw.githubusercontent.com/jpapad/song-promotion-kit-generator/main/public/app-preview.png" alt="Song Promotion Kit Generator" width="600">
</p>

Μια React εφαρμογή που δημιουργεί αυτόματα περιεχόμενο για την προώθηση ενός τραγουδιού, βασισμένη σε πληροφορίες που παρέχει ο χρήστης.

## ✨ Λειτουργίες

- 📝 Φόρμα εισαγωγής δεδομένων για το τραγούδι (τίτλος, καλλιτέχνης, περιγραφή, μουσικό είδος)
- 🤖 Υποστήριξη δύο AI APIs (OpenAI & Hugging Face)
- 🌗 Light & Dark mode
- 📊 Αυτόματη δημιουργία περιεχομένου:
  - YouTube Τίτλοι
  - YouTube Περιγραφή
  - YouTube Tags
  - Facebook Post
  - Instagram & TikTok Captions
  - Reels/Shorts Captions
  - Ιδέα για Thumbnail
- 📋 Αντιγραφή περιεχομένου με ένα κλικ
- 🎸 Προσαρμογή του ύφους ανάλογα με το μουσικό είδος
- 📱 Πλήρως responsive σχεδιασμός για όλες τις συσκευές
- 💾 Αποθήκευση ιστορικού προηγούμενων kits

## 🛠️ Τεχνολογίες

- [React](https://reactjs.org/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [OpenAI API](https://openai.com/) - Προηγμένη παραγωγή περιεχομένου
- [Hugging Face API](https://huggingface.co/) - Εναλλακτική επιλογή AI

## 📥 Εγκατάσταση

1. Κλωνοποιήστε το repository:
```bash
git clone https://github.com/jpapad/song-promotion-kit-generator.git
cd song-promotion-kit-generator
```

2. Εγκαταστήστε τις εξαρτήσεις:
```bash
npm install
```

3. Ρύθμιση API:
   - Δημιουργήστε ένα αρχείο `.env` στον ριζικό κατάλογο (δείτε το `.env.example`)
   - Προσθέστε το API κλειδί σας για το OpenAI ή το Hugging Face:
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   # ή
   REACT_APP_HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   ```
   - Για το OpenAI API, εγγραφείτε στο [OpenAI Platform](https://platform.openai.com/) για να αποκτήσετε ένα API κλειδί
   - Για το Hugging Face API, εγγραφείτε στο [Hugging Face](https://huggingface.co/) για να αποκτήσετε ένα API κλειδί

4. Εκκινήστε την εφαρμογή:
```bash
npm start
```

5. Ανοίξτε [http://localhost:3000](http://localhost:3000) στον browser σας.

## 📱 Demo & Screenshots

### Dark Mode
<img src="https://raw.githubusercontent.com/jpapad/song-promotion-kit-generator/main/public/dark-mode.png" alt="Dark Mode" width="600">

### Light Mode
<img src="https://raw.githubusercontent.com/jpapad/song-promotion-kit-generator/main/public/light-mode.png" alt="Light Mode" width="600">

### Mobile View
<img src="https://raw.githubusercontent.com/jpapad/song-promotion-kit-generator/main/public/mobile-view.png" alt="Mobile View" width="300">

## 🔄 Υλοποίηση API

Η εφαρμογή μπορεί να χρησιμοποιήσει είτε το Hugging Face API είτε το OpenAI API για την παραγωγή περιεχομένου:

### Hugging Face API
- Προεπιλεγμένη επιλογή με χαμηλότερο κόστος
- Υποστηρίζει το μοντέλο BLOOM-7B1
- Υλοποιείται τόσο στο frontend όσο και σε serverless function για λόγους ασφαλείας

### OpenAI API
- Εναλλακτική επιλογή που παράγει περιεχόμενο υψηλότερης ποιότητας αλλά με μεγαλύτερο κόστος
- Υποστηρίζει το μοντέλο GPT-4 για βέλτιστα αποτελέσματα
- Χρησιμοποιεί το επίσημο `openai` npm package

### Fallback
- Η εφαρμογή διαθέτει ένα μηχανισμό fallback που παράγει περιεχόμενο τοπικά όταν δεν υπάρχει API κλειδί ή όταν υπάρχει σφάλμα στην κλήση API

## 🚀 Deployment

Μπορείτε εύκολα να κάνετε deploy την εφαρμογή σε διάφορες πλατφόρμες:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

## 📈 Μελλοντικές Βελτιώσεις

- [ ] Προσθήκη περισσότερων μουσικών ειδών
- [ ] Δυνατότητα αποθήκευσης και εξαγωγής των αποτελεσμάτων σε PDF
- [ ] Ενσωμάτωση με πλατφόρμες κοινωνικών δικτύων για άμεση δημοσίευση
- [ ] Επιλογή γλώσσας (Αγγλικά/Ελληνικά)
- [ ] Προσθήκη περισσότερων APIs
- [ ] Βελτιωμένο ιστορικό και οργάνωση των promotion kits

## 📃 Διαθέσιμα Scripts

Στον κατάλογο του project, μπορείτε να εκτελέσετε:

### `npm start`

Εκτελεί την εφαρμογή σε development mode.\
Ανοίξτε [http://localhost:3000](http://localhost:3000) για να τη δείτε στον browser.

### `npm test`

Εκτελεί τα tests σε interactive watch mode.\
Δείτε την ενότητα για [running tests](https://facebook.github.io/create-react-app/docs/running-tests) για περισσότερες πληροφορίες.

### `npm run build`

Δημιουργεί την εφαρμογή για production στο φάκελο `build`.\
Βελτιστοποιεί το React για καλύτερη απόδοση.

## 🤝 Συνεισφορά

Συνεισφορές, issues και feature requests είναι ευπρόσδεκτα! Δείτε το [CONTRIBUTING.md](CONTRIBUTING.md) για οδηγίες.

## 📜 Άδεια Χρήσης

Distributed under the MIT License. Δείτε το [LICENSE](LICENSE) για περισσότερες πληροφορίες.

## 📞 Επικοινωνία

Giannis Papadimitriou - [@jpapad](https://github.com/jpapad)

Project Link: [https://github.com/jpapad/song-promotion-kit-generator](https://github.com/jpapad/song-promotion-kit-generator)
