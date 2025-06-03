# PenTest Password Generator

A web application for generating password lists for penetration testing based on personal information. This tool helps security professionals create targeted wordlists by combining names, birthdates, and keywords with common password patterns.

## Features

- Generate password lists using:
  - First and last names
  - Birthdates
  - Custom keywords
- Password variation options:
  - Number combinations
  - Special characters
  - Capitalization variations
  - Common character substitutions (leetspeak)
- Download generated lists as text files
- Copy password lists to clipboard
- Paginated results view
- Modern, responsive UI

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React Icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pentest-password-generator.git
cd pentest-password-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Usage

1. Enter personal information:
   - First name
   - Last name
   - Birthdate
   - Keywords (comma-separated)

2. Select password generation options:
   - Include numbers
   - Include special characters
   - Include capitalization variations
   - Include common substitutions

3. Click "Generate List" to create the password list

4. Use the "Download" or "Copy All" buttons to export the generated passwords

## Security Notice

This tool is intended for authorized security testing only. Always obtain proper authorization before conducting penetration tests. The authors are not responsible for any misuse of this software.

## ⚙️ Project Information

This project was created using the AI tool provided by [bolt.new](https://bolt.new).  
Please note that some of the generated code may require modifications.  
I will continue to update and fix issues as they arise, so if you notice any problems, feel free to report them.  
Pull requests are, of course, always welcome!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
