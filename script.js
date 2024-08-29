const openBtn = document.getElementById('open-sidebar');
const sidebar = document.getElementById('left-sidebar');

openBtn.addEventListener('click', () => {
  console.log("clicked open button");
  sidebar.classList.add('open');
  openBtn.style.display = 'none';
  sidebar.innerHTML = `
    <div class="sidebar-header">Journey Board</div>
    <div class="sidebar-links">
    
    <div class="sidebar-link-title">Explore the world of management </div>
    <ul>
    <li class="sidebar-link"> Technical Project Management </li>
        <li class="sidebar-link"> Threadbuild </li>
        <li class="sidebar-link"> Struture your pointers </li>
        <li class="sidebar-link"> 4SA Method </li>
      </ul>
    </div>
    <button id="close-sidebar" class="toggle-btn">&#9664;</button>
  `;


  const closeBtn = document.getElementById('close-sidebar');
  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
    openBtn.style.display = 'block';
    sidebar.innerHTML = `
     <div class="top-left-sidebar"> </div>
        <div class="sidebar-content">
            <div class="sidebar-item">
                <p class="sidebar-number">1</p>
            </div>
        </div>
    `;
  });
});



async function fetchData() {
  try {
    const response = await fetch('https://dev.deepthought.education/assets/uploads/files/files/others/ddugky_project.json');
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}


function renderAsset(asset) {
  // Use a switch statement or conditional logic to handle different asset types
  switch (asset.type) {
    case "image":
      return `<img src="${asset.url}" alt="${asset.altText}">`;
    case "video":
      return `<iframe width="${asset.width}" height="${asset.height}" src="${asset.url}" frameborder="0" allowfullscreen></iframe>`;
    case "text":
      return `<p>${asset.text}</p>`;
    default:
      return `<div>Unsupported asset type: ${asset.type}</div>`;
  }
}


function renderTask(task) {
    let assetHtml = "";
    // Loop through each asset in the task
    for (const asset of task.assets) {
      assetHtml += renderAsset(asset);
    }
    return `
      <div class="task">
        <h2>${task.title}</h2>
        <div class="task-content">
          ${assetHtml}
        </div>
      </div>
    `;
  }
  


async function renderTasks() {
  try {
    const jsonData = await fetchData();
    const tasks = jsonData.tasks;

    let tasksHtml = '';
    for (const task of tasks) {
      tasksHtml += renderTask(task);
    }

    document.getElementById('task-container').innerHTML = tasksHtml;
  } catch (error) {
    console.error('Error rendering tasks:', error);
  }
}

// Call the rendering function
fetchData().then(renderTasks).catch(console.error);

