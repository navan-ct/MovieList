# Running the application locally

## Step 1: Install dependencies

Once you've cloned the project, install the dependencies.

```bash
npm install
npx pod-install # For iOS
```

## Step 2: Set up environment variables

Create a `.env` file in the project root and add the following values.

```bash
API_BASE_URL=http://www.omdbapi.com
API_KEY=
```

You'll need to provision an API key from https://www.omdbapi.com/apikey.aspx to use the
[OMDb API](https://www.omdbapi.com/).

## Step 3: Start the application

Now that you've successfully set everything up, let's start the application.

```bash
npm start
```
