# Song Promotion Kit Generator

Μια React εφαρμογή που δημιουργεί αυτόματα περιεχόμενο για την προώθηση ενός τραγουδιού, βασισμένη σε πληροφορίες που παρέχει ο χρήστης.

## Λειτουργίες

- Φόρμα εισαγωγής δεδομένων για το τραγούδι (τίτλος, καλλιτέχνης, περιγραφή, μουσικό είδος)
- Αυτόματη δημιουργία περιεχομένου:
  - YouTube Τίτλοι
  - YouTube Περιγραφή
  - YouTube Tags
  - Facebook Post
  - Instagram & TikTok Captions
  - Reels/Shorts Captions
  - Ιδέα για Thumbnail
- Αντιγραφή περιεχομένου με ένα κλικ
- Προσαρμογή του ύφους ανάλογα με το μουσικό είδος
- Πλήρως responsive σχεδιασμός για όλες τις συσκευές

## Τεχνολογίες

- React
- TypeScript
- Tailwind CSS για το styling
- OpenAI API για την παραγωγή περιεχομένου
- Hugging Face API ως εναλλακτική επιλογή

## Εγκατάσταση

1. Κλωνοποιήστε το repository:
```
git clone https://github.com/yourusername/song-promotion-kit-generator.git
cd song-promotion-kit-generator
```

2. Εγκαταστήστε τις εξαρτήσεις:
```
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
```
npm start
```

5. Ανοίξτε [http://localhost:3000](http://localhost:3000) στον browser σας.

## Υλοποίηση API

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

## Μελλοντικές Βελτιώσεις

- Προσθήκη περισσότερων μουσικών ειδών
- Δυνατότητα αποθήκευσης και εξαγωγής των αποτελεσμάτων σε PDF
- Ενσωμάτωση με πλατφόρμες κοινωνικών δικτύων για άμεση δημοσίευση
- Επιλογή γλώσσας (Αγγλικά/Ελληνικά)

## Σημείωση

Αυτή η εφαρμογή προσομοιώνει την κλήση AI API για λόγους επίδειξης. Σε πραγματικό περιβάλλον παραγωγής, θα πρέπει να υλοποιηθεί ένα backend που θα διαχειρίζεται με ασφάλεια τα API κλειδιά και τις κλήσεις προς το OpenAI API.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
