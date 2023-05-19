async function getHTML() {
    return (await fetch('http://localhost:3000/index.html')).text();
} 

async function main() {
    const html = await getHTML();
    document.body.insertAdjacentHTML('beforeend', html);
}

main();