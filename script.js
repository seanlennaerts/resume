import contact from './contact.json'; // this way your contact info doesn't get accidentally pushed
import content from './content.json';

const root = document.querySelector('#root');
const phoneElem = document.querySelector('#phone');
const emailElem = document.querySelector('#email');
phoneElem.href = `tel:+1-${contact.phone}`;
phoneElem.innerText = contact.phone;
emailElem.href = `mailto:${contact.email}`;
emailElem.innerText = contact.email;

function createElem(tag, className) {
  const elem = document.createElement(tag);
  if (className) {
    elem.className = className;
  }
  return elem;
}

function buildChild(child) {
  const childElem = createElem('div', 'item');
  const titleContainer = createElem('div', 'title-container');

  if (child.title) {
    const titleElem = createElem('div', 'title');
    titleElem.innerText = child.title;
    titleContainer.appendChild(titleElem);
    childElem.appendChild(titleContainer);
  }

  if (child.link) {
    const linkElem = createElem('a', 'link');
    linkElem.href = `https://${child.link}`;
    linkElem.target = '_blank';
    linkElem.innerText = child.link;
    titleContainer.appendChild(linkElem);
  }

  if (child.subtitle) {
    const subTitleElem = createElem('div', 'subtitle');
    subTitleElem.innerText = child.subtitle;
    childElem.appendChild(subTitleElem);
  }

  if (child.bullets) {
    const listElem = createElem('ul');
    for (const bullet of child.bullets) {
      const itemElem = createElem('li');
      itemElem.innerText = bullet;
      listElem.appendChild(itemElem);
    }
    childElem.appendChild(listElem);
  }

  return childElem;
}

for (const section of content) {
  const sectionElem = createElem('section');
  const headingElem = createElem('h2');
  headingElem.innerText = section.heading;
  sectionElem.appendChild(headingElem);
  if (section.children) {
    for (const child of section.children) {
      sectionElem.appendChild(buildChild(child));
    }
  }
  root.appendChild(sectionElem);
}
