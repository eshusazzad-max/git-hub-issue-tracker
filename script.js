
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
