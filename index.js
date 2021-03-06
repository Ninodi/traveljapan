var posts = new Database("posts");

/*
 შემდეგი ორი ფუნქცია გამორჩენილი იყო საწყის 
 კოდში (გამოქვეყნებისას) 
 შეცვლილია: 8 იანვარი 22:00
 თუ ამ თარიღის შემდეგ გააკეთეთ fork, უბრალოდ წაშალეთ ეს კომენტარი
 თუ ამ თარიღამდე დაიწყეთ, გადააკოპირეთ ეს ორი ფუნქცია
 თქვენს ფაილში.
*/
function setUser(username) {
  localStorage.setItem("currentUser", username);
  document.getElementById("username").value = username;
}

function displayAllPosts() {
  var allPosts = posts.getAll();
  allPosts.sort();
  for (let post of allPosts) {
    var elem = createPost(post);
    addNewPost(elem);
  }
  // ეს ხაზი აუცილებელია news feed ტესტერისთვის
  return allPosts;
}

displayAllPosts();

function newPost() {
  var postText = getPostText();

  if(!postText) return;

  var post = posts.create({
    text: getPostText(),
    user: getUser(),
    likes: []
  });
  var elem = createPost(post);
  addNewPost(elem);
}

function getPostText() {
  var postInputElement = document.getElementById("post_text");
  return postInputElement.value;
}

function getUser() {
  return localStorage.getItem("currentUser") || "unknown user";
}

function deletePost(postId) {
  var postElem = document.getElementById(`post-${postId}`);
  postElem.parentNode.removeChild(postElem);
  posts.delete(postId);
}

function createPost(post) {
  return `
		<div id="post-${post.id}" class="post container">
			<div>
				<button class="post_delete_button" onclick="deletePost(${post.id})">
					delete
				</button>
			</div>
			<div class="post_title">${post.user}</div>
      <div class="post_text">${post.text}</div>
      <div class="post_date">${post.date}</div>
      <div class="post_likes_container">
        <div class="post_likes_info">
          <span class="post_likes_count">
            ${displayLikesCount(post)}
          </span> 
          <span class="post_likes_text">
            ${displayLikesText(post)}
          </span>
        </div>
        <button class="post_like_button" onclick="newLike(${post.id})">
          like
        </button>
      </div>
		</div>
	`;
}

function displayLikesCount(post){
  return post.likes.length > 0 ? post.likes.length : "";
}

function displayLikesText(post) {
  return post.likes.length > 0 ? "likes" : "";
}

function newLike(postId) {
  var post = posts.getById(postId);
  var user = getUser();
  if (!post.likes.includes(user)) {
    post.likes.push(user);
  }else{
    var index = post.likes.indexOf(user);
    post.likes.splice(index, 1);
  }
  posts.update(post);
  addNewLike(post);
}

function addNewLike(post) {
  var postElem = document.getElementById(`post-${post.id}`);
  var postLikesCountElem = postElem.querySelector("span.post_likes_count");
  postElem.querySelector("span.post_likes_text").innerText = post.likes.length > 0 ? "likes" : "";
  postLikesCountElem.innerText = post.likes.length;
}

function addNewPost(elem) {
  var posts = document.getElementById("posts");
  posts.insertAdjacentHTML("afterbegin", elem);
  document.getElementById("post_text").value = "";
}

window.newPost = newPost;
window.newLike = newLike;
window.deletePost = deletePost;
