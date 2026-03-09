
const loadingSpinner = document.getElementById("loadingSpinner")
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const issueContainer = document.getElementById("issueContainer")

const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

let allIssues = []

async function loadIssues(){
loadingSpinner.classList.remove("hidden")
const res = await fetch(API_URL)
const data = await res.json()
allIssues = data.data
renderIssues(allIssues)
loadingSpinner.classList.add("hidden")

}

loadIssues()

async function searchIssues(){
const text = searchInput.value
if(text === ""){
renderIssues(allIssues)
return
}
const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)
const data = await res.json()
renderIssues(data.data)
}
searchBtn.onclick = () => {
searchIssues()

}

searchInput.addEventListener("keypress", function(e){

if(e.key === "Enter"){
searchIssues()
}

})

function renderIssues(issues){
issueContainer.innerHTML = ""
issues.forEach(issue => {
const card = document.createElement("div")

card.className = `
card bg-base-100 shadow-sm border-t-4 hover:shadow-md transition duration-200
${issue.status === "open" ? "border-green-500" : "border-purple-500"}
`
card.onclick = () => openIssue(issue.id)

card.innerHTML = `

<div class="card-body p-4">
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<img src="./assets/${issue.status === "open" ? "Open-Status.png" : "Closed-Status.png"}" class="w-5">
</div>

<span class="text-[11px] font-semibold px-3 py-1 rounded-full
${issue.priority === "high" ? "bg-red-100 text-red-600" :
issue.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
"bg-gray-200 text-gray-600"}">
${issue.priority.toUpperCase()}
</span>
</div>
<h2 class="font-semibold text-[14px] mt-3 leading-snug">
${issue.title}
</h2>
<p class="text-[12px] text-gray-500 mt-1 leading-relaxed line-clamp-2">
${issue.description}
</p>
<div class="flex flex-wrap gap-2 mt-3">
${issue.labels
.filter(label => label !== "good first issue")
.map(label => {

let color = "bg-gray-100 text-gray-600"
if(label === "bug") color = "bg-red-100 text-red-500"
if(label === "help wanted") color = "bg-yellow-100 text-yellow-700"
if(label === "enhancement") color = "bg-green-100 text-green-600"
if(label === "documentation") color = "bg-green-100 text-green-600"

return `<span class="text-[11px] font-medium px-2 py-1 rounded-full ${color}">
${label.toUpperCase()}
</span>`

}).join("")}

</div>


<div class="border-t mt-4 pt-3 text-[11px] text-gray-400">

#${issue.id} by ${issue.author}

<br>

${new Date(issue.createdAt).toLocaleDateString()}

</div>

</div>
`
issueContainer.appendChild(card)

})

}

