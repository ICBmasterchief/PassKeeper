
let drawData = (data) => {
    deleteElements("li")
    data.forEach(category => {
      let parent = document.getElementsByTagName('ul')[0]
      if (parent){
        let child = document.createElement('li')
        child.setAttribute("id", "c-"+category.id)
        child.setAttribute("data-id", category.id)
        child.setAttribute("class", "list-group-item")
        child.innerHTML = `<div class="div__category"><span class="span__category" onclick="getCategory('${child.getAttribute("data-id")}'); categoryTitle('${category.name}');">${category.name}</span><span class="span__delete-category"><button onclick="deleteCategory(${category.id})" class="button__delete"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg></button></span></div>`
        console.log(parent);
        parent.appendChild(child)
      }
    })
  }

  function categoryTitle(categoryName) {
    let element = document.getElementById('category-title')
    element.innerText = categoryName
    console.log(element)
  }

  function getCategory(idCategory) {
    localStorage.setItem("idCategory", idCategory)
    fetch(`http://localhost:3000/categories/${idCategory}`)
    .then(res => res.json())
    .then(category => drawTable(category))
  }

  function deleteCategory(idCategory) {
    fetch(`http://localhost:3000/categories/${idCategory}`, { method: 'DELETE' })
    .then(res => {
      deleteElements(".container tbody tr")
      categoryTitle("")
      let child = document.getElementById("c-"+idCategory)
      child.remove()
    })
  }

  function addCategory(categoryName) {
    const payload = {
      name: categoryName
    }

    fetch(`http://localhost:3000/categories/`, { 
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => getAllCategories())
  }

  function deleteSite(idSite) {
    fetch(`http://localhost:3000/sites/${idSite}`, { method: 'DELETE' })
    .then(res => {
      let child = document.getElementById("s-"+idSite)
      child.remove()
    })
  }

  function addSite(siteName, siteUrl, siteUser, sitePassword, siteDescription) {
    const payload = {
        name: siteName,
        url: siteUrl,
        user: siteUser,
        password: sitePassword,
        description: siteDescription
      }
      fetch(`http://localhost:3000/categories/${localStorage.getItem("idCategory")}`, { 
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => getAllCategories()) 
  }

  function drawTable(category) {
    deleteElements(".container tbody tr")
    category.sites.forEach(site => {
      let svg = document.createElement("div")
      svg.onclick = function() {deleteSite(site.id)}
      svg.innerHTML = `<button class="button__delete" onclick="deleteSite(${site.id})"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg></button>`
      let parent = document.getElementsByTagName("tbody")[0]
      let secondParent = document.createElement("tr")
      secondParent.setAttribute("id", "s-"+site.id)
      secondParent.setAttribute("data-id", site.id) 
      addTableElements("td", site.name, secondParent)
      addTableElements("td", site.url, secondParent)
      addTableElements("td", site.user, secondParent)
      addTableElements("td", site.password, secondParent)
      addTableElements("td", svg.innerHTML, secondParent)
      parent.appendChild(secondParent)
    })
  }

  function deleteElements(selector) {
    var elementsToDelete = document.querySelectorAll(selector)
    var elementsArray = Array.from(elementsToDelete)

    elementsArray.forEach(function(element) {
      element.remove();
    });
  }

  function addTableElements(selector, content, parent) {
    let child = document.createElement(selector)
    child.innerHTML = content
    parent.appendChild(child)
  }

  function openCategoryModal() {
    document.getElementById('categoryModal').style.display = 'block'
    document.getElementById('modalOverlay').style.display = 'block'
  }

  function closeCategoryModal() {
    document.getElementById('categoryModal').style.display = 'none'
    document.getElementById('modalOverlay').style.display = 'none'
    document.getElementById('categoryName').value = ""
  }

  function addCategoryButton() {
    let categoryName = document.getElementById('categoryName').value
    if (categoryName != null && categoryName != "") {
      addCategory(categoryName)
      alert('Added category: ' + categoryName)
      closeCategoryModal()
    } else {
      alert('You must write a name!')
    }
  }

  function saveSiteButton() {
    let siteName = document.getElementById('input_name').value
    let siteUrl = document.getElementById('input_url').value
    let siteUser = document.getElementById('input_user').value
    let sitePassword = document.getElementById('input_password').value
    let siteDescription = document.getElementById('input_description').value
    if (siteName != null && siteName != "" && siteUrl != null && siteUrl != "" && siteUser != null && siteUser != "" && sitePassword != null && sitePassword != "") {
      addSite(siteName, siteUrl, siteUser, sitePassword, siteDescription)
      alert('Added site: ' + siteName)
      returnToIndex()
    } else {
      alert('You must write all the requiered fields!')
    }
  }

  function openAddSitePage() {
    if (localStorage.getItem("idCategory") != 0) {
        window.location.replace("./add-site.html")
    } else {
        alert('You must select a category first!')
    }
  }

  function returnToIndex() {
    window.location.replace("./index.html")
  }

  function getAllCategories() {
    fetch("http://localhost:3000/categories")
      .then(res => res.json())
      .then(data => drawData(data))
  }

  getAllCategories()