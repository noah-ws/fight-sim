var entityCustomizerID = 0; // ID generator
var colorPickerContainerVisible = false;
var shapePickerContainerVisible = false;
var removeID = 0;
const INDICATOR_HIGHLIGHT_COLOR = "rgb(142, 255, 128)";

const randomWords = ["wing",
    "tomato", "lizard", "spoon", "night", "robin", "blade", "hammer", "friend", "scarecrow", "giraffe", "deer", "cabbage", "queen",
    "ink", "potato", "kitty", "popcorn", "squirrel", "bubble", "loaf", "bear", "boy", "ray", "yam", "doll", "spark", "goose", "yoke", "egg"];



let regEx = /\d+/;

var colorPickerContainer = document.getElementById(`entity-customizer-color-picker0`);
var shapePickerContainer = document.getElementById(`entity-customizer-shape-picker0`);
var sidenav = document.getElementById("sidenav");
var entitySelector = document.getElementById("entity-selector");

addEntityCustomizerListeners(0);
var prevHighlightedIndicator = document.getElementById(`selector-indicator0`);
prevHighlightedIndicator.style.backgroundColor = INDICATOR_HIGHLIGHT_COLOR;

window.addEventListener("click", function () {
    if (colorPickerContainerVisible) {
        colorPickerContainer.style.visibility = "hidden";
        colorPickerContainerVisible = false;
    }
    if (colorPickerContainer.style.visibility == "visible") {
        colorPickerContainerVisible = true;
    }

    if (shapePickerContainerVisible) {
        shapePickerContainer.style.visibility = "hidden";
        shapePickerContainerVisible = false;
    }
    if (shapePickerContainer.style.visibility == "visible") {
        shapePickerContainerVisible = true;
    }
});

sidenav.addEventListener("scroll", function () {
    if (colorPickerContainerVisible) {
        colorPickerContainer.style.visibility = "hidden";
        colorPickerContainerVisible = false;
    }
    if (colorPickerContainer.style.visibility == "visible") {
        colorPickerContainerVisible = true;
    }

    if (shapePickerContainerVisible) {
        shapePickerContainer.style.visibility = "hidden";
        shapePickerContainerVisible = false;
    }
    if (shapePickerContainer.style.visibility == "visible") {
        shapePickerContainerVisible = true;
    }
});


function addEntityCustomizerBox() {
    var newID = entityCustomizerID + 1;

    var newCustomizer = `<div class="entity-customizer-container" id="entity-customizer-container${newID}">` +
        `<div class="entity-customizer-header" id="entity-customizer-header${newID}">` +
        `<input type="text" class="entity-customizer-text-box" placeholder="Enter a fighter name..."` +
        `id="entity-customizer-name-text-box${newID}" value="Square${newID}" />` +
        `<div class="spacer" id="spacer${newID}"></div>` +
        `<button class="entity-customizer-minimize" id="entity-customizer-minimize${newID}" minimized="false">-</button>` +
        `<div class="spacer" id="spacer${newID}"></div>` +
        `<button class="entity-customizer-delete" id="entity-customizer-delete${newID}">x</button>` +
        `</div>` +
        `<div class="spacer-col" id="spacer-col${newID}"></div>` +
        `<div class="rounded-divider" id="rounded-divider${newID}"></div>` +
        `<div class="spacer-col" id="spacer-col${newID}"></div>` +
        `<div class="entity-shape-row" id="entity-shape-row${newID}">` +
        `<label class="shape-label" for="entity-customizer-shape-dropdown${newID}" id="shape-label${newID}">Shape:</label>` +
        `<div class="spacer" id="spacer${newID}"></div>` +
        `<div class="shape-pick-container" id="shape-pick-container${newID}">` +
        `<div class="entity-customizer-container-shape-pick-square-visual" id="entity-customizer-container-shape-pick-square-visual${newID}"></div>` +
        `</div>` +
        `</div>` +
        `<div class="entity-customizer-shape-picker" id="entity-customizer-shape-picker${newID}">` +
        `<div class="entity-customizer-shape-picker-box" id="entity-customizer-shape-picker-box${newID}">` +
        `<div class="entity-customizer-container-shape-pick-row" id="entity-customizer-container-shape-pick-row${newID}">` +
        `<div class="entity-customizer-container-shape-pick-square" id="entity-customizer-container-shape-pick-square${newID}"></div>` +
        `<div class="entity-customizer-container-shape-pick-circle" id="entity-customizer-container-shape-pick-circle${newID}"></div>` +
        `<div class="entity-customizer-container-shape-pick-triangle" id="entity-customizer-container-shape-pick-triangle${newID}"></div>` +
        `</div>` +
        `</div>` +
        `<div class="entity-customizer-shape-picker-pointer" id="entity-customizer-shape-picker-pointer${newID}"></div>` +
        `</div>` +
        `<div class="spacer-col" id="spacer-col${newID}"></div>` +
        `<div class="entity-speed-row" id="entity-speed-row${newID}">` +
        `<label class="speed-label" for="entity-customizer-speed-text-box${newID}" id="speed-label${newID}">Speed:</label>` +
        `<div class="spacer" id="spacer${newID}"></div>` +
        `<input type="range" class="entity-customizer-speed-slider" id="entity-customizer-speed-slider${newID}" min="${speedMin}" max="${speedMax}" value="15" />` +
        `</div>` +
        `<div class="spacer-col" id="spacer-col${newID}"></div>` +
        `<div class="entity-size-row" id="entity-size-row${newID}">` +
        `<label class="size-label" for="entity-customizer-size-text-box${newID}" id="size-label${newID}">Size:</label>` +
        `<div class="spacer" id="spacer${newID}"></div>` +
        `<input type="range" class="entity-customizer-size-slider" id="entity-customizer-size-slider${newID}" min="${sizeMin}" max="${sizeMax}" value="15" />` +
        `</div>` +
        `<div class="spacer-col" id="spacer-col${newID}"></div>` +
        `<div class="entity-color-row" id="entity-color-row${newID}">` +
        `<label class="color-label" for="entity-customizer-color-box" id="color-label${newID}">Color:</label>` +
        `<div class="spacer" id="spacer${newID}"></div>` +
        `<div class="entity-customizer-color-box" id="entity-customizer-color-box${newID}"></div>` +
        `</div>` +
        `<div class="entity-customizer-color-picker" id="entity-customizer-color-picker${newID}">` +
        `<div class="entity-customizer-color-picker-box" id="entity-customizer-color-picker-box${newID}">` +
        `<div class="entity-customizer-color-picker-wheel" id="entity-customizer-color-picker-wheel${newID}"></div>` +
        `</div>` +
        `<div class="entity-customizer-color-picker-pointer" id="entity-customizer-color-picker-pointer${newID}"></div>` +
        `</div>` +
        `<div class="spacer-col" id="spacer-col${newID}"></div>` +
        `<div class="matchups-label" for="entity-customizer-matchups-box" id="matchups-label${newID}">Matchups:</div>` +
        `<div class="entity-customizer-matchups-container" id="entity-customizer-matchups-container${newID}">` +
        `<table class="matchups-table" id="matchups-table${newID}">` +
        `<thead>` +
        `<tr>` +
        `<th>Name</th>` +
        `<th>Prey</th>` +
        `<th>Predator</th>` +
        `</tr>` +
        `</thead>` +
        `<tbody class="tbody" id="tbody${newID}"></tbody>` +
        `</table>` +
        `</div>` +
        `<div class="spacer-col" id="spacer-col${newID}"></div>` +
        `</div>`;

    var customizer = document.getElementById(`entity-customizer-container${entityCustomizerID}`);
    customizer.insertAdjacentHTML('afterend', newCustomizer);

    entityCustomizerID++;
    addEntityCustomizerListeners(newID);
}

function createSelector(newID, name, shape, randomColor) {
    let selectorContainer = document.createElement("div");
    selectorContainer.setAttribute("class", "selector-option-container");
    selectorContainer.setAttribute("id", `selector-option-container${newID}`);
    let selectorRow = document.createElement("div");
    selectorRow.setAttribute("class", "selector-option-row");
    selectorRow.setAttribute("id", `selector-option-row${newID}`);
    let selectorIndicator = document.createElement("div");
    selectorIndicator.setAttribute("class", "selector-indicator");
    selectorIndicator.setAttribute("id", `selector-indicator${newID}`);
    let spacer = document.createElement("div");
    spacer.setAttribute("class", "spacer");
    let selectorShape = document.createElement("div");
    selectorShape.setAttribute("class", `${shape}-selector-option`);
    selectorShape.setAttribute("id", `${shape}-selector-option${newID}`);
    selectorShape.style.backgroundColor = `${randomColor}`;
    let spacerCol = document.createElement("div");
    spacerCol.setAttribute("class", "spacer-col");
    let selectorLabel = document.createElement("div");
    selectorLabel.setAttribute("class", "selector-option-label");
    selectorLabel.setAttribute("id", `selector-option-label${newID}`);
    selectorLabel.innerHTML += name;

    selectorContainer.appendChild(selectorRow);
    selectorContainer.appendChild(spacerCol);
    selectorContainer.appendChild(selectorLabel);

    selectorRow.appendChild(selectorIndicator);
    selectorRow.appendChild(spacer);
    selectorRow.appendChild(selectorShape);

    return selectorContainer;
}

function createMatchupRow(ownerID, referenceID) {
    let groupTableRow = document.createElement("tr");
    groupTableRow.setAttribute("class", `matchup-row-${groups[referenceID].name}${referenceID}`);
    groupTableRow.setAttribute("id", `matchup-row-${groups[referenceID].name}${referenceID}${ownerID}`);
    let groupTableRowLabel = document.createElement("td");
    let groupTableRowPredator = document.createElement("td");
    let groupTableRowPrey = document.createElement("td");
    let groupTableRowPredatorCheckBox = document.createElement("input");
    groupTableRowPredatorCheckBox.setAttribute("type", "checkbox");
    groupTableRowPredatorCheckBox.setAttribute("class", `matchup-predator-${groups[referenceID].name}${referenceID}-`);
    groupTableRowPredatorCheckBox.setAttribute("id", `matchup-predator-${groups[referenceID].name}${referenceID}-${ownerID}`);
    let groupTableRowPreyCheckBox = document.createElement("input");
    groupTableRowPreyCheckBox.setAttribute("type", "checkbox");
    groupTableRowPreyCheckBox.setAttribute("class", `matchup-prey-${groups[referenceID].name}${referenceID}-`);
    groupTableRowPreyCheckBox.setAttribute("id", `matchup-prey-${groups[referenceID].name}${referenceID}-${ownerID}`);
    groupTableRowLabel.innerHTML = `${groups[referenceID].name}`;
    groupTableRowPredator.appendChild(groupTableRowPredatorCheckBox);
    groupTableRowPrey.appendChild(groupTableRowPreyCheckBox);
    groupTableRow.appendChild(groupTableRowLabel);
    groupTableRow.appendChild(groupTableRowPrey);
    groupTableRow.appendChild(groupTableRowPredator);

    return groupTableRow;
}

function addEntityCustomizerListeners(newID) {
    // TODO: randomShape
    var randomShape = "square";
    var randomName = randomWords[Math.floor(Math.random() * randomWords.length)];
    var randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    var randomSpeed = Math.floor(Math.random() * (speedMax - speedMin) + speedMin);
    var randomSize = Math.floor(Math.random() * (sizeMax - sizeMin) + sizeMin);

    groups.push({
        name: randomName,
        id: newID,
        color: randomColor,
        size: randomSize * sizeMultiplier,
        speed: randomSpeed * speedMultiplier,
        shape: "square",
        members: [],
        beats: [],
        loses: [],
    });
    console.log(groups);

    // container
    var container = document.getElementById(`entity-customizer-container${newID}`);
    var headerDivider = document.getElementById(`rounded-divider${newID}`);
    var shapeRow = document.getElementById(`entity-shape-row${newID}`);
    var shapeBox = document.getElementById(`shape-pick-container${newID}`);
    var speedRow = document.getElementById(`entity-speed-row${newID}`);
    var sizeRow = document.getElementById(`entity-size-row${newID}`);
    var colorRow = document.getElementById(`entity-color-row${newID}`);
    var colorBox = document.getElementById(`entity-customizer-color-box${newID}`);
    var matchupsLabel = document.getElementById(`matchups-label${newID}`);
    var matchupsContainer = document.getElementById(`entity-customizer-matchups-container${newID}`);
    var minimizer = document.getElementById(`entity-customizer-minimize${newID}`);
    var closer = document.getElementById(`entity-customizer-delete${newID}`);

    var nameTextBox = document.getElementById(`entity-customizer-name-text-box${newID}`);
    var speedSlider = document.getElementById(`entity-customizer-speed-slider${newID}`);
    var sizeSlider = document.getElementById(`entity-customizer-size-slider${newID}`);

    speedSlider.value = randomSpeed;
    sizeSlider.value = randomSize;
    nameTextBox.value = "" + randomName;
    colorBox.style.backgroundColor = randomColor;

    document.getElementById(`entity-customizer-container-shape-pick-${groups[newID].shape}-visual${newID}`).style.backgroundColor = randomColor;
    document.getElementById(`entity-customizer-container-shape-pick-square${newID}`).style.backgroundColor = randomColor;
    document.getElementById(`entity-customizer-container-shape-pick-circle${newID}`).style.backgroundColor = randomColor;
    document.getElementById(`entity-customizer-container-shape-pick-triangle${newID}`).style.borderBottomColor = randomColor;

    var selector = createSelector(newID, randomName, randomShape, randomColor);
    selector.addEventListener("click", function() {
        let id = this.id.match(regEx)[0]
        let indicator = document.getElementById(`selector-indicator${id}`);

        if (indicator.style.backgroundColor == INDICATOR_HIGHLIGHT_COLOR) {
            return;
        }
        else {
            prevHighlightedIndicator.style.backgroundColor = "transparent";
            selectedEntityIndex = id;
            indicator.style.backgroundColor = INDICATOR_HIGHLIGHT_COLOR;
            prevHighlightedIndicator = indicator;
        }
    });

    entitySelector.appendChild(selector);

    //speed slider
    speedSlider.oninput = function() {
        let id = this.id.match(regEx)[0];
        let newSpeedValue = this.value * speedMultiplier
        groups[id].speed = newSpeedValue;
        groups[id].members.forEach(m => m.speed = newSpeedValue);
    }

    // size slider
    sizeSlider.oninput = function() {
        let id = this.id.match(regEx)[0];
        let newSizeValue = this.value * sizeMultiplier;
        groups[id].size = newSizeValue
        groups[id].members.forEach(m => {
            m.size = newSizeValue;
            m.group.scale.set(newSizeValue, newSizeValue, newSizeValue);
        });
    }

    shapeBox.addEventListener("click", function () {
        let id = this.id.match(regEx)[0];

        var e = window.event;
        var posX = e.clientX + 30;
        var posY = e.clientY - 35;

        shapePickerContainer.style.visibility = "hidden";
        shapePickerContainer = document.getElementById(`entity-customizer-shape-picker${id}`);

        shapePickerContainer.style.top = posY + "px";
        shapePickerContainer.style.left = posX + "px";
        shapePickerContainer.style.visibility = "visible";
    });

    // color picker
    var colorPicker = new iro.ColorPicker(`#entity-customizer-color-picker-wheel${newID}`, {
        width: 140, color: randomColor,
    });
    colorPicker.on("color:change", function (color) {
        let id = this.el.id.match(regEx)[0];
        groups[id].color = color.hexString;
        document.getElementById(`entity-customizer-color-box${id}`).style.backgroundColor = color.hexString;
        document.getElementById(`${groups[id].shape}-selector-option${id}`).style.backgroundColor = color.hexString;

        console.log(id);

        document.getElementById(`entity-customizer-container-shape-pick-${groups[id].shape}-visual${id}`).style.backgroundColor = color.hexString;
        document.getElementById(`entity-customizer-container-shape-pick-square${id}`).style.backgroundColor = color.hexString;
        document.getElementById(`entity-customizer-container-shape-pick-circle${id}`).style.backgroundColor = color.hexString;
        document.getElementById(`entity-customizer-container-shape-pick-triangle${id}`).style.borderBottomColor = color.hexString;


        for (let i = 0; i < groups[id].members.length; i++) {
            groups[id].members[i].updateColor(color.hexString);
        }
    });

    // color selector event
    colorBox.addEventListener("click", function () {
        let id = this.parentElement.parentElement.id.match(regEx)[0];

        var e = window.event;
        var posX = e.clientX + 45;
        var posY = e.clientY - 85;

        colorPickerContainer.style.visibility = "hidden";
        colorPickerContainer = document.getElementById(`entity-customizer-color-picker${id}`);

        colorPickerContainer.style.top = posY + "px";
        colorPickerContainer.style.left = posX + "px";
        colorPickerContainer.style.visibility = "visible";
    });

    // minimizer event
    minimizer.addEventListener("click", function () {
        var minimized = minimizer.getAttribute("minimized");

        if (minimized == "true") { // maximize
            minimizer.setAttribute("minimized", "false");
            minimizer.innerHTML = "-";

            headerDivider.style.visibility = "visible";
            shapeRow.style.visibility = "visible";
            speedRow.style.visibility = "visible";
            sizeRow.style.visibility = "visible";
            colorRow.style.visibility = "visible";
            matchupsLabel.style.visibility = "visible";
            matchupsContainer.style.visibility = "visible";
            container.style.height = "35%"
        }
        else { // minimize
            minimizer.setAttribute("minimized", "true");
            minimizer.innerHTML = "+";

            headerDivider.style.visibility = "hidden";
            shapeRow.style.visibility = "hidden";
            speedRow.style.visibility = "hidden";
            sizeRow.style.visibility = "hidden";
            colorRow.style.visibility = "hidden";
            matchupsLabel.style.visibility = "hidden";
            matchupsContainer.style.visibility = "hidden";
            container.style.height = "1.3%"
        }
    });

    // closer event
    if (newID != 0) {
        closer.addEventListener("click", function () {
            removeID = container.id.match(regEx)[0];

            console.log(`selector-option-container${removeID}`);

            // remove from entity selector
            document.getElementById(`selector-option-container${removeID}`).remove();

            let allMatchupTables = document.getElementsByClassName("tbody");
            for (let i = 0; i < allMatchupTables.length; i++) {
                if (removeID != i) {
                    document.getElementById(`matchup-row-${groups[removeID].name}${removeID}${i}`).remove();

                    // if present in beats, remove
                    for (let j = 0; j < groups[i].beats.length; j++) {
                        if (groups[i].beats[j].id == removeID) groups[i].beats.splice(j, 1);
                    }

                    // if present in loses, remove
                    for (let j = 0; j < groups[i].loses.length; j++) {
                        if (groups[i].loses[j].id == removeID) groups[i].loses.splice(j, 1);
                    }
                }
            }

            // remove customizer
            container.remove();
            groups.splice(removeID, 1);

            // if selected was deleted, set previous as selected
            if (selectedEntityIndex == removeID) {
                selectedEntityIndex--;
                prevHighlightedIndicator = document.getElementById(`selector-indicator${selectedEntityIndex}`);
                prevHighlightedIndicator.style.backgroundColor = INDICATOR_HIGHLIGHT_COLOR;
            }
            // if selected was after delete, shift selected back by one
            else {
                selectedEntityIndex = removeID < selectedEntityIndex ? selectedEntityIndex - 1 : selectedEntityIndex;
            }
            console.log(selectedEntityIndex);

            // update ids
            let customizers = document.getElementsByClassName("entity-customizer-container")
            let selectorOptionContainers = document.getElementsByClassName("selector-option-container");
            for (let i = 0; i < customizers.length; i++) {
                changeElementID(customizers[i], i);
                changeElementID(selectorOptionContainers[i], i);

                groups[i].id = i;
                // shift id's of members
                for (let j = 0; j < groups[i].members.length; j++) {
                    groups[i].members[j].id = i;
                }
            }
            entityCustomizerID--;

            console.log(groups);
        });
    }

    var tableBody = document.getElementById(`tbody${newID}`);
    // add all other groups to this group's matchups
    for (let i = 0; i < entityCustomizerID; i++) {
        if (newID != i) {
            let otherGroupTableBody = document.getElementById(`tbody${i}`);

            
            // adds this group to all other group's matchups
            let thisGroupTableRow = createMatchupRow(i, newID);
            otherGroupTableBody.appendChild(thisGroupTableRow);
            let thisGroupPredatorCheckbox = document.getElementById(`matchup-predator-${groups[newID].name}${newID}-${i}`);
            let thisGroupPreyCheckbox = document.getElementById(`matchup-prey-${groups[newID].name}${newID}-${i}`);

            thisGroupPredatorCheckbox.addEventListener("change", function (e) {
                let idResults = this.id.match(/\d+/gm);
                let refID = idResults[0];
                let thisID = idResults[1];

                if (this.checked) {
                    addToLoses(thisID, refID);
                    thisGroupPreyCheckbox.disabled = true;
                }
                else {
                    removeFromLoses(thisID, refID);
                    thisGroupPreyCheckbox.disabled = false;
                }

                console.log(groups);
            });

            thisGroupPreyCheckbox.addEventListener("change", function (e) {
                let idResults = this.id.match(/\d+/gm);
                let refID = idResults[0];
                let thisID = idResults[1];

                if (this.checked) {
                    addToBeats(thisID, refID);
                    thisGroupPredatorCheckbox.disabled = true;
                }
                else {
                    removeFromBeats(thisID, refID);
                    thisGroupPredatorCheckbox.disabled = false;
                }

                console.log(groups);
            });


            // adds all other groups to this group's matchups
            let otherGroupTableRow = createMatchupRow(newID, i);
            tableBody.appendChild(otherGroupTableRow);
            let otherGroupPredatorCheckbox = document.getElementById(`matchup-predator-${groups[i].name}${i}-${newID}`);
            let otherGroupPreyCheckbox = document.getElementById(`matchup-prey-${groups[i].name}${i}-${newID}`);

            otherGroupPredatorCheckbox.addEventListener("change", function (e) {
                let idResults = this.id.match(/\d+/gm);
                let thisID = idResults[1];
                let refID = idResults[0];

                if (this.checked) {
                    addToLoses(thisID, refID);
                    otherGroupPreyCheckbox.disabled = true;
                }
                else {
                    removeFromLoses(thisID, refID);
                    otherGroupPreyCheckbox.disabled = false;
                }

                console.log(groups);
            });

            otherGroupPreyCheckbox.addEventListener("change", function (e) {
                let idResults = this.id.match(/\d+/gm);
                let thisID = idResults[1];
                let refID = idResults[0];

                if (this.checked) {
                    addToBeats(thisID, refID);
                    otherGroupPredatorCheckbox.disabled = true;
                }
                else {
                    removeFromBeats(thisID, refID);
                    otherGroupPredatorCheckbox.disabled = false;
                }

                console.log(groups);
            });
        }
    }
}

function addToBeats(groupID, groupRefID) {
    let group = groups[groupID];
    let groupRef = groups[groupRefID];

    // adds to group info
    group.beats.push(groupRef);

    // adds each prey to each member in group
    for (let i = 0; i < group.members.length; i++) {
        for (let j = 0; j < groupRef.members.length; j++) {
            group.members[i].preys.push(groupRef.members[j]);
        }
    }
}

function removeFromBeats(groupID, groupRefID) {
    let group = groups[groupID];

    // remove from group info
    for (let i = 0; i < group.beats.length; i++) {
        if (group.beats[i].id == groupRefID) group.beats.splice(i, 1);
    }

    // remove from member's list
    let removeList = [];
    for (let i = 0; i < group.members.length; i++) {
        for (let j = 0; j < group.members[i].preys.length; j++) {
            if (group.members[i].preys[j].id == groupRefID) removeList.push(group.members[i].preys[j]);
        }

        group.members[i].preys = group.members[i].preys.filter(ar => !removeList.find(rm => (ar.id == rm.id)));
    }
}

function addToLoses(groupID, groupRefID) {
    let group = groups[groupID];
    let groupRef = groups[groupRefID];

    // adds to group info
    group.loses.push(groupRef);

    // adds each prey to each member in group
    for (let i = 0; i < group.members.length; i++) {
        for (let j = 0; j < groupRef.members.length; j++) {
            group.members[i].predators.push(groupRef.members[j]);
        }
    }
}

function removeFromLoses(groupID, groupRefID) {
    let group = groups[groupID];

    // remove from group info
    for (let i = 0; i < group.loses.length; i++) {
        if (group.loses[i].id == groupRefID) group.loses.splice(i, 1);
    }

    // remove from member's list
    let removeList = [];
    for (let i = 0; i < group.members.length; i++) {
        for (let j = 0; j < group.members[i].predators.length; j++) {
            if (group.members[i].predators[j].id == groupRefID) removeList.push(group.members[i].predators[j]);
        }

        group.members[i].predators = group.members[i].predators.filter(ar => !removeList.find(rm => (ar.id == rm.id)));
    }
}

// Changes the id number of an element and the id number of all of it's children (and their children, etc), recursively
function changeElementID(element, newID) {
    if (element == undefined) return;

    // specific operation for matchup rows
    if (element.parentElement.className == "tbody") {
        let matchupRegEx = /[a-z]+\-[a-z]+\-[a-z]+/
        let prevIDRegEx = /\d{1,2}/
        let matchupRowClassName = element.className.match(matchupRegEx)[0];
        let prevRefID = element.className.match(prevIDRegEx)[0];

        let preyBox = element.children[1].children[0];
        let predBox = element.children[2].children[0];
        let predCheckBoxClassName = predBox.className.match(matchupRegEx)[0];
        let preyCheckBoxClassName = preyBox.className.match(matchupRegEx)[0];

        // only update new ref id if it needs to be shifted (is after deleted customizer)
        let newRefID = prevRefID < removeID ? prevRefID : prevRefID - 1;
        // let newRefID = prevRefID;

        element.setAttribute("class", `${matchupRowClassName}${newRefID}`);
        preyBox.setAttribute("class", `${preyCheckBoxClassName}${newRefID}-`);
        predBox.setAttribute("class", `${predCheckBoxClassName}${newRefID}-`);
    }

    element.setAttribute("id", `${element.className}${newID}`);

    for (let i = 0; i < element.childElementCount; i++) {
        changeElementID(element.children[i], newID);
    }
}