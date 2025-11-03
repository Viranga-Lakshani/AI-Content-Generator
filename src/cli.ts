// src/cli.ts
// A minimal, friendly CLI that wraps the generator.
// Run with: node -r ts-node/register src/cli.ts generate "your prompt here"
// Or: npm run start -- generate "..."

import { createGenerator } from './index';
import inquirer from 'inquirer';

async function main() {
  const [, , command, ...rest] = process.argv;

  if (!command || command === 'help') {
    console.log('AI Content Generator — simple CLI');
    console.log('Commands:');
    console.log('  generate "<prompt>"   Generate content for a prompt');
    console.log('  interactive           Walk through an interactive prompt builder');
    console.log('  help                  Show this message');
    process.exit(0);
  }

  if (command === 'generate') {
    const prompt = rest.join(' ').trim();
    if (!prompt) {
      console.error('Please provide a prompt enclosed in quotes, e.g.:');
      console.error('  npm run start -- generate "Write a product description for a smart mug"');
      process.exit(1);
    }

    const gen = createGenerator({});
    const result = await gen.generate(prompt);
    console.log('\n--- Generated content ---\n');
    console.log(result.text);
    console.log('\n-------------------------\n');
    process.exit(0);
  }

  if (command === 'interactive') {
    const answers = await inquirer.prompt([
      { name: 'type', message: 'What do you want to generate?', type: 'list', choices: ['Blog outline', 'Product description', 'Social post', 'Custom prompt'] },
      { name: 'topic', message: 'Briefly describe the topic (one sentence):', when: (a) => a.type !== 'Custom prompt' },
      { name: 'prompt', message: 'Write your custom prompt:', when: (a) => a.type === 'Custom prompt' }
    ]);

    let promptToUse = answers.prompt;
    if (!promptToUse) {
      if (answers.type === 'Blog outline') {
        promptToUse = `Write a friendly, structured blog outline about "${answers.topic}". Include headings and a suggested word count per section.`;
      } else if (answers.type === 'Product description') {
        promptToUse = `Write a short, persuasive product description for "${answers.topic}" aimed at online shoppers. Keep it under 120 words.`;
      } else if (answers.type === 'Social post') {
        promptToUse = `Write a shareable social media post about "${answers.topic}". Keep it short and engaging.`;
      } else {
        promptToUse = answers.topic ?? '';
      }
    }

    const gen = createGenerator({});
    const result = await gen.generate(promptToUse);
    console.log('\n--- Generated content ---\n');
    console.log(result.text);
    console.log('\n-------------------------\n');
    process.exit(0);
  }

  console.error(`Unknown command: ${command}`);
  process.exit(1);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Error in CLI:', err);
    process.exit(1);
  });
}
