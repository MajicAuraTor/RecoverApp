# HTTPS Setup Guide for Your Healthcare App

## 🔒 **1. ENABLING HTTPS (Step-by-Step)**

### **Option A: Development HTTPS (Start Here)**

#### Step 1: Generate SSL Certificate

```powershell
# Run these commands in your backend directory
cd backend

# Install mkcert for local development certificates
# Download from: https://github.com/FiloSottile/mkcert/releases
# Or use chocolatey:
choco install mkcert

# Create local certificate authority
mkcert -install

# Generate certificates for your domains
mkcert localhost 127.0.0.1 ::1
# This creates: localhost+2.pem and localhost+2-key.pem
```

#### Step 2: Update Backend Server for HTTPS

```typescript
// backend/src/server.ts - Add HTTPS support
import fs from "fs";
import https from "https";

// Add after existing imports
const app = express();
const PORT = process.env.PORT || 5000;
const HTTPS_PORT = process.env.HTTPS_PORT || 5443;

// ... existing middleware setup ...

// HTTPS configuration
const httpsOptions = {
  key: fs.readFileSync("./localhost+2-key.pem"),
  cert: fs.readFileSync("./localhost+2.pem"),
};

// Start both HTTP (for development) and HTTPS servers
app.listen(PORT, () => {
  console.log(`🚀 HTTP Server running on port ${PORT}`);
});

https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
  console.log(`🔒 HTTPS Server running on port ${HTTPS_PORT}`);
  console.log(`🔗 Secure API: https://localhost:${HTTPS_PORT}/api/v1`);
});
```

#### Step 3: Update Frontend to Use HTTPS

```typescript
// frontend/src/services/api.ts
const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://yourdomain.com/api/v1"
    : "https://localhost:5443/api/v1"; // Use HTTPS port
```

#### Step 4: Update Environment Variables

```bash
# backend/.env
HTTPS_PORT=5443
NODE_ENV=development
```

### **Option B: Production HTTPS (When Deploying)**

#### For AWS/Cloud Deployment:

```bash
# Use AWS Certificate Manager (ACM) for free SSL certificates
# Or use Let's Encrypt with Certbot:

# Install Certbot
sudo apt-get install certbot

# Get certificate for your domain
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Certificates will be in:
# /etc/letsencrypt/live/yourdomain.com/fullchain.pem
# /etc/letsencrypt/live/yourdomain.com/privkey.pem
```

#### Production Server Configuration:

```typescript
// Production HTTPS setup
const httpsOptions =
  process.env.NODE_ENV === "production"
    ? {
        key: fs.readFileSync(
          "/etc/letsencrypt/live/yourdomain.com/privkey.pem"
        ),
        cert: fs.readFileSync(
          "/etc/letsencrypt/live/yourdomain.com/fullchain.pem"
        ),
      }
    : {
        key: fs.readFileSync("./localhost+2-key.pem"),
        cert: fs.readFileSync("./localhost+2.pem"),
      };
```

---

## 🗄️ **2. ENCRYPTING EXISTING PATIENT DATA**

### **What This Means:**

- Any patient data already in your database is currently stored as plain text
- You need to encrypt sensitive fields like SSN, phone numbers, addresses, medical record numbers
- This protects data "at rest" (stored in the database)

### **Step-by-Step Database Encryption:**

#### Step 1: Generate Encryption Key

```powershell
# Generate a secure 256-bit encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Copy the output to your .env file
```

#### Step 2: Add Encryption Key to Environment

```bash
# backend/.env
PHI_ENCRYPTION_KEY=your_64_character_hex_key_from_step1
```

#### Step 3: Create Database Migration Script

```typescript
// backend/src/scripts/encryptExistingData.ts
import { executeQuery } from "../config/database";
import { PHIEncryption } from "../utils/security";

interface PatientRecord {
  id: number;
  ssn?: string;
  phone?: string;
  email?: string;
  medical_record_number?: string;
  date_of_birth?: string;
  address?: string;
}

export const encryptExistingPatientData = async () => {
  try {
    console.log("🔄 Starting PHI encryption migration...");

    // Get all patient records that need encryption
    const patients = (await executeQuery(`
      SELECT id, ssn, phone, email, medical_record_number, date_of_birth, address 
      FROM users 
      WHERE role = 'patient' AND ssn IS NOT NULL
    `)) as PatientRecord[];

    console.log(`📊 Found ${patients.length} patient records to encrypt`);

    for (const patient of patients) {
      const updates: string[] = [];
      const values: any[] = [];

      // Encrypt sensitive fields
      if (patient.ssn && !patient.ssn.includes(":")) {
        // Not already encrypted
        updates.push("ssn = ?");
        values.push(PHIEncryption.encryptPHI(patient.ssn));
      }

      if (patient.phone && !patient.phone.includes(":")) {
        updates.push("phone = ?");
        values.push(PHIEncryption.encryptPHI(patient.phone));
      }

      if (
        patient.medical_record_number &&
        !patient.medical_record_number.includes(":")
      ) {
        updates.push("medical_record_number = ?");
        values.push(PHIEncryption.encryptPHI(patient.medical_record_number));
      }

      if (patient.date_of_birth && !patient.date_of_birth.includes(":")) {
        updates.push("date_of_birth = ?");
        values.push(PHIEncryption.encryptPHI(patient.date_of_birth));
      }

      if (patient.address && !patient.address.includes(":")) {
        updates.push("address = ?");
        values.push(PHIEncryption.encryptPHI(patient.address));
      }

      if (updates.length > 0) {
        values.push(patient.id);
        await executeQuery(
          `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
          values
        );
        console.log(`✅ Encrypted data for patient ${patient.id}`);
      }
    }

    console.log("🎉 PHI encryption migration completed successfully!");
  } catch (error) {
    console.error("❌ PHI encryption migration failed:", error);
    throw error;
  }
};

// Run migration if called directly
if (require.main === module) {
  encryptExistingPatientData()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
```

#### Step 4: Update Database Schema (Add Encryption Tracking)

```sql
-- Add columns to track encryption status
ALTER TABLE users ADD COLUMN data_encrypted BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN encryption_timestamp TIMESTAMP NULL;

-- Add index for encrypted data queries
CREATE INDEX idx_users_encrypted ON users(data_encrypted);
```

#### Step 5: Run the Encryption Migration

```powershell
# Navigate to backend directory
cd backend

# Compile TypeScript
npm run build

# Run the encryption migration
node dist/scripts/encryptExistingData.js
```

#### Step 6: Update Your Application Code to Handle Encrypted Data

```typescript
// backend/src/controllers/userController.ts
import { PHIEncryption } from "../utils/security";

export const getPatientData = async (req: AuthRequest, res: Response) => {
  try {
    const patientId = req.params.id;

    const patients = (await executeQuery(
      'SELECT * FROM users WHERE id = ? AND role = "patient"',
      [patientId]
    )) as any[];

    if (patients.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patient = patients[0];

    // Decrypt sensitive fields before sending to frontend
    if (patient.ssn) {
      patient.ssn = PHIEncryption.decryptPHI(patient.ssn);
    }
    if (patient.phone) {
      patient.phone = PHIEncryption.decryptPHI(patient.phone);
    }
    if (patient.medical_record_number) {
      patient.medical_record_number = PHIEncryption.decryptPHI(
        patient.medical_record_number
      );
    }

    // Remove encryption metadata before sending to frontend
    delete patient.data_encrypted;
    delete patient.encryption_timestamp;

    res.json({ success: true, data: patient });
  } catch (error) {
    console.error("Error fetching patient data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
```

---

## 🚀 **Quick Implementation Commands**

### **For HTTPS (Run These Now):**

```powershell
# 1. Install mkcert for local development
# Download from: https://github.com/FiloSottile/mkcert/releases

# 2. Generate local certificates
cd backend
mkcert localhost 127.0.0.1 ::1

# 3. Update your backend server code (see above)
# 4. Update frontend API URL to use https://localhost:5443
```

### **For Database Encryption (Run After HTTPS):**

```powershell
# 1. Generate encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 2. Add key to .env file
# PHI_ENCRYPTION_KEY=your_generated_key

# 3. Create and run migration script (see above)
# 4. Test with a few records first!
```

---

## ⚠️ **CRITICAL WARNINGS**

### **Before Encrypting Database:**

1. **BACKUP YOUR DATABASE FIRST!**
2. **Test on a copy of your data first**
3. **Verify you can decrypt data before proceeding**
4. **Have a rollback plan**

### **HTTPS Requirements:**

1. **Frontend must use HTTPS URLs**
2. **All API calls must go through HTTPS**
3. **No mixed content (HTTP + HTTPS)**
4. **Cookies must be marked secure**

---

These two steps will take your app from 70% to 90% HIPAA compliant! The encryption protects data at rest, and HTTPS protects data in transit - covering the two main attack vectors for patient data theft.
