interface FormData {
  firstName: string;
  lastName: string;
  birthdate: string;
  keywords: string;
  includeNumbers: boolean;
  includeSpecialChars: boolean;
  includeCapitalization: boolean;
  includeCommonSubstitutions: boolean;
}

/**
 * Generate password list based on personal information
 */
export const generatePasswords = (formData: FormData): string[] => {
  const passwords: Set<string> = new Set();
  
  // Extract base information
  const firstName = formData.firstName.trim();
  const lastName = formData.lastName.trim();
  const birthdate = formData.birthdate ? new Date(formData.birthdate) : null;
  const keywords = formData.keywords
    .split(',')
    .map(k => k.trim())
    .filter(k => k !== '');
  
  // If no data, return empty array
  if (!firstName && !lastName && !birthdate && keywords.length === 0) {
    return [];
  }

  // Basic variations of names
  addNameVariations(passwords, firstName, lastName);
  
  // Date variations
  if (birthdate) {
    addDateVariations(passwords, birthdate);
  }

  // Keyword variations
  if (keywords.length > 0) {
    addKeywordVariations(passwords, keywords);
  }

  // Combine names with dates
  addNameDateCombinations(passwords, firstName, lastName, birthdate);

  // Combine names with keywords
  addNameKeywordCombinations(passwords, firstName, lastName, keywords);
  
  // Apply number variations if enabled
  if (formData.includeNumbers) {
    addNumberVariations(passwords);
  }

  // Apply special character variations if enabled
  if (formData.includeSpecialChars) {
    addSpecialCharVariations(passwords);
  }

  // Apply capitalization variations if enabled
  if (formData.includeCapitalization) {
    addCapitalizationVariations(passwords);
  }

  // Apply common character substitutions if enabled
  if (formData.includeCommonSubstitutions) {
    addCommonSubstitutions(passwords);
  }

  // Convert the Set to an Array and sort by length for better organization
  return Array.from(passwords).sort((a, b) => a.length - b.length);
};

// Add variations of the names
const addNameVariations = (passwords: Set<string>, firstName: string, lastName: string) => {
  if (firstName) {
    passwords.add(firstName.toLowerCase());
    if (firstName.length >= 3) {
      passwords.add(firstName.toLowerCase().substring(0, 3));
    }
  }
  
  if (lastName) {
    passwords.add(lastName.toLowerCase());
    if (lastName.length >= 3) {
      passwords.add(lastName.toLowerCase().substring(0, 3));
    }
  }
  
  if (firstName && lastName) {
    passwords.add(firstName.toLowerCase() + lastName.toLowerCase());
    passwords.add(firstName.toLowerCase() + '.' + lastName.toLowerCase());
    passwords.add(firstName.toLowerCase().charAt(0) + lastName.toLowerCase());
    passwords.add(firstName.toLowerCase() + lastName.toLowerCase().charAt(0));
  }
};

// Add variations based on the birthdate
const addDateVariations = (passwords: Set<string>, birthdate: Date) => {
  const year = birthdate.getFullYear().toString();
  const month = (birthdate.getMonth() + 1).toString().padStart(2, '0');
  const day = birthdate.getDate().toString().padStart(2, '0');
  
  passwords.add(year);
  passwords.add(year.substring(2));
  passwords.add(month + day);
  passwords.add(day + month);
  passwords.add(month + day + year);
  passwords.add(day + month + year);
  passwords.add(month + day + year.substring(2));
  passwords.add(day + month + year.substring(2));
};

// Add variations based on the keywords
const addKeywordVariations = (passwords: Set<string>, keywords: string[]) => {
  keywords.forEach(keyword => {
    passwords.add(keyword.toLowerCase());
  });
};

// Combine names with dates
const addNameDateCombinations = (
  passwords: Set<string>, 
  firstName: string, 
  lastName: string, 
  birthdate: Date | null
) => {
  if (!birthdate) return;
  
  const year = birthdate.getFullYear().toString();
  const shortYear = year.substring(2);
  const month = (birthdate.getMonth() + 1).toString().padStart(2, '0');
  const day = birthdate.getDate().toString().padStart(2, '0');
  
  if (firstName) {
    passwords.add(firstName.toLowerCase() + year);
    passwords.add(firstName.toLowerCase() + shortYear);
    passwords.add(firstName.toLowerCase() + month + day);
  }
  
  if (lastName) {
    passwords.add(lastName.toLowerCase() + year);
    passwords.add(lastName.toLowerCase() + shortYear);
    passwords.add(lastName.toLowerCase() + month + day);
  }
  
  if (firstName && lastName) {
    passwords.add(firstName.toLowerCase() + lastName.toLowerCase() + year);
    passwords.add(firstName.toLowerCase() + lastName.toLowerCase() + shortYear);
    passwords.add(firstName.toLowerCase().charAt(0) + lastName.toLowerCase() + year);
  }
};

// Combine names with keywords
const addNameKeywordCombinations = (
  passwords: Set<string>, 
  firstName: string, 
  lastName: string, 
  keywords: string[]
) => {
  keywords.forEach(keyword => {
    if (firstName) {
      passwords.add(firstName.toLowerCase() + keyword.toLowerCase());
      passwords.add(keyword.toLowerCase() + firstName.toLowerCase());
    }
    
    if (lastName) {
      passwords.add(lastName.toLowerCase() + keyword.toLowerCase());
      passwords.add(keyword.toLowerCase() + lastName.toLowerCase());
    }
    
    if (firstName && lastName) {
      passwords.add(firstName.toLowerCase().charAt(0) + lastName.toLowerCase() + keyword.toLowerCase());
    }
  });
};

// Add common number variations to existing passwords
const addNumberVariations = (passwords: Set<string>) => {
  const commonNumbers = ['1', '12', '123', '1234', '12345', '123456', '0', '00', '01', '69', '666', '777'];
  const currentPasswords = Array.from(passwords);
  
  currentPasswords.forEach(password => {
    commonNumbers.forEach(number => {
      passwords.add(password + number);
    });
  });
  
  // Add years from 1970 to current year
  const currentYear = new Date().getFullYear();
  for (let year = 1970; year <= currentYear; year++) {
    const yearStr = year.toString();
    currentPasswords.forEach(password => {
      passwords.add(password + yearStr);
      passwords.add(password + yearStr.substring(2));
    });
  }
};

// Add common special character variations to existing passwords
const addSpecialCharVariations = (passwords: Set<string>) => {
  const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '?', '.', '_', '-'];
  const currentPasswords = Array.from(passwords);
  
  currentPasswords.forEach(password => {
    specialChars.forEach(char => {
      passwords.add(password + char);
      passwords.add(char + password);
    });
  });
};

// Add capitalization variations to existing passwords
const addCapitalizationVariations = (passwords: Set<string>) => {
  const currentPasswords = Array.from(passwords);
  
  currentPasswords.forEach(password => {
    if (password.length > 0) {
      // Capitalize first letter
      passwords.add(password.charAt(0).toUpperCase() + password.slice(1));
      
      // Capitalize entire password
      passwords.add(password.toUpperCase());
    }
  });
};

// Add common character substitutions to existing passwords
const addCommonSubstitutions = (passwords: Set<string>) => {
  const substitutions: Record<string, string> = {
    'a': '4',
    'e': '3',
    'i': '1',
    'o': '0',
    's': '5',
    't': '7',
    'g': '9',
    'b': '8',
  };
  
  const currentPasswords = Array.from(passwords);
  
  currentPasswords.forEach(password => {
    let modifiedPassword = password;
    let modified = false;
    
    // Apply each substitution to create a new password
    for (const [char, replacement] of Object.entries(substitutions)) {
      if (password.includes(char)) {
        modifiedPassword = modifiedPassword.replace(new RegExp(char, 'g'), replacement);
        modified = true;
      }
    }
    
    if (modified) {
      passwords.add(modifiedPassword);
    }
  });
};

// Returns the frequency of common patterns for analysis
export const analyzePasswordStrength = (password: string): number => {
  // This is a simple strength calculator
  // In a real app, you would use more sophisticated metrics
  let score = 0;
  
  // Length score
  score += Math.min(password.length, 10) * 2;
  
  // Character variety score
  if (/[A-Z]/.test(password)) score += 5;
  if (/[a-z]/.test(password)) score += 5;
  if (/[0-9]/.test(password)) score += 5;
  if (/[^A-Za-z0-9]/.test(password)) score += 5;
  
  return Math.min(score, 100);
};