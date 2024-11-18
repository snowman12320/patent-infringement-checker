# Patent Infringement Check App

## Introduction

This app allows users to input a patent ID and a company name to perform a patent infringement check against the specified company. It returns the top two infringing products along with explanations of why these products potentially infringe the patent.

## Prerequisites

- Node.js and pnpm installed
- Docker installed (optional, for running with Docker)
- Access to the AI model with a valid API key

## How to Run the App

### Running Locally

1. **Unpack zip**

   ```bash
   cd patent-infringement-checker
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add your Gemini API key.

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   CLAUDE_API_KEY=your_claude_api_key_here
   XAI_API_KEY=your_xai_api_key_here
   ```

4. **Run the Development Server**

   ```bash
   pnpm dev
   ```

5. **Open the App**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Running with Docker

1. **Unpack zip**

   ```bash
   cd patent-infringement-checker
   ```

2. **Build the Docker Image**

   ```bash
   docker build -t patent-infringement-checker .
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add your Gemini API key.

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   CLAUDE_API_KEY=your_claude_api_key_here
   XAI_API_KEY=your_xai_api_key_here
   ```

4. **Run the Docker Container**

   ```bash
   docker run -p 3000:3000 --env-file .env patent-infringement-checker
   ```

5. **Open the App**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Notes

- Ensure `patents.json` and `company_products.json` are placed in the `data` directory.
- Replace `your_gemini_api_key_here` with your actual Gemini API key.
- For any issues, please check the console logs for more details.
