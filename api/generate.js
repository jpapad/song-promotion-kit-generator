const axios = require('axios');

module.exports = async (req, res) => {
  // Επιτρέπουμε μόνο POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Μόνο POST requests επιτρέπονται' });
  }

  try {
    // Παίρνουμε τα δεδομένα από το frontend
    const { title, artist, genre, description } = req.body;

    // Έλεγχος για απαραίτητα πεδία
    if (!title || !artist || !genre) {
      return res.status(400).json({ error: 'Λείπουν απαραίτητα πεδία' });
    }

    // Δημιουργία prompt
    const prompt = `
    Δημιούργησε περιεχόμενο προώθησης για το παρακάτω τραγούδι:
    
    Τίτλος: ${title}
    Καλλιτέχνης: ${artist}
    Είδος: ${genre}
    Περιγραφή: ${description || ''}
    
    Δώσε μου τα παρακάτω σε μορφή JSON:
    1. Τρεις τίτλους για YouTube (youtubeTitles - array of strings)
    2. Μια περιγραφή για YouTube (youtubeDescription - string)
    3. Δέκα hashtags για YouTube (youtubeHashtags - array of strings)
    4. Μια ανάρτηση για Facebook (facebookPost - string)
    5. Μια λεζάντα για Instagram (instagramCaption - string)
    6. Μια λεζάντα για TikTok (tiktokCaption - string)
    7. Πέντε σύντομες λεζάντες για Reels (reelsShortCaptions - array of strings)
    8. Μια ιδέα για thumbnail (thumbnailIdea - string)
    
    Χρησιμοποίησε το στυλ που ταιριάζει στο είδος της μουσικής και φρόντισε το περιεχόμενο να είναι στα ελληνικά.
    Η απάντησή σου πρέπει να είναι μόνο σε JSON format και τίποτα άλλο.
    `;

    // Κλήση στο Hugging Face API
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/bigscience/bloom-7b1',
      {
        inputs: prompt,
        parameters: {
          max_length: 2000,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`
        }
      }
    );

    let generatedText = response.data[0].generated_text;
    
    // Επεξεργασία απάντησης και μετατροπή σε JSON
    let result;
    
    try {
      // Προσπάθεια για απευθείας parsing αν είναι JSON
      result = JSON.parse(generatedText);
    } catch (e) {
      // Αναζήτηση για JSON block αν δεν μπορούμε να κάνουμε parse απευθείας
      const jsonMatch = generatedText.match(/```json([\s\S]*?)```/) || 
                      generatedText.match(/{[\s\S]*?}/);
                      
      if (jsonMatch) {
        try {
          result = JSON.parse(jsonMatch[1] || jsonMatch[0]);
        } catch (e2) {
          // Αν αποτύχει, επιστρέφουμε επεξεργασμένο κείμενο
          result = processTextToStructuredFormat(generatedText, title, artist, genre);
        }
      } else {
        // Επεξεργασία κειμένου σε δομημένη μορφή αν δεν βρούμε JSON
        result = processTextToStructuredFormat(generatedText, title, artist, genre);
      }
    }

    // Μετατροπή αποτελέσματος στη δομή που περιμένει το frontend
    const formattedResult = {
      youtubeTitle: result.youtubeTitles || [],
      youtubeDescription: result.youtubeDescription || '',
      youtubeTags: result.youtubeHashtags || [],
      facebookPost: result.facebookPost || '',
      instagramCaption: result.instagramCaption || '',
      tiktokCaption: result.tiktokCaption || '',
      reelsShortCaptions: result.reelsShortCaptions || [],
      thumbnailIdea: result.thumbnailIdea || ''
    };

    // Επιστροφή αποτελέσματος στο frontend
    return res.status(200).json(formattedResult);
  } catch (error) {
    console.error('Error calling AI service:', error);
    return res.status(500).json({ 
      error: 'Πρόβλημα κατά την επικοινωνία με την υπηρεσία AI',
      details: error.message 
    });
  }
};

// Βοηθητική συνάρτηση για επεξεργασία μη-JSON απαντήσεων
function processTextToStructuredFormat(text, title, artist, genre) {
  // Fallback αν δεν μπορούμε να εξάγουμε σωστά δεδομένα
  return {
    youtubeTitles: [
      `${title} - ${artist} | Official Audio`,
      `${artist} - "${title}" | Νέο Τραγούδι ${new Date().getFullYear()}`,
      `"${title}" - ${artist} | ${genre} Hit`
    ],
    youtubeDescription: `"${title}" από ${artist}\n\n${genre} μουσική στα καλύτερά της!`,
    youtubeHashtags: [`#${artist.replace(/\s+/g, '')}`, `#${title.replace(/\s+/g, '')}`, `#${genre}Music`],
    facebookPost: `Νέα κυκλοφορία: "${title}" από ${artist}`,
    instagramCaption: `Νέο τραγούδι! "${title}" - ${artist} #${genre}`,
    tiktokCaption: `"${title}" - ${artist} #fyp #${genre}`,
    reelsShortCaptions: [`Νέο hit: ${title}`, `${artist} - ${title}`, `Ακούστε το ${title}`, `${title} - η νέα επιτυχία`, `${genre} στα καλύτερά του`],
    thumbnailIdea: `Μια εικόνα του/της ${artist} με τίτλο "${title}" σε μοντέρνο στυλ ${genre}`
  };
} 