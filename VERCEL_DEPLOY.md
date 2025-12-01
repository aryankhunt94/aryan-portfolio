# Deploying to Vercel

Follow these steps to deploy your portfolio to Vercel:

1.  **Push to GitHub**:
    *   Make sure your project is pushed to a GitHub repository.

2.  **Import to Vercel**:
    *   Go to [Vercel](https://vercel.com/) and log in.
    *   Click **Add New...** > **Project**.
    *   Import your `portfolio` repository.

3.  **Configure Environment Variables**:
    *   In the Vercel project setup (or Settings > Environment Variables), add the following:

    | Name | Value |
    | :--- | :--- |
    | `GOOGLE_CLIENT_EMAIL` | (From your `credentials.json`) `client_email` |
    | `GOOGLE_PRIVATE_KEY` | (From your `credentials.json`) `private_key` (Copy the whole string including `-----BEGIN PRIVATE KEY...`) |
    | `GOOGLE_SPREADSHEET_ID` | `11YPayNtmyUJbnuaBVzHi8H8_85mvhl0TO_-91uNdQHk` |
    | `MONGO_URI` | Your MongoDB Connection String (e.g., from MongoDB Atlas) |

4.  **Deploy**:
    *   Click **Deploy**.

## Important Notes
*   **SQLite will NOT work**: The database features (saving to `database.sqlite`) will not work on Vercel because the file system is temporary.
*   **Google Sheets WILL work**: Your messages will still be saved to Google Sheets!
