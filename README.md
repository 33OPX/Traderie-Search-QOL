# Traderie Search QOL 2.0

A tool designed to enhance your experience on the Traderie website, making it easier to search and manage Diablo II item listings. It provides features such as dynamic affix management, drag-and-drop sorting, and automatic ID insertion for enhanced efficiency.

## Features

- **Dynamic Affix Management**: The tool automatically captures affixes and their property IDs from the website.
- **Drag-and-Drop Functionality**: Easily sort your affix list to organize it according to your preferences.
- **Custom Affix Addition**: Add your own affixes by entering their name and ID through an intuitive input box.
- **JavaScript-based**: Built with pure JavaScript for flexibility and compatibility.
- **Chrome Extension-ready**: The tool is designed to be used as a Chrome extension for seamless integration.

## Installation

### Option 1: Using as a Chrome Extension

1. Download or clone this repository to your local machine.
2. Open the Chrome browser and go to `chrome://extensions/`.
3. Enable **Developer mode** by toggling the switch in the top right corner.
4. Click on **Load unpacked** and select the folder containing the downloaded files.
5. The Traderie Search QOL tool should now appear as an extension in your Chrome toolbar.

## Usage

- **Affix List**: The tool will automatically populate a list of known affixes, which you can organize by dragging and dropping them into your preferred order.
- **Add Custom Affix**: Use the input box at the top of the sidebar to enter the name and ID of an affix you want to add.
- **Sorting**: Affixes can be manually sorted by clicking and dragging them into the desired order.


## How to Update the URL with Your Affix Filters

### Step 1: Update Affix and Minimum Value
Click the **"Update URL"** button after selecting the affix you want to filter by and specifying the minimum value you’d like to apply.
![Apply Filters](https://i.imgur.com/hKapwjm.png)

### Step 2: View the Updated URL with Filters
Once you click the button, the URL will update to include the **`prop_*`** parameter, where `*` is your affix's property ID and the minimum value you set. 
![Prop_ID](https://i.imgur.com/kXRhawE.png)

### Step 3: Adding the Affix and ID to the plugin
Now, just enter the Affix name (Whatever you want it to be) and the ID and it will be added to the list.
![Prop_ID](https://i.imgur.com/rJCaNvD.png)

### Step 4: Drag n Drop organization
After that, you can drag the Affixes wherever you would like to completely customize the list for you. Enjoy!

## Contributing

Feel free to fork this repository, create a new branch, and submit a pull request with your improvements. We welcome suggestions and contributions to further enhance the functionality of this tool.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Diablo II community for their continuous support and feedback.
- Inspired by tools such as "Path of Exile Trade - Fuzzy Search" for better search functionalities.
