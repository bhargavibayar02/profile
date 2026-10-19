const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const profileFrame = document.querySelector(".profile-frame");
const profilePhoto = document.querySelector(".profile-photo");
const githubUsername = "arjundevadiga04";

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#0b0d12" : "#f7f8f5";
}

const storedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
setTheme(storedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }
});

profilePhoto.addEventListener("load", () => profileFrame.classList.add("has-photo"));
profilePhoto.addEventListener("error", () => profileFrame.classList.remove("has-photo"));
if (profilePhoto.complete && profilePhoto.naturalWidth > 0) profileFrame.classList.add("has-photo");

document.querySelector("#year").textContent = new Date().getFullYear();

function formatCount(value) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

async function loadGitHubProfile() {
  const response = await fetch(`https://api.github.com/users/${githubUsername}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) throw new Error(`GitHub profile request failed (${response.status})`);
  const profile = await response.json();
  document.querySelector("#github-name").textContent = profile.name || githubUsername;
  document.querySelector("#github-handle").textContent = `@${profile.login}`;
  document.querySelector("#github-bio").textContent =
    profile.bio || "Computer Science student exploring cybersecurity, software, and AI.";
  document.querySelector("#repo-count").textContent = formatCount(profile.public_repos);
  document.querySelector("#follower-count").textContent = formatCount(profile.followers);
  if (profile.avatar_url) {
    const avatar = document.querySelector("#github-avatar");
    const image = document.createElement("img");
    image.src = profile.avatar_url;
    image.alt = "";
    avatar.replaceChildren(image);
  }
}

async function loadGitHubRepos() {
  const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=3`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) throw new Error(`GitHub repositories request failed (${response.status})`);
  const repositories = await response.json();
  const list = document.querySelector("#repo-list");
  if (repositories.length === 0) {
    list.innerHTML = '<a class="repo-row" href="https://github.com/arjundevadiga04?tab=repositories" target="_blank" rel="noreferrer"><span class="repo-status"></span><span>Explore public repositories</span><span aria-hidden="true">↗</span></a>';
    return;
  }
  list.replaceChildren(...repositories.map((repository) => {
    const link = document.createElement("a");
    link.className = "repo-row";
    link.href = repository.html_url;
    link.target = "_blank";
    link.rel = "noreferrer";
    const status = document.createElement("span");
    status.className = "repo-status";
    const name = document.createElement("span");
    name.textContent = repository.name;
    const language = document.createElement("span");
    language.className = "repo-language";
    language.textContent = repository.language || "Project";
    link.append(status, name, language);
    return link;
  }));
}

loadGitHubProfile().catch((error) => console.warn("Unable to load GitHub profile:", error));
loadGitHubRepos().catch((error) => console.warn("Unable to load GitHub repositories:", error));
