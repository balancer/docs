import type { SidebarConfig } from '@vuepress/theme-default';
import glob from 'glob';
import { join, normalize, sep, basename } from 'path';
import { lstatSync, readdirSync } from 'fs';
import titleize from 'titleize';

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
      // Remove "parent_path" and ".md"
      path = '/' + path.slice(parent_path.length + 1, -3);
      // Remove "README", making it the de facto index page
      if (basename(path.toLowerCase()) === 'readme') {
        // if (path.toLowerCase().endsWith("readme")) {
        path = path.slice(0, -6);
      }

      return path;
    })
    .filter(obj => obj !== undefined);

  return files;
}

function getName(path) {
  let name = path.split(sep).pop();
  const argsIndex = name.lastIndexOf('--');
  if (argsIndex > -1) {
    name = name.substring(0, argsIndex);
  }

  return titleize(name.replace('-', ' '));
}

function parseSidebarParameters(dirname) {
  const index = dirname.lastIndexOf('--');
  if (index === -1) {
    return {};
  }

  const args = dirname.substring(index + 2).split(',');
  const parameters = {};

  args.forEach(arg => {
    if (arg === 'nc') {
      parameters.collapsable = false;
    } else if (arg.match(/d\d+/)) {
      parameters.sidebarDepth = Number(arg.substring(1));
    }
  });

  return parameters;
}

function side(baseDir, relativeDir = '', currentLevel = 1) {
  const fileLinks = getChildren(baseDir, relativeDir);

  getDirectories(join(baseDir, relativeDir)).forEach(subDir => {
    const children = side(baseDir, join(relativeDir, subDir), currentLevel + 1);

    if (children.length > 0) {
      // Where to put '02-folder' in ['01-file', { title: 'Other Folder', children: ['03-folder/file'] }]
      const sortedFolderPosition = fileLinks.findIndex(link => {
        let linkLabel = link;

        // if (link.children) {
        //   let childrenTitle = '';
        //   if (typeof link.children[0] == 'string')
        //     childrenTitle = link.children[0];
        //   else if (typeof link.children[0] == 'object')
        //     childrenTitle = link.children[0].title;
        //   linkLabel = childrenTitle.split(sep)[0];
        // }

        // Solution below is ugly, but could not find a better way.
        // Previously, subdirs in root level has been compared against dir name, whereas deep subdirs are compared against relative path.
        // Ugly patch below fixes that.
        return '/' + baseDir + linkLabel + 'test';
      });

      const insertPosition =
        sortedFolderPosition > -1 ? sortedFolderPosition : fileLinks.length;

      fileLinks.splice(insertPosition, 0, {
        text: getName(subDir),
        collapsible: true,
        children,
      });
    }
  });

  console.log(fileLinks);

  return fileLinks;
}

// export const sidebar = getConfig('./', {});
export const sidebar: SidebarConfig = {
  '/concepts/': side('docs/', 'concepts/'),
  '/reference': side('docs/', 'reference/'),
  '/': side('docs/', 'concepts/'),
};
