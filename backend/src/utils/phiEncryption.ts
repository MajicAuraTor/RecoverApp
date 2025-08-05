// HIPAA Compliance: Data Encryption Utility
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.PHI_ENCRYPTION_KEY; // 32 bytes key
const IV_LENGTH = 16; // For AES, this is always 16

export class PHIEncryption {
  
  // Encrypt PHI data before storing in database
  static encrypt(text: string): string {
    if (!ENCRYPTION_KEY) {
      throw new Error('PHI_ENCRYPTION_KEY environment variable is required');
    }
    
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Prepend IV to encrypted data
    return iv.toString('hex') + ':' + encrypted;
  }
  
  // Decrypt PHI data when retrieving from database
  static decrypt(encryptedText: string): string {
    if (!ENCRYPTION_KEY) {
      throw new Error('PHI_ENCRYPTION_KEY environment variable is required');
    }
    
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedData = textParts.join(':');
    
    const decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
  
  // Hash sensitive identifiers (one-way)
  static hashPII(data: string): string {
    return crypto.createHash('sha256').update(data + ENCRYPTION_KEY).digest('hex');
  }
}
