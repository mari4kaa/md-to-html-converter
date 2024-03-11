'use strict';

const fs = require('fs').promises;
const path = require('path');
const { inputExtensions, outputExtensions } = require('./config/constants');

class PathManager {
  async validateMdFilepath (mdFilePath) {
    await this.checkAccess(mdFilePath);
    this.checkExtension(mdFilePath, true);
  }

  validateOutputPath (filePath) {
    this.checkExtension(filePath, false);
  }

  async checkAccess (mdFilePath) {
    try {
      await fs.access(mdFilePath);
    } catch (err) {
      throw new Error(`Error: No access to "${mdFilePath}". Wrong option's format or non-existing file.`);
    }
  }

  checkExtension (filePath, isInput) {
    const ext = path.extname(filePath);
    const valid = isInput ? inputExtensions.includes(ext) : outputExtensions.includes(ext);
    const allowedExtensions = isInput ? inputExtensions : outputExtensions;
    if (!valid) {
      throw new Error(`Error: The file "${filePath}" has wrong extension. Only ${allowedExtensions} allowed`);
    }
  }
}

module.exports = { PathManager };
