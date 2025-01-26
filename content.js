// Function to modify the URL with affix parameters
function modifyUrl(minId, minValue) {
  const currentUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(currentUrl.search);

  // Ensure `prop_Platform=PC` and `prop_Ladder` stay at the top
  searchParams.set("prop_Platform", "PC");
  if (!searchParams.has("prop_Ladder")) {
    searchParams.set("prop_Ladder", "false"); // Default to Non-Ladder
  }

  // Update URL parameters for the selected affix with Min values
  searchParams.set(`prop_${minId}Min`, minValue);

  // Rebuild the URL in the correct order
  const orderedParams = new URLSearchParams();
  orderedParams.set("prop_Platform", searchParams.get("prop_Platform"));
  orderedParams.set("prop_Ladder", searchParams.get("prop_Ladder"));
  for (const [key, value] of searchParams) {
    if (key !== "prop_Platform" && key !== "prop_Ladder") {
      orderedParams.set(key, value);
    }
  }

  // Update the URL without reloading the page
  currentUrl.search = orderedParams.toString();
  window.history.pushState({}, "", currentUrl);
}

// Function to toggle Ladder/Non-Ladder mode
function toggleLadder(isLadder) {
  const currentUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(currentUrl.search);

  // Set Ladder or Non-Ladder
  searchParams.set("prop_Ladder", isLadder ? "true" : "false");

  // Update the URL
  currentUrl.search = searchParams.toString();
  window.history.pushState({}, "", currentUrl);
}

// Define the affixes array globally and ensure no invalid entries exist
if (!window.affixes) {
  window.affixes = [
    { name: "All Skills", id: 587 },
    { name: "All Resistances", id: 441 },
    { name: "Fire Resist", id: 427 },
    { name: "Cold Resist", id: 426 },
    { name: "Lightning Resist", id: 428 },
    { name: "Poison Resist", id: 401 },
    { name: "Life", id: 418 },
    { name: "Mana", id: 400 },
    { name: "Gold Find", id: 460 },
    { name: "Magic Find", id: 461 },
    { name: "Faster Hit Recovery", id: 430 },
    { name: "Increased Attack Speed", id: 457 },
    { name: "Enhanced Damage", id: 510 },
    { name: "Enhanced Defense", id: 425 },
    { name: "Damage Reduction", id: 413 },
  ];
}

// Load custom affixes from localStorage and ensure no invalid entries
if (!window.storedAffixes) {
  window.storedAffixes = JSON.parse(localStorage.getItem("customAffixes")) || [];
}
window.affixes = Array.from(
  new Map(
    [...window.affixes, ...window.storedAffixes]
      .filter((affix) => affix && typeof affix.id === "number" && affix.name) // Ensure valid entries
      .map((affix) => [affix.id, affix])
  ).values()
);

// Function to create draggable and interactive affix buttons
function createAffixButtons() {
  const sidebar = document.createElement("div");
  sidebar.style.position = "fixed";
  sidebar.style.top = "0";
  sidebar.style.left = "0";
  sidebar.style.width = "260px"; // Sidebar width
  sidebar.style.height = "100vh";
  sidebar.style.background = "#181414";
  sidebar.style.color = "#ffffff";
  sidebar.style.padding = "10px";
  sidebar.style.overflowY = "auto";
  sidebar.style.zIndex = "1000";
  document.body.appendChild(sidebar);

  // Header
  const header = document.createElement("div");
  header.textContent = "Traderie Search QOL";
  header.style.fontSize = "18px";
  header.style.fontWeight = "bold";
  header.style.textAlign = "center";
  header.style.marginBottom = "15px";
  header.style.padding = "10px";
  header.style.background = "#333";
  header.style.border = "2px solid #fff";
  header.style.borderRadius = "5px";
  sidebar.appendChild(header);

  // Custom affix section
  const customSection = document.createElement("div");
  customSection.style.marginBottom = "20px";
  customSection.style.padding = "10px";
  customSection.style.borderBottom = "2px solid #fff";
  customSection.style.background = "#222";

  const customHeader = document.createElement("h4");
  customHeader.textContent = "Customize Affixes";
  customHeader.style.marginBottom = "10px";
  customHeader.style.color = "#ffffff";
  customSection.appendChild(customHeader);

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Affix Name";
  nameInput.style.width = "100%";
  nameInput.style.marginBottom = "10px";
  nameInput.style.padding = "8px";
  customSection.appendChild(nameInput);

  const idInput = document.createElement("input");
  idInput.type = "number";
  idInput.placeholder = "Affix ID";
  idInput.style.width = "100%";
  idInput.style.marginBottom = "10px";
  idInput.style.padding = "8px";
  customSection.appendChild(idInput);

  const addButton = document.createElement("button");
  addButton.textContent = "Add Affix";
  addButton.style.width = "100%";
  addButton.style.padding = "8px";
  addButton.style.background = "#007bff";
  addButton.style.color = "#fff";
  addButton.style.border = "none";
  addButton.style.cursor = "pointer";
  addButton.onclick = function () {
    const name = nameInput.value.trim();
    const id = parseInt(idInput.value.trim(), 10);

    if (!name || isNaN(id)) {
      alert("Please enter a valid name and ID.");
      return;
    }

    const newAffix = { name, id };
    window.affixes.push(newAffix);

    // Save to localStorage
    localStorage.setItem(
      "customAffixes",
      JSON.stringify(
        Array.from(new Map(window.affixes.map((affix) => [affix.id, affix])).values())
      )
    );

    // Clear input fields
    nameInput.value = "";
    idInput.value = "";

    // Refresh the affix buttons
    sidebar.innerHTML = ""; // Clear the sidebar
    createAffixButtons(); // Recreate everything
  };
  customSection.appendChild(addButton);
  sidebar.appendChild(customSection);

  // Draggable affix list
  const affixListContainer = document.createElement("div");
  affixListContainer.style.marginBottom = "20px";
  sidebar.appendChild(affixListContainer);

  function createDraggableAffixList() {
    affixListContainer.innerHTML = "";
    window.affixes.forEach((affix, index) => {
      const affixItem = document.createElement("div");
      affixItem.style.display = "flex";
      affixItem.style.alignItems = "center";
      affixItem.style.marginBottom = "5px";
      affixItem.style.padding = "10px";
      affixItem.style.background = "#333";
      affixItem.style.color = "#fff";
      affixItem.draggable = true; // Make all items draggable

      // Drag-and-Drop Events
      affixItem.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", index); // Store index of dragged item
        affixItem.style.opacity = "0.5"; // Visual feedback
      });

      affixItem.addEventListener("dragend", () => {
        affixItem.style.opacity = "1"; // Reset visual feedback
      });

      affixItem.addEventListener("dragover", (e) => {
        e.preventDefault(); // Allow drop
        affixItem.style.background = "#555"; // Highlight as drop target
      });

      affixItem.addEventListener("dragleave", () => {
        affixItem.style.background = "#333"; // Reset background
      });

      affixItem.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedIndex = parseInt(e.dataTransfer.getData("text"), 10); // Get dragged index
        const droppedIndex = index;

        // Swap the affixes in the array
        const temp = window.affixes[draggedIndex];
        window.affixes.splice(draggedIndex, 1);
        window.affixes.splice(droppedIndex, 0, temp);

        // Save the updated order to localStorage
        localStorage.setItem("customAffixes", JSON.stringify(window.affixes));

        // Re-render the list to reflect changes
        createDraggableAffixList();
      });

      // Create a button for the affix
      const button = document.createElement("button");
      button.textContent = affix.name;
      button.style.flex = "1";
      button.style.padding = "8px";
      button.style.marginLeft = "10px";

      // Create an input field for the custom number
      const numberInput = document.createElement("input");
      numberInput.type = "number";
      numberInput.placeholder = "Value";
      numberInput.style.width = "60px";
      numberInput.style.marginLeft = "10px";
      numberInput.style.padding = "5px";

      // Update the button's onclick event to use the input value
      button.onclick = () => {
        const value = numberInput.value.trim();
        if (value === "" || isNaN(value)) {
          alert("Please enter a valid number.");
          return;
        }
        modifyUrl(affix.id, parseInt(value, 10));
      };

      affixItem.appendChild(button);
      affixItem.appendChild(numberInput); // Add the input field to the affix item
      affixListContainer.appendChild(affixItem);
    });
  }

  createDraggableAffixList();

  // Add Reset to Default button at the bottom
  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset to Default";
  resetButton.style.width = "100%";
  resetButton.style.padding = "10px";
  resetButton.style.background = "#ff4d4d";
  resetButton.style.color = "#fff";
  resetButton.style.border = "none";
  resetButton.style.marginTop = "20px";
  resetButton.style.cursor = "pointer";
  resetButton.onclick = function () {
    localStorage.removeItem("customAffixes");
    location.reload();
  };
  sidebar.appendChild(resetButton);
}

// Initialize the sidebar with buttons
createAffixButtons();
