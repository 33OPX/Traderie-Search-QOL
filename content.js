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

// Function to create buttons for Ladder/Non-Ladder and affixes
function createAffixButtons() {
  const sidebar = document.createElement("div");
  sidebar.style.position = "fixed";
  sidebar.style.top = "0";
  sidebar.style.left = "0";
  sidebar.style.width = "260px";  // Sidebar width
  sidebar.style.height = "100vh";
  sidebar.style.background = "#181414";
  sidebar.style.color = "#ffffff";
  sidebar.style.padding = "10px";
  sidebar.style.overflowY = "auto";
  sidebar.style.zIndex = "1000";
  document.body.appendChild(sidebar);

  // Header with centered text and border
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

  // Add Ladder and Non-Ladder buttons (top section)
  const filtersHeader = document.createElement("h3");
  filtersHeader.textContent = "Filters";
  filtersHeader.style.color = "#ffffff";
  filtersHeader.style.marginBottom = "15px";
  sidebar.appendChild(filtersHeader);

  const ladderButton = document.createElement("button");
  ladderButton.textContent = "Ladder";
  ladderButton.style.display = "block";
  ladderButton.style.marginBottom = "10px";
  ladderButton.style.width = "calc(100% - 30px)";
  ladderButton.style.padding = "8px";
  ladderButton.onclick = function () {
    toggleLadder(true);
  };
  sidebar.appendChild(ladderButton);

  const nonLadderButton = document.createElement("button");
  nonLadderButton.textContent = "Non-Ladder";
  nonLadderButton.style.display = "block";
  nonLadderButton.style.marginBottom = "20px";
  nonLadderButton.style.width = "calc(100% - 30px)";
  nonLadderButton.style.padding = "8px";
  nonLadderButton.onclick = function () {
    toggleLadder(false);
  };
  sidebar.appendChild(nonLadderButton);

  // Affix list (Life, Mana, Resistances, etc.)
  const affixes = [
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
    // Added new affixes
    { name: "Enhanced Defense", id: 425 },  // New affix
    { name: "Damage Reduction", id: 413 }   // New affix
  ];

  // Create buttons for each affix with input fields
  affixes.forEach(function (affix) {
    const buttonWrapper = document.createElement("div");
    buttonWrapper.style.display = "flex";
    buttonWrapper.style.marginBottom = "10px";
    buttonWrapper.style.alignItems = "center"; // Align input and button

    const button = document.createElement("button");
    button.textContent = affix.name;
    button.style.flex = "1"; // Button takes up remaining space
    button.style.padding = "8px";
    button.onclick = function () {
      modifyUrl(affix.id, 10); // Example: Min value = 10
    };

    const inputField = document.createElement("input");
    inputField.type = "number";
    inputField.min = 1;
    inputField.max = 100;
    inputField.value = 10; // Default value
    inputField.style.width = "70px"; // Wider input field to accommodate arrows and text
    inputField.style.marginLeft = "10px"; // Margin between button and input field

    buttonWrapper.appendChild(button);
    buttonWrapper.appendChild(inputField);

    sidebar.appendChild(buttonWrapper);
  });

  // Function to create a collapsible section for character skills (Third Section)
  function createCollapsibleSection(title, affixList) {
    const section = document.createElement("div");

    // Section header (collapsible button)
    const sectionHeader = document.createElement("button");
    sectionHeader.textContent = title;
    sectionHeader.style.width = "100%";
    sectionHeader.style.padding = "8px";
    sectionHeader.style.marginBottom = "10px";
    sectionHeader.style.background = "#333";
    sectionHeader.style.color = "#fff";
    sectionHeader.style.textAlign = "left";
    sectionHeader.style.border = "none";
    sectionHeader.style.cursor = "pointer";
    sectionHeader.onclick = function () {
      sectionContent.style.display = sectionContent.style.display === "none" ? "block" : "none";
    };
    section.appendChild(sectionHeader);

    // Collapsible content (the buttons for the skills)
    const sectionContent = document.createElement("div");
    sectionContent.style.display = "none"; // Initially hidden

    affixList.forEach(function (affix) {
      const buttonWrapper = document.createElement("div");
      buttonWrapper.style.display = "flex";
      buttonWrapper.style.marginBottom = "10px";
      buttonWrapper.style.alignItems = "center"; // Align input and button

      const button = document.createElement("button");
      button.textContent = affix.name;

      const inputField = document.createElement("input");
      inputField.type = "number";
      inputField.min = 1;
      inputField.max = 100;
      inputField.value = 10; // Default min value
      inputField.style.marginBottom = "10px";
      inputField.style.width = "70px"; // Wider input field
      inputField.style.marginLeft = "10px"; // Space between button and input
      button.onclick = function () {
        modifyUrl(affix.id, inputField.value); // Pass the value from input
      };

      buttonWrapper.appendChild(button);
      buttonWrapper.appendChild(inputField);
      sectionContent.appendChild(buttonWrapper);
    });

    section.appendChild(sectionContent);
    sidebar.appendChild(section);
  }

  // Affix list (grouped by character skills - Third Section)
  const characterSkills = {
    "Paladin Skills": [
      { name: "Paladin Skills", id: 442 },
      { name: "Offensive Auras", id: 444 },
      { name: "Defensive Auras", id: 461 },
      { name: "Combat Skills", id: 462 },
    ],
    "Sorceress Skills": [
      { name: "Sorceress Skills", id: 514 },
      { name: "Fire Skills", id: 514 },
      { name: "Cold Skills", id: 513 },
      { name: "Lightning Skills", id: 512 },
    ],
    "Barbarian Skills": [
      { name: "Barbarian Skills", id: 403 },
      { name: "War Cry Skills", id: 406 },
      { name: "Barb Combat Skills", id: 404 },
      { name: "Barb Masteries Skills", id: 405 },
    ],
    "Amazon Skills": [
      { name: "Amazon Skills", id: 453 },
      { name: "Javelin Skills", id: 456 },
      { name: "Bow Skills", id: 454 },
      { name: "Passive Skills", id: 455 },
    ],
    "Necromancer Skills": [
      { name: "Necromancer Skills", id: 498 },
      { name: "Curses", id: 499 },
      { name: "Poison & Bone", id: 500 },
      { name: "Summoning Skills", id: 501 },
    ],
    "Druid Skills": [
      { name: "Druid Skills#1", id: 484 },
      { name: "Druid Skills#2", id: 488 },
      { name: "Elemental Skills", id: 487 },
      { name: "Shape Shifting Skills", id: 486 },
      { name: "Summoning Skills", id: 485 },
    ],
    "Assassin Skills": [
      { name: "Assassin Skills#1", id: 407 },
      { name: "Assassin Skills#2", id: 519 },
      { name: "Shadow Disciplines Skills", id: 409 },
      { name: "Martial Arts Skills", id: 410 },
      { name: "Traps Skills", id: 408 },
    ]
  };

  // Create collapsible sections for each character class's skills
  for (const title in characterSkills) {
    const affixList = characterSkills[title];
    createCollapsibleSection(title, affixList);
  }
}

// Initialize the sidebar with buttons
createAffixButtons();
