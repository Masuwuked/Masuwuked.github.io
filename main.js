const content = document.getElementById('content');
const navLinks = document.querySelectorAll('.nav-link');

const homeHTML = `
<div class="terminal-window">
    <div class="terminal-title">masuwuked@arch:~$ cat ~/welcome.txt</div>
    <div class="terminal-line terminal-art">
        <pre>${String.raw`_______  _______  _______ 
(       )(  ___  )(  ____ \
| () () || (   ) || (    \/
| || || || (___) || (_____ 
| |(_)| ||  ___  |(_____  )
| |   | || (   ) |      ) |
| |   ( || )   ( |/\____) |
 | |     \||/     \|\_______)
 | |                         
 | |                         
 | |    /||\     /||\     /|
 | |   ( || )   ( || )   ( |
 | |   | || | ^ | || |   | |
 | |   | || |( )| || |   | |
 | |   | || || || || |   | |
 | (___) || () () || (___) |
(_______)(_______)(_______)
                           
 _        _______  ______  
| \    /\(  ____ \(  __  \ 
|  \  / /| (    \/| (  \  )
\  (_/ / | (__    | |   ) |
|   _ (  |  __)   | |   | |
/  ( \ \ | (      | |   ) |
|  /  \ \| (____/\| (__/  |
|_/    \/(_______/(______/ 
`}</pre>
    </div>
    <div class="terminal-line">
        <strong>Hi, I'm Masuwuked.</strong>
         - [programmer], [i use arch btw], [Fix-it-yourself guy], [CTF addict] -
    </div>
    <div class="terminal-window">
       hi! Im a self taught dev who is into open source, cryptography and reverse engineering.i am also cybersecurity enthusiast and somewhat of a linux nerd.<br><br>
     ive been into tech since i was 13, it all began with C# in unity then moving to java, python and now C.<br><br>
     i picked up linux when i was 15 and have been daily driving it since then. I went through many distros, desktop enviroments, window managers it all begain with trying out debian with gnome for a performance boost and have settled with arch linux with bspwm. <br><br> 
     i am currently pursuing b.tech in computer science from KIIT, bhubnaeshwar and am in my 4th year.<br><br>
     another hobby of mine is homelabbing as i love the idea of self hosting. currently my homelab consist of my old pc which is running openNAS, home assistant and some local LLMs. I am always picking up new hobbies<.
    </div>
    <div class="terminal-line">
        <strong>Links:</strong>
        #insta: <a href="https://www.instagram.com/masuwuked/">masuwuked</a> |
        #github: <a href="https://github.com/masuwuked">masuwuked</a> |
        #tryhackme: <a href="https://tryhackme.com/p/masuwuked">masuwuked</a>
    </div>
    <div class="terminal-line">
        email: <a href="mailto:masuwuked@gmail.com">masuwuked@gmail.com</a>
    </div>
    <div class="terminal-line">
        resume: <a href="assets/resume.pdf">download</a>
    </div>
</div>`;

function setActiveLink(page) {
    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${page}`;
        link.classList.toggle('active', isActive);
    });
}

function parseRoute() {
    const hash = location.hash.slice(1) || 'home';
    if (hash.startsWith('writeups/')) {
        return { page: 'writeup', slug: hash.replace('writeups/', '') };
    }
    return { page: hash };
}

async function loadMarkdown(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            content.innerHTML = `<div class="error">Unable to load ${path}. Make sure the file exists.</div>`;
            return;
        }
        const markdown = await response.text();
        content.innerHTML = `<article class="markdown-content terminal-window">${marked.parse(markdown)}</article>`;
    } catch (error) {
        content.innerHTML = `<div class="error">Error loading ${path}</div>`;
        console.error(error);
    }
}

async function loadRoute() {
    const route = parseRoute();

    if (route.page === 'home') {
        content.innerHTML = homeHTML;
        setActiveLink('home');
    } else if (route.page === 'writeups') {
        setActiveLink('writeups');
        await loadMarkdown('writeups/index.md');
    } else if (route.page === 'writeup' && route.slug) {
        setActiveLink('writeups');
        await loadMarkdown(`writeups/${route.slug}.md`);
    } else {
        content.innerHTML = `<div class="error">Page not found.</div>`;
        setActiveLink('home');
    }
}

window.addEventListener('hashchange', loadRoute);
window.addEventListener('DOMContentLoaded', loadRoute);
