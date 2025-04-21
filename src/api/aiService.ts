import axios from 'axios';
import { SongFormData, PromotionKitData } from '../App';

// Χρησιμοποιούμε το Hugging Face API απευθείας
export const generatePromotionKit = async (data: SongFormData): Promise<PromotionKitData> => {
  try {
    // Προσθέτουμε μια μικρή καθυστέρηση για να δείξουμε το loading spinner
    await new Promise(resolve => setTimeout(resolve, 500));

    // Fallback τιμές σε περίπτωση που το API δεν ανταποκριθεί
    const fallbackResult = {
      youtubeTitle: [
        `${data.title} - ${data.artist} | Official Audio`,
        `${data.artist} - "${data.title}" | Νέο Τραγούδι ${new Date().getFullYear()}`,
        `"${data.title}" - ${data.artist} | ${data.genre} Hit`
      ],
      youtubeDescription: `"${data.title}" από ${data.artist}\n\n${data.description}\n\nΑκούστε το νέο μας τραγούδι στις ψηφιακές πλατφόρμες:\nSpotify: [link]\nApple Music: [link]\nYouTube Music: [link]\n\nFollow ${data.artist}:\nInstagram: [link]\nFacebook: [link]\nTikTok: [link]\n\n© ${new Date().getFullYear()} All Rights Reserved`,
      youtubeTags: [
        `#${data.artist.replace(/\s+/g, '')}`, 
        `#${data.title.replace(/\s+/g, '')}`, 
        `#${data.genre}Music`, 
        `#GreekMusic`, 
        `#NewMusic${new Date().getFullYear()}`, 
        `#${data.genre}`, 
        `#MusicVideo`, 
        `#ΝέαΚυκλοφορία`, 
        `#ΕλληνικήΜουσική`, 
        `#${data.genre}Τραγούδι`
      ],
      facebookPost: `🎵 ΝΕΑ ΚΥΚΛΟΦΟΡΙΑ 🎵\n\n"${data.title}" - το νέο μας ${data.genre.toLowerCase()} τραγούδι είναι τώρα διαθέσιμο! ${data.description}\n\nΑκούστε το παντού: [link στο bio]\n\n#${data.title.replace(/\s+/g, '')} #${data.artist.replace(/\s+/g, '')} #NewMusic`,
      instagramCaption: `✨ "${data.title}" - Out Now! ✨\n\n${data.description}\n\nΑκούστε το νέο μας τραγούδι (link στο bio)\n\n#${data.artist.replace(/\s+/g, '')} #${data.title.replace(/\s+/g, '')} #${data.genre} #GreekMusic #NewRelease #ΝέαΚυκλοφορία #ΕλληνικήΜουσική`,
      tiktokCaption: `Νέο ${data.genre.toLowerCase()} τραγούδι! "${data.title}" - ${data.artist} #${data.genre} #fyp #ΝέαΚυκλοφορία #${data.artist.replace(/\s+/g, '')}`,
      reelsShortCaptions: [
        `"${data.title}" - η νέα μου αγαπημένη μελωδία 🎵`,
        `Αυτό το τραγούδι μου μιλάει διαφορετικά ✨`,
        `Νιώσε τη μαγεία του "${data.title}" 🎵`,
        `${data.artist} στα καλύτερά του/της ✨`,
        `Αυτό το ${data.genre} κομμάτι θα σε συνεπάρει 💫`
      ],
      thumbnailIdea: `Μια ατμοσφαιρική εικόνα που απεικονίζει τον/την ${data.artist} σε μοντέρνο περιβάλλον με έντονα χρώματα. Ο τίτλος "${data.title}" εμφανίζεται με μοντέρνα γραμματοσειρά.`
    };

    // Δημιουργία prompt
    const prompt = `
    Δημιούργησε περιεχόμενο προώθησης για το παρακάτω τραγούδι:
    
    Τίτλος: ${data.title}
    Καλλιτέχνης: ${data.artist}
    Είδος: ${data.genre}
    Περιγραφή: ${data.description || ''}
    
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

    // Παίρνουμε το API key από το .env αρχείο
    const apiKey = process.env.REACT_APP_HUGGINGFACE_API_KEY;

    if (!apiKey) {
      console.warn('Το Hugging Face API key δεν έχει οριστεί. Χρησιμοποιούμε fallback δεδομένα.');
      return fallbackResult;
    }

    try {
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
            'Authorization': `Bearer ${apiKey}`
          }
        }
      );

      let generatedText = response.data[0].generated_text;
      
      try {
        // Προσπάθεια για απευθείας parsing αν είναι JSON
        const result = JSON.parse(generatedText);
        return {
          youtubeTitle: result.youtubeTitles || fallbackResult.youtubeTitle,
          youtubeDescription: result.youtubeDescription || fallbackResult.youtubeDescription,
          youtubeTags: result.youtubeHashtags || fallbackResult.youtubeTags,
          facebookPost: result.facebookPost || fallbackResult.facebookPost,
          instagramCaption: result.instagramCaption || fallbackResult.instagramCaption,
          tiktokCaption: result.tiktokCaption || fallbackResult.tiktokCaption,
          reelsShortCaptions: result.reelsShortCaptions || fallbackResult.reelsShortCaptions,
          thumbnailIdea: result.thumbnailIdea || fallbackResult.thumbnailIdea
        };
      } catch (e) {
        console.error('Error parsing JSON from AI response:', e);
        
        // Προσπάθεια για εξαγωγή JSON που μπορεί να είναι μέσα σε markdown code blocks
        const jsonMatch = generatedText.match(/```(?:json)?([\s\S]*?)```/) || 
                          generatedText.match(/{[\s\S]*?}/);
                          
        if (jsonMatch) {
          try {
            const result = JSON.parse(jsonMatch[1] || jsonMatch[0]);
            return {
              youtubeTitle: result.youtubeTitles || fallbackResult.youtubeTitle,
              youtubeDescription: result.youtubeDescription || fallbackResult.youtubeDescription,
              youtubeTags: result.youtubeHashtags || fallbackResult.youtubeTags,
              facebookPost: result.facebookPost || fallbackResult.facebookPost,
              instagramCaption: result.instagramCaption || fallbackResult.instagramCaption,
              tiktokCaption: result.tiktokCaption || fallbackResult.tiktokCaption,
              reelsShortCaptions: result.reelsShortCaptions || fallbackResult.reelsShortCaptions,
              thumbnailIdea: result.thumbnailIdea || fallbackResult.thumbnailIdea
            };
          } catch (e2) {
            console.error('Error parsing JSON from matched pattern:', e2);
            return fallbackResult;
          }
        } else {
          return fallbackResult;
        }
      }
    } catch (error) {
      console.error('Error calling Hugging Face API:', error);
      return fallbackResult;
    }
  } catch (error) {
    console.error('Error generating promotion kit:', error);
    throw error;
  }
}; 