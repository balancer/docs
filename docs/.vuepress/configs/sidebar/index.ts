import type { SidebarConfig } from '@vuepress/theme-default';
import glob from 'glob';
import { join, normalize, sep, basename } from 'path';
import { lstatSync, readFileSync, readdirSync, existsSync } from 'fs';
import sortBy from 'lodash/sortBy.js';
import titleize from 'titleize';
import markdownIt from 'markdown-it';
import meta from 'markdown-it-meta';

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source).filter(
    name => !(name === '.vuepress') && isDirectory(join(source, name))
  );

function getChildren(parent_path, dir) {
  parent_path = normalize(parent_path);
  parent_path = parent_path.endsWith(sep)
    ? parent_path.slice(0, -1)
    : parent_path; // Remove last / if exists.
  const pattern = '/*.md';
  const files = glob
    .sync(parent_path + (dir ? `/${dir}` : '') + pattern)
    .map(path => {
      const md = new markdownIt();
      md.use(meta);
      const file = readFileSync(path, 'utf8');
      md.render(file);

      const order = md.meta.order;
      // Remove "parent_path" and ".md"
      path = '/' + path.slice(parent_path.length + 1, -3);
      // Remove "README", making it the de facto index page
      if (basename(path.toLowerCase()) === 'readme') {
        // if (path.toLowerCase().endsWith("readme")) {
        path = path.slice(0, -6);
      }

      return {
        path,
        order: path === '' && order === undefined ? 0 : order, // README is first if it hasn't order
      };
    })
    .filter(obj => obj !== undefined);

  return sortBy(files, ['order', 'path']).map(file => file.path);
}

function getName(path) {
  let name = path.split(sep).pop();
  const argsIndex = name.lastIndexOf('--');
  if (argsIndex > -1) {
    name = name.substring(0, argsIndex);
  }

  return titleize(name.replace('-', ' '));
}

function side(baseDir, relativeDir = '', currentLevel = 1) {
  const fileLinks = getChildren(baseDir, relativeDir);
  const onlyFiles = fileLinks.length;

  let order;
  const filepath = join(baseDir, 'README.md');
  if (existsSync(filepath)) {
    const md = new markdownIt();
    md.use(meta);
    const file = readFileSync(filepath, 'utf8');
    md.render(file);
    order = md.meta.sidebarOrder;
  }

  const folderLinks = [];

  getDirectories(join(baseDir, relativeDir)).forEach(subDir => {
    const children = side(baseDir, join(relativeDir, subDir), currentLevel + 1);

    if (children.length > 0) {
      const insertPosition = order ? order.indexOf(subDir) : children.length;

      if (subDir == 'governance' || subDir == 'pools') {
        console.log(`${subDir} fileLinks ${fileLinks.length}`);
        console.log(`${subDir} insertPosition ${insertPosition}`);
        console.log(`length ${folderLinks.length}`);
      }

      folderLinks.splice(insertPosition, 0, {
        text: getName(subDir),
        collapsible: true,
        children,
      });
      // eslint-disable-next-line prettier-vue/prettier
    }
  });

  return [...fileLinks, ...folderLinks];
}

// export const sidebar = getConfig('./', {});
export const sidebar: SidebarConfig = {
  '/concepts/': side('docs/', 'concepts/'),
  '/reference': side('docs/', 'reference/'),
  '/': side('docs/', 'concepts/'),
};
