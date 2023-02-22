class CakewalkTags {
    constructor(_domIds, _existingTagsList) {

        this.containerId = _domIds.containerId
        this.hiddenInput = _domIds.hiddenInputId
        
        this.container = document.getElementById(this.containerId)
        this.existingTagsList = _existingTagsList
        this.filteredTagsList = []
        this.selectedTags = []

        this.container.setAttribute("class", "cakewalk_tags_container")

        this.tagsDisplayDiv = document.createElement("div")
        this.tagsDisplayDiv.setAttribute("id", this.containerId + "_tags_display")
        this.tagsDisplayDiv.setAttribute("class", "cakewalk_tags_display")
        this.container.appendChild(this.tagsDisplayDiv)

        this.inputField = document.createElement("input")
        this.inputField.setAttribute("type", "text")
        this.inputField.setAttribute("placeholder", "Enter tag")
        this.inputField.setAttribute("id", this.containerId + "_input")
        this.inputField.setAttribute("class", "cakewalk_tags_input")
        this.container.appendChild(this.inputField)

        this.hiddenInputField = document.createElement("input")
        this.hiddenInputField.setAttribute("type", "hidden")
        this.hiddenInputField.setAttribute("id", this.hiddenInput)
        this.container.appendChild(this.hiddenInputField)

        this.clearButton = document.createElement("button")
        this.clearButton.setAttribute("id", this.containerId + "_clear")
        this.clearButton.setAttribute("class", "cakewalk_tags_clear_button")
        this.clearButton.innerText = "Clear"
        this.container.appendChild(this.clearButton)

        this.tagsResultsDiv = document.createElement("div")
        this.tagsResultsDiv.setAttribute("id", this.containerId + "_results")
        this.tagsResultsDiv.setAttribute("class", "cakewalk_tags_results")
        this.container.appendChild(this.tagsResultsDiv)

        this.inputField.addEventListener('keyup', this.addTags.bind(this), false)
        this.clearButton.addEventListener('click', this.clearTags.bind(this), false)
        this.tagsDisplayDiv.addEventListener('click', this.removeTag.bind(this), true)
        this.tagsResultsDiv.addEventListener('click', this.addTagFromResults.bind(this))

    }

    displayExistingTags() {
        document.getElementById(this.tagsResultsDiv.id).innerHTML = this.filteredTagsList.map(existingTag => "<span class='cakewalk_tags_existing_tag'>" + existingTag + "</span>").join("")
    }

    addTags(e) {
        this.#updateFilteredList()
        this.displayExistingTags()
        if (e.key == ',') {
            let tag = e.target.value.split(",")[0]
            this.addTag(tag, e)
            e.target.value = ""
        }
    }

    addTag(tag) {
        let seperator = this.selectedTags.length > 0 ? "," : ""
        if (this.selectedTags.includes(tag)) {
            this.inputField.value =  ""
            return
        }
        this.tagsDisplayDiv.innerHTML += "<span class='tag'>" + tag + "<span class='close'>&times;</span></span>"
        this.hiddenInputField.value = this.selectedTags.join(",") + seperator + tag
        this.selectedTags.push(tag)
        this.#updateFilteredList()
        this.displayExistingTags()
    }

    addTagFromResults(e) {
        if(e.target && e.target.classList[0]== 'cakewalk_tags_existing_tag') {
            let tag = e.target.innerText
            this.addTag(tag)
        }
    }

    removeTag(e) {
        if(e.target && e.target.classList[0]== 'close') {
            var tagToRemove = e.target.parentElement
            tagToRemove.remove()
            this.selectedTags = this.selectedTags.filter(x => x != tagToRemove.firstChild.textContent)
            this.hiddenInputField.value = this.selectedTags.join(",")
            this.#updateFilteredList()
            this.displayExistingTags()
        }
    }

    clearTags(e) {
        this.tagsDisplayDiv.textContent = ""
        this.tagsResultsDiv.innerHTML = ""
        this.inputField.value = ""
        this.hiddenInputField.value = ""
        this.selectedTags = []
    }

    #updateFilteredList() {
        this.filteredTagsList = (this.inputField.value == "") ? [] : this.existingTagsList.filter(tag => (tag.includes(this.inputField.value) && !this.selectedTags.includes(tag)))
    }

}