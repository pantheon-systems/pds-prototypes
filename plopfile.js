const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

module.exports = function (plop) {
  // Helper to check if project already exists
  plop.setHelper('checkProjectExists', function (name) {
    const projectPath = path.join(__dirname, 'projects', name)
    return fs.existsSync(projectPath)
  })

  plop.setGenerator('project', {
    description: 'Create a new prototype project',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Project name (lowercase-with-dashes):',
        validate: function (value) {
          // Check naming convention
          if (!/^[a-z0-9-]+$/.test(value)) {
            return 'Project name must be lowercase with dashes (e.g., my-project)'
          }

          // Check for conflicts with existing projects
          const projectPath = path.join(__dirname, 'projects', value)
          if (fs.existsSync(projectPath)) {
            return `Project "${value}" already exists. Please choose a different name.`
          }

          // Check for reserved names
          const reserved = ['.projects-metadata.json', 'node_modules', 'shared-data']
          if (reserved.includes(value)) {
            return `"${value}" is a reserved name. Please choose a different name.`
          }

          return true
        }
      },
      {
        type: 'input',
        name: 'title',
        message: 'Project title (display name):'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description:'
      },
      {
        type: 'input',
        name: 'creator',
        message: 'Your name:'
      },
      {
        type: 'list',
        name: 'template',
        message: 'Choose a template:',
        choices: [
          { name: 'Dashboard - Pre-built navigation with empty content area', value: 'dashboard' },
          { name: 'Blank - Start from scratch', value: 'blank' }
        ]
      },
      {
        type: 'list',
        name: 'status',
        message: 'Initial status:',
        choices: ['in-progress', 'review', 'ready', 'archived'],
        default: 'in-progress'
      }
    ],
    actions: function (data) {
      // Add current date
      data.createdDate = new Date().toISOString().split('T')[0]

      const actions = []

      // Copy template files
      const templatePath = `templates/${data.template}`

      actions.push({
        type: 'add',
        path: 'projects/{{name}}/page.tsx',
        templateFile: `${templatePath}/page.tsx.hbs`
      })

      actions.push({
        type: 'add',
        path: 'projects/{{name}}/page.module.css',
        templateFile: `${templatePath}/page.module.css.hbs`
      })

      actions.push({
        type: 'add',
        path: 'projects/{{name}}/metadata.json',
        templateFile: `${templatePath}/metadata.json.hbs`
      })

      actions.push({
        type: 'add',
        path: 'projects/{{name}}/README.md',
        templateFile: `${templatePath}/README.md.hbs`
      })

      // Run metadata aggregation after project creation
      actions.push({
        type: 'aggregate-metadata',
        data: data
      })

      return actions
    }
  })

  // Custom action to run metadata aggregation
  plop.setActionType('aggregate-metadata', function (answers, config) {
    try {
      console.log('\n🔄 Aggregating project metadata...')
      execSync('node scripts/aggregate-metadata.js', { stdio: 'inherit' })

      console.log('\n✅ Project created successfully!')
      console.log(`\n📁 Location: /projects/${answers.name}`)
      console.log(`\n🚀 Next steps:`)
      console.log(`   1. Run 'npm run dev' to start the development server`)
      console.log(`   2. Visit http://localhost:3000/projects/${answers.name}`)
      console.log(`   3. Start building your prototype!\n`)

      return 'Metadata aggregated successfully'
    } catch (error) {
      console.error('Error aggregating metadata:', error.message)
      return 'Warning: Metadata aggregation failed, but project was created'
    }
  })
}
