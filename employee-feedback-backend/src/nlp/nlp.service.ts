import * as Sentiment from 'sentiment'; // Sentiment analysis library
import * as nlpModule from 'compromise'; // Import compromise

// Cast nlpModule to a callable function type
const nlp = nlpModule as unknown as (input: string) => any;

export interface AnalysisResult {
  sentimentScore: number; // Sentiment score
  sentimentLabel: 'Positive' | 'Negative' | 'Neutral'; // Sentiment label
  keyThemes: string[]; // Extracted themes or key terms
}

export class NLPService {
  private sentimentAnalyzer: Sentiment;

  constructor() {
    this.sentimentAnalyzer = new Sentiment(); // Initialize Sentiment
  }

  /**
   * Analyze the sentiment and key themes from feedback.
   * @param feedback - Employee feedback string
   * @returns Analysis result with sentiment and themes
   */
  analyzeFeedback(feedback: string): AnalysisResult {
    console.log('Processing feedback:', feedback);

    // Sentiment analysis
    const sentimentResult = this.sentimentAnalyzer.analyze(feedback);
    const sentimentScore = sentimentResult.score;
    const sentimentLabel =
      sentimentScore > 0
        ? 'Positive'
        : sentimentScore < 0
        ? 'Negative'
        : 'Neutral';

    // Key themes extraction
    const doc = nlp(feedback); 
    console.log('doc', doc)
    // Process text with compromise
    const themes = doc.nouns().out('array'); // Extract nouns as themes
    console.log('themes', themes)

    return {
      sentimentScore,
      sentimentLabel,
      keyThemes: Array.from(new Set(themes)), // Remove duplicates
    };
  }
}
