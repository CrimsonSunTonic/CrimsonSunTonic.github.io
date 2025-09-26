function buildTree(data, parentId = null) {
  return data
    .filter(member => member.parent_id === parentId)
    .map(member => {
      const children = buildTree(data, member.id);
      return `
        <li>
          <a href="#">
            <img src="${member.img}" alt="${member.name}">
            <span>${member.name}<br>
              (${member.role})<br>
              ${member.born} - ${member.died ?? ""}
            </span>
          </a>
          ${children.length ? `<ul>${children.join("")}</ul>` : ""}
        </li>
      `;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const treeHTML = `<ul>${buildTree(window.familyData).join("")}</ul>`;
  document.getElementById("family-tree").innerHTML = treeHTML;
});
