
document.getElementById("app").innerHTML = `
  <h1>Welcome to CU Node Starter</h1>
  <button id="btn">Click Me</button>
`;

document.getElementById("btn")?.addEventListener("click", () => {
  alert("Button clicked!");
});
