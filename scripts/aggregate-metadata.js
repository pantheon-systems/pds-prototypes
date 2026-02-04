#!/usr/bin/env node

/**
 * Aggregate Project Metadata Script
 *
 * Scans all directories in /projects, reads their metadata.json files,
 * and creates an aggregated .projects-metadata.json file.
 */

const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '../projects');
const outputPath = path.join(projectsDir, '.projects-metadata.json');

// Valid project statuses
const VALID_STATUSES = ['in-progress', 'review', 'ready', 'archived'];
const VALID_TEMPLATES = ['blank', 'dashboard'];

/**
 * Get the last modified time of a directory
 */
function getLastUpdated(dirPath) {
  try {
    const stats = fs.statSync(dirPath);
    return stats.mtime.toISOString();
  } catch (error) {
    return new Date().toISOString();
  }
}

/**
 * Validate metadata structure
 */
function validateMetadata(metadata, projectDir) {
  const errors = [];

  if (!metadata.id) errors.push('Missing required field: id');
  if (!metadata.title) errors.push('Missing required field: title');
  if (!metadata.description) errors.push('Missing required field: description');
  if (!metadata.creator) errors.push('Missing required field: creator');
  if (!metadata.createdDate) errors.push('Missing required field: createdDate');
  if (!metadata.status) errors.push('Missing required field: status');
  if (!metadata.template) errors.push('Missing required field: template');

  if (metadata.status && !VALID_STATUSES.includes(metadata.status)) {
    errors.push(`Invalid status: ${metadata.status}. Must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  if (metadata.template && !VALID_TEMPLATES.includes(metadata.template)) {
    errors.push(`Invalid template: ${metadata.template}. Must be one of: ${VALID_TEMPLATES.join(', ')}`);
  }

  if (errors.length > 0) {
    console.error(`\n⚠️  Validation errors in ${projectDir}/metadata.json:`);
    errors.forEach(error => console.error(`   - ${error}`));
    return false;
  }

  return true;
}

/**
 * Main aggregation function
 */
function aggregateMetadata() {
  console.log('🔍 Scanning for project metadata...\n');

  // Ensure projects directory exists
  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
    console.log('📁 Created projects directory');
  }

  const projects = [];
  const entries = fs.readdirSync(projectsDir, { withFileTypes: true });

  // Filter out non-directories and hidden files
  const directories = entries.filter(
    entry => entry.isDirectory() && !entry.name.startsWith('.')
  );

  if (directories.length === 0) {
    console.log('📭 No projects found');
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
    console.log('✅ Created empty metadata file\n');
    return;
  }

  console.log(`Found ${directories.length} project director${directories.length === 1 ? 'y' : 'ies'}:\n`);

  let validCount = 0;
  let errorCount = 0;

  directories.forEach(dir => {
    const projectDir = path.join(projectsDir, dir.name);
    const metadataPath = path.join(projectDir, 'metadata.json');

    if (!fs.existsSync(metadataPath)) {
      console.error(`⚠️  ${dir.name}: No metadata.json found - skipping`);
      errorCount++;
      return;
    }

    try {
      const content = fs.readFileSync(metadataPath, 'utf-8');
      const metadata = JSON.parse(content);

      // Validate metadata
      if (!validateMetadata(metadata, dir.name)) {
        errorCount++;
        return;
      }

      // Add dynamic lastUpdated timestamp
      metadata.lastUpdated = getLastUpdated(projectDir);

      projects.push(metadata);
      console.log(`✓ ${dir.name}`);
      validCount++;

    } catch (error) {
      console.error(`⚠️  ${dir.name}: Error reading metadata.json - ${error.message}`);
      errorCount++;
    }
  });

  // Sort by lastUpdated (most recent first)
  projects.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

  // Write aggregated metadata
  fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));

  console.log(`\n✅ Aggregated ${validCount} project${validCount === 1 ? '' : 's'}`);
  if (errorCount > 0) {
    console.log(`⚠️  ${errorCount} project${errorCount === 1 ? '' : 's'} had errors\n`);
  } else {
    console.log('');
  }
}

// Run the script
try {
  aggregateMetadata();
} catch (error) {
  console.error('❌ Error during metadata aggregation:', error.message);
  process.exit(1);
}
