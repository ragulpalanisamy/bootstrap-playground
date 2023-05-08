const searchButton = document.getElementById("btn");
const searchInput = document.getElementById("input");
const userCardContainer = document.getElementById("user-card");
/*  const userDetailContainer = document.getElementById("user-detail-container");*/
const clear = document.getElementById("clear");
const reset = document.getElementById("reset");

// Event listener for clear button
clear.addEventListener("click", () => {
    searchInput.value = "";
    userCardContainer.innerHTML = "";
    userDetailContainer.innerHTML = "";
});

// Event listener for reset button
reset.addEventListener("click", () => {
    window.location.reload();
});

// Event listener for search button
searchButton.addEventListener("click", async () => {
    try {
        const response = await fetch(`https://api.github.com/users/${searchInput.value}`);
        if (!response.ok) {
            throw new Error("User not found!");
        }
        const userData = await response.json();
        renderUserCard(userData);
    } 
    catch (error) {
        alert(error);
    }
});

// Function to render user card
function renderUserCard(userData) {
  const card = document.createElement("div");
  card.classList.add(
    "user-card",
    "bg-white",
    "rounded-lg",
    "shadow-md",
    "p-4"
  );

  const avatar = document.createElement("img");
  avatar.classList.add(
    "avatar",
    "rounded-full",
    "mx-auto",
    "w-32",
    "h-32",
    "object-cover"
  );
  avatar.src = `${userData.avatar_url}`;
  avatar.alt = `${userData.login}'s avatar`;
  avatar.style.cursor = "pointer";
  avatar.addEventListener("click", () => {
    window.location.href = userData.html_url;
  });

  /* const username = document.createElement("a");
  username.href = userData.html_url;
  username.target = "_blank";
 */
  const name = document.createElement("h2");
  name.classList.add("name", "text-xl", "font-bold", "text-gray-800");
  name.textContent = userData.name;

  const bio = document.createElement("h2");
  bio.classList.add("bio", "text-md", "text-gray-800", "mt-2");
  bio.textContent = userData.bio;

  const followers = document.createElement("a");
  followers.classList.add(
    "followers",
    "block",
    "text-lg",
    "font-bold",
    "text-gray-800",
    "mt-2"
  );
  followers.href = `${userData.html_url}?tab=followers`;
  followers.textContent =`Followers`;

  const following = document.createElement("a");
  following.classList.add(
    "following",
    "block",
    "text-lg",
    "font-bold",
    "text-gray-800",
    "mt-2"
  );
  following.href = `${userData.html_url}?tab=following`;
  following.textContent =`Following`;
  following.style.marginLeft = "10px";

  const repo = document.createElement("a");
  repo.classList.add(
    "repo",
    "block",
    "text-lg",
    "font-bold",
    "text-gray-800",
    "mt-2"
  );
  repo.href = `${userData.html_url}?tab=repositories`;
  repo.textContent = `Repositories`;
  repo.style.marginLeft = "10px";

  card.appendChild(avatar);
 /*  card.appendChild(username);*/
  card.appendChild(name);
  card.appendChild(bio);
  card.appendChild(followers);
  card.appendChild(following);
  card.appendChild(repo);

  userCardContainer.appendChild(card);

  // Add click event listener to each repo to redirect to its GitHub page
  const repoLinks = card.querySelectorAll(".repo-name");
  repoLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.open(link.href, "_blank");
    });
  });
}

