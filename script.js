const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const api_url = "quote.json"; // Path to your JSON file

async function getQuote(url) {
    try {
        const response = await fetch(url); // Fetch data from the specified URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse JSON data from the response
        return data; // Return the parsed data (array of quotes)
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null if there's an error
    }
}

async function getRandomQuote() {
    const quotes = await getQuote(api_url); // Fetch quotes from the API
    if (!quotes) return; // Exit if quotes fetching failed

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Update DOM with random quote and author
    quoteElement.textContent = randomQuote.quote;
    authorElement.textContent = randomQuote.author;
}

function shareOnTwitter() {
    const quote = quoteElement.textContent;
    const author = authorElement.textContent;

    // Encode quote and author for URL
    const quoteEncoded = encodeURIComponent(`"${quote}" - ${author}`);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteEncoded}`;

    // Open Twitter share window
    window.open(tweetUrl, '_blank');
}

// Immediately fetch and display a random quote on page load
getRandomQuote();
