const table = document.querySelector(".itemlist");
const tbody = document.querySelector(".itemlist tbody");
const allNodes = document.querySelector(".itemlist tbody").childNodes;
const allScoreNodes = document.querySelectorAll(".score");

/* Array methods such as sort() and findIndex() do not exist on a NodeList
so we need to convert the NodeLists into arrays
*/
const allNodesArray = Array.prototype.slice.call(allNodes, 0);
const allScoresArray = Array.prototype.slice.call(allScoreNodes, 0);

let result = [];

/*
The score is inside a <span> element which looks like this:
<span class="score" id="score_23802208">307 points</span>
This sort function extracts out the score from the text and sorts
all of them in descending order. 
*/
allScoresArray.sort((a, b) => {
  const aScore = a.innerText.split(" ")[0];
  const bScore = b.innerText.split(" ")[0];

  return bScore - aScore;
});

/*
THe <span> element has an id on in the format id="score_23802208".
The number at the end corresponds to the element ID of a node inside
the tbody list. 

Each post contains a three DOM nodes associatde with it: the title, 
the subtext, and a spacer. It looks like this:

<tr class="athing" id="23802645">
<tr></tr>
<tr class="spacer" style="height:5px"></tr>

We will use the element ID found on the score to find the "athing"
node associated with it. From there we can also grab the other 2 
associated DOM nodes. 

Laslty, we can append all 3 of these nodes to an array, which we 
will use to render the final DOM
*/
allScoresArray.forEach((scoreElement) => {
  const elementId = scoreElement.id.split("_")[1];

  const athingIndex = allNodesArray.findIndex((node) => node.id === elementId);

  result = [
    ...result,
    allNodes[athingIndex],
    allNodes[athingIndex + 1],
    allNodes[athingIndex + 2],
    allNodes[athingIndex + 3],
  ];
});

/*
Delete the old <tbody> and replace it with a new one
*/
tbody.parentNode.removeChild(tbody);
table.appendChild(document.createElement("tbody"));

/*
Populate the new <tbody> with the sorted list of DOM nodes
*/
const newTBody = document.querySelector(".itemlist tbody");
result.forEach((item) => {
  newTBody.appendChild(item);
});
