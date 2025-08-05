// Simple spam detection utility
// In a real application, this would be more sophisticated and possibly use ML models

export interface SpamDetectionResult {
  score: number;
  reasons: string[];
  isSpam: boolean;
}

export function detectSpam(text: string, userEmail?: string): SpamDetectionResult {
  const reasons: string[] = [];
  let score = 0;

  const lowerText = text.toLowerCase();

  // Check for excessive capitalization
  const capitalRatio = (text.match(/[A-Z]/g) || []).length / text.length;
  if (capitalRatio > 0.3) {
    score += 0.2;
    reasons.push('Excessive capitalization');
  }

  // Check for spam keywords
  const spamKeywords = [
    'buy now', 'click here', 'amazing deals', 'limited time', 'act now',
    'free money', 'make money fast', 'earn cash', 'work from home',
    'weight loss', 'diet pills', 'viagra', 'casino', 'lottery'
  ];

  const foundKeywords = spamKeywords.filter(keyword => 
    lowerText.includes(keyword)
  );

  if (foundKeywords.length > 0) {
    score += foundKeywords.length * 0.15;
    reasons.push(`Spam keywords detected: ${foundKeywords.join(', ')}`);
  }

  // Check for excessive exclamation marks
  const exclamationCount = (text.match(/!/g) || []).length;
  if (exclamationCount > 3) {
    score += 0.1;
    reasons.push('Excessive exclamation marks');
  }

  // Check for suspicious email patterns
  if (userEmail) {
    const suspiciousDomains = ['temp-mail.org', '10minutemail.com', 'guerrillamail.com'];
    const domain = userEmail.split('@')[1];
    if (suspiciousDomains.some(suspicious => domain.includes(suspicious))) {
      score += 0.3;
      reasons.push('Suspicious email domain');
    }
  }

  // Check for repetitive patterns
  const words = text.split(/\s+/);
  const uniqueWords = new Set(words);
  const repetitionRatio = uniqueWords.size / words.length;
  if (repetitionRatio < 0.5 && words.length > 10) {
    score += 0.2;
    reasons.push('Repetitive text patterns');
  }

  // Check for suspicious URLs
  const urlPattern = /https?:\/\/[^\s]+/g;
  const urls = text.match(urlPattern) || [];
  if (urls.length > 2) {
    score += 0.15;
    reasons.push('Multiple suspicious URLs');
  }

  // Normalize score to 0-1 range
  score = Math.min(score, 1);

  return {
    score,
    reasons,
    isSpam: score >= 0.7
  };
}

export function getUserSpamScore(user: {
  email: string;
  itemsPosted: number;
  reportCount: number;
  lastActive: string;
}): number {
  let score = 0;

  // Check for suspicious email domain
  const suspiciousDomains = ['temp-mail.org', '10minutemail.com', 'guerrillamail.com'];
  const domain = user.email.split('@')[1];
  if (suspiciousDomains.some(suspicious => domain.includes(suspicious))) {
    score += 0.3;
  }

  // Check for excessive posting
  if (user.itemsPosted > 20) {
    score += 0.2;
  }

  // Check for reports
  if (user.reportCount > 0) {
    score += user.reportCount * 0.1;
  }

  // Check for recent activity (suspicious if too many posts in short time)
  const lastActive = new Date(user.lastActive);
  const now = new Date();
  const hoursSinceActive = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);
  
  if (user.itemsPosted > 5 && hoursSinceActive < 24) {
    score += 0.2;
  }

  return Math.min(score, 1);
} 