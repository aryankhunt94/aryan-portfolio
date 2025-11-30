# Google Sheets Integration Setup

To enable Google Sheets integration, follow these steps:

1.  **Get Credentials**:
    *   Go to the [Google Cloud Console](https://console.cloud.google.com/).
    *   Create a new project (or select an existing one).
    *   Enable the **Google Sheets API**.
    *   Go to **Credentials** > **Create Credentials** > **Service Account**.
    *   Create the service account and download the JSON key file.
    *   Rename the file to `credentials.json` and place it in the `server` folder (`c:\antigravity\portfolio\server\credentials.json`).

2.  **Share the Sheet**:
    *   Create a new Google Sheet.
    *   Open the `credentials.json` file and copy the `client_email` address.
    *   Go to your Google Sheet, click **Share**, and paste the email address. Give it **Editor** access.

3.  **Get Spreadsheet ID**:
    *   Look at the URL of your Google Sheet: `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit...`
    *   Copy the `YOUR_SPREADSHEET_ID` part.
    *   Open `server/index.js` and replace `'YOUR_SPREADSHEET_ID_HERE'` with your actual ID.

4.  **Restart Backend**:
    *   Stop the backend server (Ctrl+C).
    *   Run `backend_setup.bat` again.
