const handleAllpost = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
  const data = await response.json();
  const posts = data.posts;

  posts.forEach((post) => {
    const allPostContainer = document.getElementById('all-post-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="w-[39.5rem] p-10 border-2 rounded-3xl mb-6 flex gap-8 bg-[#F2F2FF] border-[#5885FD]">
    <div class="indicator">
    <span class="indicator-item badge ${post.isActive?'badge-success':'badge-error'} h-[22px] border-2 top-1.5 right-1.5 border-white"></span>
    <div class="bg-white grid h-20 w-20 rounded-2xl place-items-center"></div>
    </div>
    <div>
    <div class="flex gap-5 mb-1">
    <p># ${post.category}</p>
    <p>Author : ${post.author.name}</p>
    </div>
    <div>
    <h3 class="text-xl font-bold mb-2">${post.title}</h3>
    <p class="text-[#6C6C81] mb-4">${post.description}</p>
    <p class="border-dashed border-b-2 border-[#B9BACA] mb-5"></p>
    <div class="flex gap-10 w-[27.5rem]">
    <p><i class="fa-solid fa-comment"></i> ${post.comment_count}</p>
    <p><i class="fa-solid fa-eye"></i> ${post.view_count}</p>
    <p class='flex-1'><i class="fa-solid fa-clock"></i> ${post.posted_time}</p>
    <button onclick='handleTitleList("${post.title}", ${post.view_count}), title_count()' class="w-8 h-8 bg-[#10B981] rounded-full relative"><i class="fa-solid fa-envelope-open absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style="color: #ffffff;"></i></button>
    </div>
    </div>
    
    </div>
    </div>
    `;
    allPostContainer.appendChild(div);
      
  })
}

const handleTitleList = (title, view_count) => {
  const allTitleContainer = document.getElementById('all-title-container');
  const div = document.createElement('div');
  div.classList.add('bg-white','p-4','my-5','mx-auto', 'w-80','rounded-2xl','flex', 'shadow-md')
  div.innerHTML = `
    <p class="flex-1">${title}</p>
    <p class=""><i class="fa-solid fa-eye"></i> ${view_count}</p>
  `;
  allTitleContainer.appendChild(div);
}
const loadSearch = async(categoryName) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
  const data = await res.json();
  const posts = data.posts;

  posts.forEach((post)=>{
    const allPostContainer = document.getElementById('all-post-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="w-[39.5rem] p-10 border-2 rounded-3xl mb-6 flex gap-8 bg-[#F2F2FF] border-[#5885FD]">
    <div class="indicator">
    <span class="indicator-item badge ${post.isActive?'badge-success':'badge-error'} h-[22px] border-2 top-1.5 right-1.5 border-white"></span>
    <div class="bg-white grid h-20 w-20 rounded-2xl place-items-center"></div>
    </div>
    <div>
    <div class="flex gap-5 mb-1">
    <p># ${post.category}</p>
    <p>Author : ${post.author.name}</p>
    </div>
    <div>
    <h3 class="text-xl font-bold mb-2">${post.title}</h3>
    <p class="text-[#6C6C81] mb-4">${post.description}</p>
    <p class="border-dashed border-b-2 border-[#B9BACA] mb-5"></p>
    <div class="flex gap-10 w-[27.5rem]">
    <p><i class="fa-solid fa-comment"></i> ${post.comment_count}</p>
    <p><i class="fa-solid fa-eye"></i> ${post.view_count}</p>
    <p class='flex-1'><i class="fa-solid fa-clock"></i> ${post.posted_time}</p>
    <button onclick='handleTitleList("${post.title}", ${post.view_count}), title_count()' class="w-8 h-8 bg-[#10B981] rounded-full relative"><i class="fa-solid fa-envelope-open absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style="color: #ffffff;"></i></button>
    </div>
    </div>
    
    </div>
    </div>
    `;
    allPostContainer.appendChild(div);
    // stop loading spinner
    toggleLoadingSpinner(false);
  })
} 
const handleSearch = () =>  {
  const allPostContainer = document.getElementById('all-post-container');
  allPostContainer.innerHTML = ``;
  const searchField = document.getElementById('search-field');
  const categoryName = searchField.value;
  // start loading spinner
  toggleLoadingSpinner(true);
  loadSearch(categoryName);
} 
const title_count = () => {
  const allTitleContainer = document.getElementById('all-title-container');
  const childCountShow = document.getElementById('childCount');
  childCountShow.innerText = allTitleContainer.childElementCount;
}
handleAllpost();
// loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const spinner = document.getElementById('spinner');
  const allPostContainer = document.getElementById('all-post-container');
  if(isLoading){
    spinner.classList.remove('hidden');
  }
  else{
    spinner.classList.add('hidden');
  }
}
