import { OpenAI } from 'openai';
import { SongFormData, PromotionKitData } from '../App';

export const generatePromotionKit = async (data: SongFormData): Promise<PromotionKitData> => {
  try {
    // Get the OpenAI API key from environment variables
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    
    if (!apiKey) {
      console.warn('OpenAI API key is not configured. Using fallback data.');
      return generateFallbackContent(data);
    }
    
    // Initialize the OpenAI client
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true // Note: In production, API calls should be made from a backend server
    });
    
    // Construct the prompt for the API call
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

    try {
      // Call the OpenAI API
      const response = await openai.chat.completions.create({
        model: "gpt-4", // or "gpt-3.5-turbo" for a more economical option
        messages: [
          {
            role: "system",
            content: "You are a music marketing expert specialized in creating promotional content for songs. Return only valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      // Parse the response
      const content = response.choices[0].message.content;
      
      if (!content) {
        throw new Error('Empty response from OpenAI API');
      }
      
      const result = JSON.parse(content);
            
      // Format the result according to the expected structure
      return {
        youtubeTitle: result.youtubeTitles || [],
        youtubeDescription: result.youtubeDescription || '',
        youtubeTags: result.youtubeHashtags || [],
        facebookPost: result.facebookPost || '',
        instagramCaption: result.instagramCaption || '',
        tiktokCaption: result.tiktokCaption || '',
        reelsShortCaptions: result.reelsShortCaptions || [],
        thumbnailIdea: result.thumbnailIdea || ''
      };
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return generateFallbackContent(data);
    }
  } catch (error) {
    console.error('Error generating promotion kit:', error);
    throw error;
  }
};

// Generate fallback content if API call fails
const generateFallbackContent = (data: SongFormData): PromotionKitData => {
  const genreSpecificStyle = getGenreSpecificStyle(data.genre);
  
  return {
    youtubeTitle: [
      `${data.title} - ${data.artist} | Official Audio`,
      `${data.artist} - "${data.title}" | Νέο Τραγούδι ${new Date().getFullYear()}`,
      `"${data.title}" - ${data.artist} | ${data.genre} Hit`
    ],
    youtubeDescription: `"${data.title}" από ${data.artist}\n\n${data.description}\n\n${genreSpecificStyle.description}\n\nΑκούστε το νέο μας τραγούδι στις ψηφιακές πλατφόρμες:\nSpotify: [link]\nApple Music: [link]\nYouTube Music: [link]\n\nFollow ${data.artist}:\nInstagram: [link]\nFacebook: [link]\nTikTok: [link]\n\n© ${new Date().getFullYear()} All Rights Reserved`,
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
      `#${data.genre}Τραγούδι`,
      ...genreSpecificStyle.tags
    ],
    facebookPost: `🎵 ΝΕΑ ΚΥΚΛΟΦΟΡΙΑ 🎵\n\n"${data.title}" - το νέο μας ${data.genre.toLowerCase()} τραγούδι είναι τώρα διαθέσιμο! ${data.description}\n\n${genreSpecificStyle.socialPost}\n\nΑκούστε το παντού: [link στο bio]\n\n#${data.title.replace(/\s+/g, '')} #${data.artist.replace(/\s+/g, '')} #NewMusic`,
    instagramCaption: `✨ "${data.title}" - Out Now! ✨\n\n${data.description}\n\n${genreSpecificStyle.instagramStyle}\n\nΑκούστε το νέο μας τραγούδι (link στο bio)\n\n#${data.artist.replace(/\s+/g, '')} #${data.title.replace(/\s+/g, '')} #${data.genre} #GreekMusic #NewRelease #ΝέαΚυκλοφορία #ΕλληνικήΜουσική`,
    tiktokCaption: `Νέο ${data.genre.toLowerCase()} τραγούδι! "${data.title}" - ${data.artist} ${genreSpecificStyle.emoji} #${data.genre} #fyp #ΝέαΚυκλοφορία #${data.artist.replace(/\s+/g, '')}`,
    reelsShortCaptions: [
      `"${data.title}" - ${genreSpecificStyle.shortCaption1}`,
      `${genreSpecificStyle.shortCaption2}`,
      `Νιώσε τη μαγεία του "${data.title}" ${genreSpecificStyle.emoji}`,
      `${data.artist} στα καλύτερά του/της ${genreSpecificStyle.emoji2}`,
      `Αυτό το ${data.genre} κομμάτι ${genreSpecificStyle.shortCaption3}`
    ],
    thumbnailIdea: genreSpecificStyle.thumbnailIdea.replace('{artist}', data.artist).replace('{title}', data.title)
  };
};

// Helper function to add genre-specific styling to the generated content
const getGenreSpecificStyle = (genre: string) => {
  const lowercaseGenre = genre.toLowerCase();

  // Default style
  let style = {
    description: 'Ένα μοναδικό μουσικό ταξίδι που θα σας συνεπάρει!',
    tags: ['#NewRelease', '#MusicLovers'],
    socialPost: 'Μοιραστείτε το με τους φίλους σας!',
    instagramStyle: 'Μια μελωδία που θα σας ταξιδέψει...',
    emoji: '🎵',
    emoji2: '✨',
    shortCaption1: 'η νέα μου αγαπημένη μελωδία 🎵',
    shortCaption2: 'Αυτό το τραγούδι μου μιλάει διαφορετικά ✨',
    shortCaption3: 'θα σε συνεπάρει 💫',
    thumbnailIdea: 'Μια ατμοσφαιρική εικόνα που απεικονίζει τον/την {artist} σε μοντέρνο περιβάλλον με έντονα χρώματα. Ο τίτλος "{title}" εμφανίζεται με μοντέρνα γραμματοσειρά.'
  };

  // Customize based on genre
  if (lowercaseGenre === 'μπαλάντα') {
    style = {
      description: 'Μια συναισθηματική μπαλάντα που αγγίζει την καρδιά και την ψυχή.',
      tags: ['#Ballad', '#EmotionalSong', '#GreekBallad', '#Συναίσθημα'],
      socialPost: 'Ένα τραγούδι για τις στιγμές που αφήνεσαι στο συναίσθημα...',
      instagramStyle: 'Κάθε νότα, κάθε λέξη, αγγίζει μια διαφορετική χορδή συναισθημάτων...',
      emoji: '💔',
      emoji2: '🕯️',
      shortCaption1: 'αγγίζει την ψυχή μου 💔',
      shortCaption2: 'Όταν τα λόγια δεν αρκούν, αφήνεις τη μουσική να μιλήσει 🎹',
      shortCaption3: 'φέρνει δάκρυα στα μάτια ✨',
      thumbnailIdea: 'Μια δραματική, συναισθηματική εικόνα του/της {artist} με απαλό, μπλε φωτισμό και σκιές. Ο τίτλος "{title}" εμφανίζεται με κομψή, καλλιγραφική γραμματοσειρά.'
    };
  } else if (lowercaseGenre === 'ροκ') {
    style = {
      description: 'Ένα δυναμικό ροκ κομμάτι με έντονα riffs και παθιασμένους στίχους.',
      tags: ['#RockMusic', '#GreekRock', '#RockNRoll', '#LiveLoud', '#ΕλληνικήΡοκ'],
      socialPost: 'Δυναμώστε την ένταση και αφεθείτε στον ήχο!',
      instagramStyle: 'Rock n Roll δεν είναι μόνο μουσική, είναι στάση ζωής! 🤘',
      emoji: '🤘',
      emoji2: '🔥',
      shortCaption1: 'δίνει ενέργεια στη μέρα μου 🤘',
      shortCaption2: 'Όταν η μουσική σε κάνει να θες να σπάσεις την κιθάρα σου 🎸',
      shortCaption3: 'θα σε κάνει να headbang 🔥',
      thumbnailIdea: 'Μια δυναμική εικόνα του/της {artist} σε σκηνή με έντονο κόκκινο και μαύρο φωτισμό, ενδεχομένως με μια κιθάρα. Ο τίτλος "{title}" εμφανίζεται με έντονα, σπασμένα γράμματα σε στυλ graffiti.'
    };
  } else if (lowercaseGenre === 'λαϊκό') {
    style = {
      description: 'Ένα αυθεντικό λαϊκό τραγούδι που αντηχεί την ελληνική ψυχή και παράδοση.',
      tags: ['#GreekFolk', '#LaikiMusic', '#ΕλληνικόΛαϊκό', '#Ζεϊμπέκικο', '#Χασάπικο'],
      socialPost: 'Ένα τραγούδι που σε κάνει να θες να σηκωθείς για χορό!',
      instagramStyle: 'Η λαϊκή μουσική είναι η καρδιά και η ψυχή της Ελλάδας μας...',
      emoji: '🇬🇷',
      emoji2: '💃',
      shortCaption1: 'με κάνει να θέλω να χορέψω 💃',
      shortCaption2: 'Στο τραπέζι με φίλους, με μουσική που μιλάει στην ψυχή μας 🍷',
      shortCaption3: 'έχει την αυθεντική ελληνική ψυχή 🇬🇷',
      thumbnailIdea: 'Μια ζεστή εικόνα του/της {artist} σε παραδοσιακό ελληνικό περιβάλλον, ίσως σε ταβέρνα ή με παραδοσιακά μουσικά όργανα. Ο τίτλος "{title}" εμφανίζεται με παραδοσιακή, χειροποίητη γραμματοσειρά.'
    };
  } else if (lowercaseGenre === 'ποπ') {
    style = {
      description: 'Ένα φρέσκο, σύγχρονο ποπ κομμάτι με ρυθμούς που κολλάνε στο μυαλό.',
      tags: ['#PopMusic', '#GreekPop', '#FreshHit', '#ΕλληνικήΠοπ', '#PopHit'],
      socialPost: 'Το νέο hit που θα σας κάνει να χορεύετε όλο το καλοκαίρι!',
      instagramStyle: 'Catchy μελωδίες και στίχοι που δεν μπορείς να σταματήσεις να τραγουδάς!',
      emoji: '💃',
      emoji2: '✌️',
      shortCaption1: 'δεν βγαίνει από το μυαλό μου 🎧',
      shortCaption2: 'Όταν βρίσκεις το soundtrack του καλοκαιριού σου 🌞',
      shortCaption3: 'είναι το επόμενο hit 🎯',
      thumbnailIdea: 'Μια φωτεινή, χρωματιστή εικόνα του/της {artist} με μοντέρνο, νεανικό στυλ. Ίσως με έντονα νέον χρώματα ή σε αστικό περιβάλλον. Ο τίτλος "{title}" εμφανίζεται με μοντέρνα, pop art γραμματοσειρά.'
    };
  }

  return style;
}; 