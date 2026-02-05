'use client';

import Link from 'next/link';

import { ButtonLink, CodeBlock } from '@pantheon-systems/pds-toolkit-react';

import { PageHeader, PageLayout } from '../../components';

import styles from './page.module.css';

export default function ClaudeDesktopSetupPage() {
	return (
		<PageLayout>
			<article className={styles.resource}>
				<PageHeader
					description='Complete setup guide for using Claude Desktop with the PDS MCP server to create visual prototypes.'
					title='Claude Desktop Setup'
				/>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>
						What You&apos;ll Need
					</h2>
					<ul className={styles.list}>
						<li>
							<strong>Claude Desktop app</strong> - The desktop application for
							Claude AI
						</li>
						<li>
							<strong>PDS MCP Server access</strong> - Model Context Protocol
							server for PDS Toolkit React components
						</li>
						<li>
							<strong>Text editor</strong> - To edit the configuration file (VS
							Code, TextEdit, Notepad, etc.)
						</li>
					</ul>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>
						Step 1: Install Claude Desktop
					</h2>
					<ol className={styles.list}>
						<li>
							Visit{' '}
							<a
								href='https://claude.ai/download'
								rel='noopener noreferrer'
								target='_blank'
							>
								claude.ai/download
							</a>
						</li>
						<li>Download the installer for your operating system</li>
						<li>Run the installer and follow the setup instructions</li>
						<li>Launch Claude Desktop and sign in with your account</li>
					</ol>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>
						Step 2: Configure the PDS MCP Server
					</h2>

					<h3 className='pds-ts-xl pds-mar-block-end-m'>
						Locate the Configuration File
					</h3>
					<p className='pds-mar-block-end-m'>
						The Claude Desktop configuration file is located at:
					</p>

					<div className={styles.configPaths}>
						<div className={styles.configPath}>
							<strong>macOS:</strong>
							<CodeBlock
								hasCopyButton
								code='~/Library/Application Support/Claude/claude_desktop_config.json'
							/>
						</div>

						<div className={styles.configPath}>
							<strong>Windows:</strong>
							<CodeBlock
								hasCopyButton
								code='%APPDATA%\Claude\claude_desktop_config.json'
							/>
						</div>

						<div className={styles.configPath}>
							<strong>Linux:</strong>
							<CodeBlock
								hasCopyButton
								className='pds-mar-block-end-s'
								code='~/.config/Claude/claude_desktop_config.json'
							/>
						</div>
					</div>

					<h3 className='pds-ts-xl pds-mar-block-end-m pds-mar-block-start-xl'>
						Edit the Configuration File
					</h3>
					<ol className={styles.list}>
						<li>
							<strong>Open the file in a text editor</strong>
							<p className='pds-mar-block-start-xs pds-mar-block-end-s'>
								On macOS, you can use Terminal:
							</p>
							<CodeBlock
								hasCopyButton
								hasPrompt
								code='open ~/Library/Application\ Support/Claude/claude_desktop_config.json'
								language='bash'
							/>
							<p className='pds-mar-block-start-s pds-mar-block-end-s'>
								Or on Windows, use File Explorer to navigate to the path and
								open with Notepad.
							</p>
						</li>
						<li>
							<strong>Add the PDS MCP server configuration</strong>
							<p className='pds-mar-block-start-xs pds-mar-block-end-s'>
								If the file is empty or only has empty braces{' '}
								<code>{'{}'}</code>, replace it with:
							</p>
							<CodeBlock
								hasCopyButton
								code={`{
  "mcpServers": {
    "pds-toolkit-react": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://pds-react.pantheon.io/v1/mcp"
      ]
    }
  }
}`}
								language='json'
							/>
							<div className='pds-mar-block-start-s pds-mar-block-end-s pds-pad-l pds-bg-subtle'>
								<p className='pds-mar-block-end-xs'>
									<strong>How this works:</strong> The PDS MCP server is
									HTTP-based, so we use <code>mcp-remote</code> to bridge it for
									Claude Desktop (which only supports stdio-based servers).
								</p>
								<p>
									If you already have other MCP servers configured, just add the{' '}
									<code>&quot;pds-toolkit-react&quot;</code> entry inside the
									existing <code>&quot;mcpServers&quot;</code> object.
								</p>
							</div>
						</li>
						<li>
							<strong>Save the file</strong>
						</li>
						<li>
							<strong>Restart Claude Desktop</strong> - Quit the app completely
							and relaunch it
						</li>
					</ol>

					<h3 className='pds-ts-xl pds-mar-block-end-m pds-mar-block-start-xl'>
						Verify the Setup
					</h3>
					<p className='pds-mar-block-end-m'>
						To confirm the PDS MCP server is working:
					</p>
					<ol className={styles.list}>
						<li>Open a new conversation in Claude Desktop</li>
						<li>
							Look for a small tools icon or &quot;MCP&quot; indicator in the
							interface
						</li>
						<li>
							Type: &quot;List all available PDS components&quot; - Claude
							should be able to fetch component information
						</li>
					</ol>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>
						Using Desktop Resources
					</h2>
					<p className='pds-mar-block-end-m'>
						Now that you have Claude Desktop set up with the PDS MCP server, you
						can use the <Link href='/desktop-resources'>Desktop Resources</Link>{' '}
						to create visual prototypes:
					</p>
					<ol className={styles.list}>
						<li>
							Browse the{' '}
							<Link href='/desktop-resources'>Desktop Resources section</Link>
						</li>
						<li>
							Choose a template (e.g., Dashboard Template) and open its page
						</li>
						<li>
							Share the resource URL with Claude Desktop, or copy the template
							code
						</li>
						<li>
							Ask Claude to create visual mockups using PDS components - the MCP
							server will provide component documentation automatically
						</li>
						<li>Iterate on your design with follow-up prompts</li>
					</ol>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>Troubleshooting</h2>

					<h3 className='pds-ts-xl pds-mar-block-end-m'>
						MCP Server Not Working
					</h3>
					<ul className={styles.list}>
						<li>Make sure you completely quit and restarted Claude Desktop</li>
						<li>
							Check that the configuration file syntax is correct (valid JSON)
						</li>
						<li>Verify the file path is correct for your operating system</li>
						<li>
							Try running the command manually in your terminal to test the
							connection:
							<CodeBlock
								hasCopyButton
								hasPrompt
								className='pds-mar-block-start-m'
								code='npx mcp-remote https://pds-react.pantheon.io/v1/mcp'
								language='bash'
							/>
						</li>
					</ul>

					<h3 className='pds-ts-xl pds-mar-block-end-m pds-mar-block-start-l'>
						Configuration File Not Found
					</h3>
					<ul className={styles.list}>
						<li>
							The file may not exist yet - create it manually at the correct
							path
						</li>
						<li>Make sure Claude Desktop has been launched at least once</li>
						<li>
							On macOS, you may need to create the directory first:
							<CodeBlock
								hasCopyButton
								hasPrompt
								className='pds-mar-block-start-m'
								code='mkdir -p ~/Library/Application\ Support/Claude'
								language='bash'
							/>
						</li>
					</ul>
				</section>

				<footer className={styles.footer}>
					<ButtonLink
						displayType='icon-start'
						iconName='angleLeft'
						linkContent={
							<Link href='/documentation'>Back to Documentation</Link>
						}
						size='sm'
						variant='subtle'
					/>
				</footer>
			</article>
		</PageLayout>
	);
}
